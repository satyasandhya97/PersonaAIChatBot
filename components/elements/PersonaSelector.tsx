"use client";

import { useRouter } from "next/navigation";
import { User } from "lucide-react";

export default function PersonaSelector() {
    const router = useRouter();

    const personas = [
        { id: 1, name: "Person 1", description: "Friendly and helpful AI" },
        { id: 2, name: "Person 2", description: "Professional and focused AI" },
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
            <h1 className="text-2xl font-bold text-blue-700 mb-6">Choose Your Persona</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
                {personas.map((p) => (
                    <div
                        key={p.id}
                        onClick={() => router.push(`/chat?persona=${p.id}`)}
                        className="cursor-pointer group bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition transform hover:scale-105 hover:shadow-xl hover:bg-blue-50"
                    >
                        <div className="bg-blue-100 p-4 rounded-full mb-4 group-hover:bg-blue-200 transition">
                            <User className="w-10 h-10 text-blue-600" />
                        </div>
                        <h2 className="text-lg font-semibold text-blue-700">{p.name}</h2>
                        <p className="text-gray-500 mt-2">{p.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
