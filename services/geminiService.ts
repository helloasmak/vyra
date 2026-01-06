
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getConciergeResponse = async (userPrompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: "You are the Vyra Luxury Marrakech Concierge. You are elegant, helpful, and highly knowledgeable about luxury travel in Marrakech, Morocco. Your goal is to help users understand our services (Airport Transfers, Golf, Tours, Corporate) and provide travel tips for Marrakech. Be concise and professional. Use a tone of high-end Moroccan hospitality.",
        temperature: 0.7,
      },
    });

    return response.text || "I am currently attending to another guest. How else may I assist you with your luxury travel in Marrakech?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Our apologies, our digital concierge is temporarily unavailable. Please call us at +212 661 111 525 for immediate assistance.";
  }
};
