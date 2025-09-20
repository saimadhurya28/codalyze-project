
import { GoogleGenAI } from "@google/genai";
import { ActionType } from '../types';
import { PROMPTS } from '../constants';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getCodeAnalysis(code: string, action: ActionType): Promise<string> {
  const model = 'gemini-2.5-flash';
  const promptTemplate = PROMPTS[action];
  const prompt = promptTemplate.replace('{{CODE}}', code);

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        return `Error from Gemini API: ${error.message}`;
    }
    return "An unexpected error occurred while communicating with the Gemini API.";
  }
}
