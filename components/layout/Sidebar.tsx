"use client";

import { useState } from "react";
import {
    Bot,
    Plus,
    MessageCircle,
    MoreHorizontal,
    Trash2,
    PanelLeftClose,
    PanelLeftOpen
} from "lucide-react";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div
            className={`bg-white border-r border-gray-200 h-screen flex flex-col justify-between transition-all duration-300
        ${isOpen ? "w-64" : "w-20"}`
            }
        >
            <div>
                <div className="flex items-center gap-2 p-4 border-b">
                    <Bot className="text-blue-600 w-6 h-6" />
                    {isOpen && <span className="font-bold text-lg text-blue-700">NeoChat</span>}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="ml-auto p-1 rounded-full hover:bg-gray-100 transition"
                        title={isOpen ? "Collapse" : "Expand"}
                    >
                        {isOpen ? (
                            <PanelLeftClose size={20} className="text-gray-600" />
                        ) : (
                            <PanelLeftOpen size={20} className="text-gray-600" />
                        )}
                    </button>
                </div>

                <button className="w-[90%] flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition m-4">
                    <Plus size={18} />
                    {isOpen && <span>New Chat</span>}
                </button>

                <div className="px-4">
                    {isOpen && (
                        <h3 className="text-gray-500 text-sm mb-2">Chat History</h3>
                    )}
                    <div className="flex items-center justify-between bg-blue-50 px-3 py-2 rounded-md hover:bg-blue-100 cursor-pointer transition">
                        <div className="flex items-center gap-2">
                            <MessageCircle size={16} className="text-blue-600" />
                            {isOpen && <span>Conversation 1</span>}
                        </div>
                        {isOpen && (
                            <MoreHorizontal size={16} className="text-gray-500" />
                        )}
                    </div>
                </div>
            </div>

            <div>
                <div className="border-t border-gray-200 my-2"></div>

                <div className="px-4 py-4 space-y-2">
                    <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 w-full transition">
                        <Trash2 size={18} />
                        {isOpen && <span>Clear History</span>}
                    </button>
                    {/* <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 w-full transition">
                        <Moon size={18} />
                        {isOpen && <span>Dark Mode</span>}
                    </button> */}
                </div>
            </div>
        </div>
    );
}
