"use client";

import Image from "next/image";
import { Moon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const personas = [
    {
        id: 1,
        name: "Hitesh choudhary",
        image: "/hitesh.webp",
    },
    {
        id: 2,
        name: "Piyush Garg",
        image: "/piyush.png",
    },
];

export default function Header() {
    const searchParams = useSearchParams();
    const personaId = Number(searchParams.get("persona"));

    const persona = useMemo(() => {
        return personas.find((p) => p.id === personaId);
    }, [personaId]);

    return (
        <header className="flex justify-center border-b border-gray-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
            {/* Inner container to match ChatWindow width */}
            <div className="w-[50%] flex justify-between items-center p-4">
                {/* Left: Persona Avatar + Name + Status */}
                <div className="flex items-center gap-4">
                    {persona ? (
                        <>
                            <Image
                                src={persona.image}
                                alt={persona.name}
                                width={40}
                                height={40}
                                className="rounded-full border border-gray-300 dark:border-slate-600"
                            />
                            <div>
                                <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                    {persona.name}
                                </h1>
                                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span>Online</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                            AI Assistant
                        </h1>
                    )}
                </div>

                {/* Right: Theme Toggle */}
                <div className="flex gap-4">
                    <button
                        className="bg-transparent cursor-pointer text-gray-900 dark:text-gray-100 text-xl p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 transition"
                        aria-label="Toggle theme"
                    >
                        <Moon className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </header>
    );
}

