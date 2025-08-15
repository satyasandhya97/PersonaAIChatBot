import { GoogleGenAI } from "@google/genai";
import { getPrompts } from "@/lib/personas";

export async function POST(request: Request) {
  try {
    const { message, persona } = await request.json();
    console.log("Persona received:", persona);

    if (!message || typeof message !== "string") {
      return new Response(JSON.stringify({ error: "Invalid message" }), { status: 400 });
    }

    const personaPrompt = getPrompts(persona);

    if (!personaPrompt) {
      return new Response(JSON.stringify({ error: "Invalid persona" }), { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const model = ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: [
        { role: "user", parts: [{ text: personaPrompt }] },
        { role: "user", parts: [{ text: message }] },  
      ],
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of await model) {
            const text = chunk?.candidates?.[0]?.content || "";
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: text })}\n\n`));
          }
        } catch (err) {
          console.error("Gemini streaming error:", err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ error: error.message || "Failed to process" }), {
      status: 500,
    });
  }
}
