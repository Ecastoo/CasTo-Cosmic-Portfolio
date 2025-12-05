import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // Ensure this is set in your environment
const ai = new GoogleGenAI({ apiKey });

export const generateViralHook = async (context: string): Promise<string> => {
  if (!apiKey) {
    return "Error: API Key not found. Please set REACT_APP_GEMINI_API_KEY (or similar) in your environment.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a viral content expert for TikTok. 
      Given the following video context: "${context}".
      Generate a short, punchy, high-energy, viral hook/caption (max 15 words) and 3 trending hashtags.
      Format: "CAPTION\nHASHTAGS"`,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Disable thinking for faster response on simple task
      }
    });

    return response.text || "Could not generate hook.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI system offline (Check API Key)";
  }
};
