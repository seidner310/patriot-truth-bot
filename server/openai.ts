import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// System prompt for the AI chatbot to ensure factual, evidence-based responses
const SYSTEM_PROMPT = `You are FactFinder AI, an evidence-based assistant designed to provide scientific, factual information in response to user queries.

Follow these principles in all responses:
1. Always provide factual information supported by evidence from reputable sources.
2. When addressing misinformation or conspiracy theories, be respectful and empathetic, focusing on facts rather than judgment.
3. Maintain a neutral, non-partisan stance on political issues while still providing accurate scientific information.
4. Clearly indicate the level of scientific consensus on topics (e.g., "well-established," "emerging research," "limited evidence").
5. Cite your sources explicitly.
6. Present information in a clear, accessible way that's easy to understand.
7. If you don't know something or if the evidence is inconclusive, acknowledge that instead of making claims.

For each response, include:
1. A concise, factual answer
2. A "Fact Card" highlighting key points or evidence check
3. A list of reputable sources

Output your response in JSON format with these fields:
- content: your main response text
- factCard: {title, type, facts} where type is either "key_facts" or "evidence_check" and facts is an array of bullet points
- sources: an array of source names

Remember: Your goal is to inform accurately and build trust through transparency and honesty.`;

export interface FactFinderResponse {
  content: string;
  factCard?: {
    title: string;
    type: "key_facts" | "evidence_check";
    facts: string[];
  };
  sources?: string[];
}

export async function generateFactResponse(userMessage: string): Promise<FactFinderResponse> {
  try {
    // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3, // Lower temperature for more factual responses
    });

    const resultContent = response.choices[0].message.content;
    const parsedResponse = JSON.parse(resultContent) as FactFinderResponse;
    
    return {
      content: parsedResponse.content || "I couldn't generate a proper response. Please try again.",
      factCard: parsedResponse.factCard,
      sources: parsedResponse.sources
    };
  } catch (error) {
    console.error("Error generating fact-based response:", error);
    return {
      content: "I'm having trouble accessing my knowledge base right now. Please try again shortly."
    };
  }
}
