
import { GoogleGenAI } from "@google/genai";
import { Lesson } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIGuidance = async (
  currentLesson: Lesson,
  userQuestion: string,
  history: { role: 'user' | 'model', text: string }[]
) => {
  const systemInstruction = `
    你是一位非常有耐心、温和的量化交易导师。你的学生是一位完全没有基础的“太奶奶”。
    你需要：
    1. 使用大量生活中的比喻（如买菜、做饭、带孩子、打麻将、缝补等）来解释复杂的金融概念。
    2. 语言要亲切，多使用“亲爱的太奶奶”、“咱们”、“没关系”等词汇。
    3. 每次回答不要太长，避免使用深奥的数学公式和英语缩写，除非能用中文完美解释。
    4. 当前课程是：第 ${currentLesson.day} 天 - ${currentLesson.title}。
    5. 如果太奶奶觉得难，要及时鼓励，并提供更简单的比喻。
  `;

  const contents = [
    ...history.map(h => ({ parts: [{ text: h.text }] })),
    { parts: [{ text: userQuestion }] }
  ];

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: { parts: [{ text: userQuestion }] }, // Simplified for quick API use
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });
    return response.text || "太奶奶，我刚才有点走神了，您能再说一遍吗？";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "太奶奶，信号有点不好，咱们缓一缓再聊。";
  }
};
