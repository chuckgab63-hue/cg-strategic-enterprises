import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  // 1. Enforce POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // 2. Securely pull the key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API Key missing on server.' });
    }

    // 3. Initialize SDK
    const ai = new GoogleGenAI({ apiKey: apiKey });

    // 4. Extract the payload sent by AnalysisWidget.tsx
    const { currentInput, fileData, mimeType } = req.body;

    // 5. Build the content array using the exact structure the SDK requires
    const parts: any[] = [{
      text: currentInput?.trim() ? currentInput : "Analyze this pest/damage for Northeast Florida."
    }];

    if (fileData && mimeType) {
      parts.push({
        inlineData: { data: fileData, mimeType: mimeType }
      });
    }

    // 6. Execute with corrected contents array structure
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: [{ role: 'user', parts: parts }],
      config: {
        // Search grounding temporarily disabled to test whether it's the source
        // of the RESOURCE_EXHAUSTED errors — grounded requests are often metered
        // separately and more strictly than plain generation.
        // tools: [{ googleSearch: {} }],
        systemInstruction: "You are the ONE SOURCE DUVAL HUB Senior Diagnostic Architect. You analyze pest threats in Northeast Florida. Be highly tactical, use formatting (bullet points, bold text), and always end with a 'DUVAL HUB REPORT' summarizing priority, pest species, structural risk (out of 10), assigned hub, and target area.",
      },
    });

    // 7. Send the formatted text back to the React component
    return res.status(200).json({ text: response.text });

  } catch (error: any) {
    console.error("Backend AI Error:", error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
