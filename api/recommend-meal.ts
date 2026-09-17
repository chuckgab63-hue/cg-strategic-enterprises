import { GoogleGenAI, Type } from '@google/genai';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API Key missing on server.' });
    }

    const ai = new GoogleGenAI({ apiKey: apiKey });

    const { userMessage, menu, history } = req.body;

    const menuText = (menu || [])
      .map((item: any) => `- id: ${item.id} | ${item.name} | ${item.category} | $${item.price} | ${item.calories} cal, ${item.protein}g protein, ${item.carbs}g carbs, ${item.fat}g fat`)
      .join('\n');

    const historyText = (history || [])
      .map((h: any) => `${h.role === 'user' ? 'Customer' : 'You'}: ${h.text}`)
      .join('\n');

    const parts = [{
      text: `Menu:\n${menuText}\n\nConversation so far:\n${historyText}\n\nCustomer just said: "${userMessage}"`
    }];

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: [{ role: 'user', parts }],
      config: {
        systemInstruction: "You are a friendly meal-planning assistant for Island Fresh, a healthy meal prep service. Help customers pick meals from the menu based on their taste preferences and stated health goals (e.g. low-carb, high-protein, vegan, keto). Only recommend items that are actually on the menu provided. Keep your reply short and conversational (2-4 sentences). Recommend 1-3 items per turn. Never give medical advice or make health claims \u2014 just match stated preferences to menu items. If asked about something outside the menu or health advice, gently redirect to menu preferences.",
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reply: { type: Type.STRING, description: 'Conversational reply to show the customer.' },
            recommendedItemIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'IDs of recommended menu items, matching the id field exactly. Empty array if none.'
            }
          },
          required: ['reply', 'recommendedItemIds']
        }
      },
    });

    const result = JSON.parse(response.text || '{}');
    return res.status(200).json(result);

  } catch (error: any) {
    console.error("Meal Recommendation Error:", error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
