"use client"
import { Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function ChatInput() {
    const [message, setMessage] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight + "px";
        }
    }, [message]);

    const handleSend = () => {
        if (!message.trim()) return;
        console.log("Send:", message);
        setMessage("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-4 max-h-[300px] overflow-y-auto overflow-hidden">
            <div className="flex items-end gap-2 rounded-2xl border border-gray-300 bg-white shadow-sm px-4 py-2">
                <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    cols={4}
                    rows={1}
                    className="flex-1 resize-none bg-transparent outline-none text-gray-900 placeholder-gray-400"
                />
                <button
                    onClick={handleSend}
                    disabled={!message.trim()}
                    className="p-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <Send size={20} />
                </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
                Press <kbd className="px-1 py-0.5 bg-gray-200 rounded">Enter</kbd> to send •{" "}
                <kbd className="px-1 py-0.5 bg-gray-200 rounded">Shift</kbd> + Enter for newline
            </p>
        </div>
    );
}
