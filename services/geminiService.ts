import { GoogleGenAI, Modality, Type } from "@google/genai";

export const editImageWithGemini = async (base64ImageData: string, mimeType: string, prompt: string): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData.split(',')[1], // Remove the data URL prefix
              mimeType: mimeType,
            },
          },
          {
            text: `Edit this image based on the following user request: "${prompt}". Strictly adhere to the user's request. Try to maintain the original aspect ratio where possible.`,
          },
        ],
      },
      config: {
          responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }

    throw new Error("No image data found in the Gemini API response.");

  } catch (error) {
    console.error("Error editing image with Gemini:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate image: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating the image.");
  }
};

export const getPromptSuggestions = async (base64ImageData: string, mimeType: string): Promise<string[]> => {
  try {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: {
            parts: [
                {
                    inlineData: {
                        data: base64ImageData.split(',')[1],
                        mimeType: mimeType,
                    },
                },
                {
                    text: `Analyze this image. You are a creative assistant for a visual design tool called "canvas". 
                    Provide three distinct, creative, and actionable ideas for how a user could edit this image with an AI. 
                    The ideas should be formatted as short, inspiring prompts that another AI can execute. 
                    Your response must be a valid JSON array of strings. For example: ["Transform the background into a vibrant, futuristic cityscape at night.", "Apply a vintage, 1970s film photo style with warm tones and grain.", "Add a majestic, mythical creature interacting with the main subject."]`
                },
            ],
        },
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                  type: Type.STRING,
                  description: 'A creative prompt suggestion for editing the image.',
                },
            },
        },
    });

    const jsonString = response.text.trim();
    const suggestions = JSON.parse(jsonString);
    
    if (Array.isArray(suggestions) && suggestions.every(s => typeof s === 'string')) {
        return suggestions;
    }

    throw new Error("Invalid response format from Gemini API for suggestions.");

  } catch (error) {
    console.error("Error getting prompt suggestions from Gemini:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to get suggestions: ${error.message}`);
    }
    throw new Error("An unknown error occurred while getting suggestions.");
  }
};

const callGeminiImageAPI = async (base64ImageData: string, mimeType: string, prompt: string): Promise<string> => {
    try {
        if (!process.env.API_KEY) {
            throw new Error("API_KEY environment variable not set");
        }
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    { inlineData: { data: base64ImageData.split(',')[1], mimeType } },
                    { text: prompt },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            }
        }
        throw new Error("No image data found in the Gemini API response.");
    } catch (error) {
        console.error("Error with Gemini Image API:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to generate image: ${error.message}`);
        }
        throw new Error("An unknown error occurred while generating the image.");
    }
};

export const remixImage = (base64ImageData: string, mimeType: string) => {
    const prompt = `Reinterpret this image in a completely different, surprising artistic style. For example, you could try minimalist line art, abstract expressionism, cinematic, or surrealism. Generate a single, visually unique version.`;
    return callGeminiImageAPI(base64ImageData, mimeType, prompt);
};

export const interpretAndApplyEmotion = (base64ImageData: string, mimeType: string, lastPrompt: string) => {
    const prompt = `Analyze the emotional tone of this user prompt: "${lastPrompt}". Then, subtly edit the provided image to visually express that emotion. For example: for warmth, add a soft glow and warm tones; for calmness, add a blue haze; for chaos, add abstract blur motion. Apply the changes gracefully.`;
    return callGeminiImageAPI(base64ImageData, mimeType, prompt);
};

export const expandImage = (base64ImageData: string, mimeType: string) => {
    const prompt = `Expand the existing scene outward as if zooming out, revealing the environment beyond the current frame. This is also known as "outpainting". Maintain the original color palette and art style for a seamless and consistent result.`;
    return callGeminiImageAPI(base64ImageData, mimeType, prompt);
};
