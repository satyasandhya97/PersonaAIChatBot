import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
    try {
        const { message } = await request.json();

        if (!message || typeof message !== "string") {
            return Response.json({ error: "Invalid message" }, { status: 400 });
        }

        if (!process.env.OPENAI_API_KEY) {
            throw new Error("OPENAI_API_KEY is missing");
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful chatbot." },
                { role: "user", content: message },
            ],
        });

        const reply = completion.choices[0]?.message?.content || "";

        console.log("OpenAI reply:", reply);

        return Response.json({ response: reply });
    } catch (error: any) {
        console.error("Chat API Error:", error);
        return Response.json(
            { error: error.message || "Failed to process" },
            { status: 500 }
        );
    }
}
