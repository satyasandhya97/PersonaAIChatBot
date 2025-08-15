import ChatInput from "@/components/elements/ChatInput";
import ChatWindow from "@/components/elements/ChatPage";
import Header from "@/components/layout/Header";
import { Suspense } from "react";

export default function ChatPage() {
    return (
        <div className="flex min-h-screen justify-center items-center px-4 bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
            <div className="flex-1 max-w-4xl w-full flex flex-col rounded-2xl shadow-xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg h-[90vh]">
                <div className="flex-1 overflow-y-auto">
                    <Suspense fallback={<div>Loading chat...</div>}>
                        <Header />
                        <ChatWindow />
                    </Suspense>
                </div>
                <ChatInput />
            </div>
        </div>
    );
}
