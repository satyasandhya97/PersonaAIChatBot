export default function ChatWindow() {
    return (
        <div className="w-[50%] flex-1 overflow-y-auto p-4 rounded-t-lg ">
            {/* Chat messages */}
            <div className="mb-4">
                <div className="bg-blue-200 p-3 rounded-lg inline-block">Hello! How can I help?</div>
            </div>
            <div className="mb-4 text-right">
                <div className="bg-blue-500 text-white p-3 rounded-lg inline-block">Tell me about yourself.</div>
            </div>
        </div>
    );
}
