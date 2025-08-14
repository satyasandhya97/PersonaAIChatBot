import ChatInput from "@/components/elements/ChatInput";
import ChatWindow from "@/components/elements/ChatWindow";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

export default function ChatPage({ searchParams }: { searchParams: { persona?: string } }) {
    const persona = searchParams.persona || "1";

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                {/* <Header /> */}
                <main className="flex flex-col items-center flex-1 p-4 ">
                    <ChatWindow />
                    <ChatInput />
                </main>
            </div>
        </div>
    );
}
