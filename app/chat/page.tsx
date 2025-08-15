import ChatInput from "@/components/elements/ChatInput";
import ChatWindow from "@/components/elements/ChatPage";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

export default async function ChatPage({ searchParams }: { searchParams: { persona?: string } }) {

    return (
        <div className="flex min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 justify-center items-center px-4">
            <div className="flex-1 max-w-4xl w-full flex flex-col rounded-2xl shadow-xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg h-[90vh]">

                <div className="flex-none">
                    <Header />
                </div>

                <div className="flex-1 overflow-y-auto">
                    <ChatWindow />
                </div>

                <div className="flex-none">
                    <ChatInput />
                </div>
            </div>
        </div>


    );
}
