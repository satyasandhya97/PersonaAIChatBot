import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: Request) {
    try {
        const { message } = await request.json();

        if (!message || typeof message !== "string") {
            return Response.json({ error: "Invalid message" }, { status: 400 });
        }

        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY is missing");
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const result = await model.generateContent(message);
        const reply = result.response.text() || "";

        console.log("Gemini reply:", reply);

        return Response.json({ response: reply });
    } catch (error: any) {
        console.error("Chat API Error:", error);
        return Response.json(
            { error: error.message || "Failed to process" },
            { status: 500 }
        );
    }
}
