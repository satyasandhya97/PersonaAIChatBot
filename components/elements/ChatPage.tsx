"use client";
import { useState, useRef, useEffect } from "react";

export default function ChatWindow() {
    const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([
        { text: "Hello! How can I help?", sender: "bot" },
    ]);
    const [streaming, setStreaming] = useState(false);
    const [streamResponse, setStreamResponse] = useState("");

    const chatRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom when messages change
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages, streamResponse]);

    // Send a message via streaming API
    const handleStreamChat = async (message: string) => {
        setMessages((prev) => [...prev, { text: message, sender: "user" }]);
        setStreaming(true);
        setStreamResponse("");

        try {
            const res = await fetch("/api/chat-stream", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message }),
            });

            if (!res.body) throw new Error("No response body");

            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let partialMessage = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split("\n");

                for (const line of lines) {
                    const trimmed = line.trim();
                    if (trimmed.startsWith("data:")) {
                        const jsonStr = trimmed.replace(/^data:\s*/, "");
                        if (jsonStr !== "[DONE]") {
                            try {
                                const data = JSON.parse(jsonStr);
                                if (data.content?.parts && data.content.parts.length > 0) {
                                    const rawText = data.content.parts.map((p: any) => p.text).join("");

                                    // Remove Markdown symbols like *, _, ~, ` etc.
                                    const cleanText = rawText.replace(/[*_~`]/g, "").trim();

                                    partialMessage += cleanText;
                                    setStreamResponse((prev) => prev + cleanText);
                                }
                            } catch (err) {
                                console.error("JSON parse error", err, jsonStr);
                            }
                        }
                    }
                }
            }

            // Append final bot message
            setMessages((prev) => [...prev, { text: partialMessage, sender: "bot" }]);
        } catch (error: any) {
            setMessages((prev) => [
                ...prev,
                { text: "Error: " + error.message, sender: "bot" },
            ]);
        } finally {
            setStreaming(false);
        }
    };

    // Listen for send-message event
    useEffect(() => {
        const handler = (e: CustomEvent) => {
            handleStreamChat(e.detail);
        };
        window.addEventListener("send-message", handler as EventListener);
        return () => {
            window.removeEventListener("send-message", handler as EventListener);
        };
    }, []);

    return (
        <div ref={chatRef} className="w-[50%] flex-1 overflow-y-auto p-4 rounded-t-lg">
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={`mb-4 ${msg.sender === "user" ? "text-right" : "text-left"}`}
                >
                    <div
                        className={`p-3 rounded-lg inline-block ${msg.sender === "user"
                            ? "bg-blue-500 text-white"
                            : "bg-blue-200 text-black"
                            }`}
                    >
                        {msg.text}
                    </div>
                </div>
            ))}

            {streaming && (
                <div className="mb-4 text-left">
                    <div className="p-3 rounded-lg inline-block bg-blue-200 text-black">
                        {streamResponse || "⏳ Typing..."}
                    </div>
                </div>
            )}
        </div>
    );
}
