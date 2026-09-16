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

    const { issueDescription, fileData, mimeType } = req.body;

    const parts: any[] = [{
      text: `A tenant or crew member reported the following property maintenance issue: "${issueDescription || '(no description provided, see photo)'}"`
    }];

    if (fileData && mimeType) {
      parts.push({
        inlineData: { data: fileData, mimeType: mimeType }
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: [{ role: 'user', parts: parts }],
      config: {
        systemInstruction: "You are a property maintenance triage assistant. Classify the reported issue's urgency and category. HIGH priority means it risks property damage, safety, or habitability if not addressed within hours (e.g. water leaks, gas smell, no heat/AC in extreme weather, electrical hazards, broken locks/security). LOW priority means it can reasonably wait for scheduled maintenance (e.g. filter replacement, cosmetic issues, minor appliance quirks). Category must be exactly one of: Plumbing, Electrical, HVAC, Appliance, Structural, General.",
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            priority: { type: Type.STRING, enum: ['high', 'low'] },
            category: { type: Type.STRING, enum: ['Plumbing', 'Electrical', 'HVAC', 'Appliance', 'Structural', 'General'] },
            summary: { type: Type.STRING, description: 'One short sentence summarizing the issue for a dispatch email.' }
          },
          required: ['priority', 'category', 'summary']
        }
      },
    });

    const result = JSON.parse(response.text || '{}');

    return res.status(200).json(result);

  } catch (error: any) {
    console.error("Maintenance Triage Error:", error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
