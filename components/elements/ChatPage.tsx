"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import TypingBubble from "@/components/elements/TypingBubble";
import { Copy, User } from "lucide-react";

export default function ChatWindow() {
    const searchParams = useSearchParams();
    const personaParam = searchParams.get("persona");

    const initialMessage = useMemo(() => {
        if (personaParam === "1") return "Hi, I’m Hitesh! How can I help you today?";
        if (personaParam === "2") return "Hey, I’m Piyush! What can I do for you?";
        return "Hello! How can I help?";
    }, [personaParam]);

    const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([
        { text: initialMessage, sender: "bot" },
    ]);

    const [streaming, setStreaming] = useState(false);
    const [streamResponse, setStreamResponse] = useState("");

    const persona = useMemo(() => {
        if (personaParam === "1") return "hitesh";
        if (personaParam === "2") return "piyush";
        return "hitesh";
    }, [personaParam]);

    const chatRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages, streamResponse]);

    const handleStreamChat = async (message: string) => {
        setMessages((prev) => [...prev, { text: message, sender: "user" }]);
        setStreaming(true);
        setStreamResponse("");

        try {
            const res = await fetch("/api/chat-stream", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message, persona }),
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

            setMessages((prev) => [...prev, { text: partialMessage, sender: "bot" }]);
        } catch (error: any) {
            setMessages((prev) => [...prev, { text: "Error: " + error.message, sender: "bot" }]);
        } finally {
            setStreaming(false);
        }
    };

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
        <div
            ref={chatRef}
            className="w-full max-w-3xl mx-auto p-4 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 dark:scrollbar-thumb-blue-700 scrollbar-track-transparent"
            style={{ scrollBehavior: "smooth" }}
        >
            {messages.map((msg, index) => {
                const avatar =
                    msg.sender === "bot" ? (
                        personaParam === "1" ? (
                            <img src="/hitesh.webp" alt="Hitesh" className="w-8 h-8 rounded-full object-cover" />
                        ) : personaParam === "2" ? (
                            <img src="/piyush.png" alt="Piyush" className="w-8 h-8 rounded-full object-cover" />
                        ) : (
                            <User className="w-8 h-8 text-gray-500" />
                        )
                    ) : null;

                return (
                    <div
                        key={index}
                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`flex items-start gap-2 group ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                                }`}
                        >
                            {avatar}
                            <div
                                className={`px-4 py-2 rounded-2xl shadow-sm ${msg.sender === "user"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-100 text-gray-900 dark:bg-slate-800 dark:text-gray-100"
                                    }`}
                            >
                                {msg.text}
                            </div>
                            {msg.sender === "bot" && (
                                <button
                                    onClick={() => navigator.clipboard.writeText(msg.text)}
                                    className="opacity-0 group-hover:opacity-100 transition p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                                    title="Copy to clipboard"
                                >
                                    <Copy className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}
            {streaming && <TypingBubble text={streamResponse} />}
        </div>
    );
}
