"use client";

import Image from "next/image";
import { Moon, ArrowLeft } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
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
    const router = useRouter();
    const personaId = Number(searchParams.get("persona"));

    const persona = useMemo(() => {
        return personas.find((p) => p.id === personaId);
    }, [personaId]);

    return (
        <header className="flex justify-center border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-slate-800 dark:to-slate-700 rounded-t-2xl shadow-md">
            <div className="w-full max-w-4xl flex justify-between items-center p-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.push("/")}
                        className="p-2 rounded-md hover:bg-white/20 transition text-white"
                        aria-label="Go back"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>

                    {persona ? (
                        <>
                            <Image
                                src={persona.image}
                                alt={persona.name}
                                width={44}
                                height={44}
                                className="rounded-full border-2 border-white dark:border-slate-700 shadow-sm"
                            />
                            <div>
                                <h1 className="text-lg font-semibold text-white dark:text-gray-100">
                                    {persona.name}
                                </h1>
                                <div className="flex items-center gap-2 text-sm text-blue-100 dark:text-gray-400">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span>Online</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <h1 className="text-lg font-semibold text-white dark:text-gray-100">
                            AI Assistant
                        </h1>
                    )}
                </div>

                {/* Theme Toggle */}
                <div className="flex gap-4">
                    <button
                        className="bg-transparent text-white dark:text-gray-100 p-2 rounded-md hover:bg-white/20 transition"
                        aria-label="Toggle theme"
                    >
                        <Moon className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </header>
    );
}
