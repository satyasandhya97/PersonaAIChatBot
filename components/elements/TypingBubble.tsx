"use client";
import { useState, useEffect } from "react";

export default function TypingBubble({ text }: { text: string }) {
    const [dots, setDots] = useState(".");

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length < 3 ? prev + "." : "."));
        }, 400);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="mb-4 text-left">
            <div className="p-3 rounded-lg inline-block bg-blue-200 text-black">
                {text || `⏳ Typing${dots}`}
            </div>
        </div>
    );
}
