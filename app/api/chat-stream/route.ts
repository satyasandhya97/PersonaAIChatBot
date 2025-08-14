import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
    try {
        const { message } = await request.json();

        if (!message || typeof message !== "string") {
            return new Response(JSON.stringify({ error: "Invalid message" }), { status: 400 });
        }

        if (!process.env.OPENAI_API_KEY) {
            throw new Error("OPENAI_API_KEY is missing");
        }

        const stream = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful chatbot." },
                { role: "user", content: message },
            ],
            stream: true,
        });

        const encoder = new TextEncoder();

        const readable = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of stream) {
                        const content = chunk.choices[0]?.delta?.content || "";
                        if (content) {
                            controller.enqueue(
                                encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
                            );
                        }
                    }
                } catch (err) {
                    console.error("Streaming error:", err);
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
        return new Response(
            JSON.stringify({ error: error.message || "Failed to process" }),
            { status: 500 }
        );
    }
}
