"use client";
import { useState, useRef, useEffect } from "react";

export default function ChatWindow() {
    const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([
        { text: "Hello! How can I help?", sender: "bot" },
    ]);
    const chatRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom when messages change
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    // Function to send message to API
    const sendMessage = async (message: string) => {
        setMessages((prev) => [...prev, { text: message, sender: "user" }]);
        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message }),
            });

            const data = await res.json();
            setMessages((prev) => [
                ...prev,
                { text: message, sender: "user" },
                { text: data.response || "No response", sender: "bot" },
            ]);
        } catch (error: any) {
            setMessages((prev) => [
                ...prev,
                { text: "Error: " + error.message, sender: "bot" },
            ]);
        }
    };

    // Pass sendMessage to ChatInput using custom event
    useEffect(() => {
        const handler = (e: CustomEvent) => {
            sendMessage(e.detail);
        };
        window.addEventListener("send-message", handler as EventListener);
        return () => {
            window.removeEventListener("send-message", handler as EventListener);
        };
    }, []);

    return (
        <div
            ref={chatRef}
            className="w-[50%] flex-1 overflow-y-auto p-4 rounded-t-lg"
        >
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
        </div>
    );
}
