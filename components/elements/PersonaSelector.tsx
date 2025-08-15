"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function PersonaSelector() {
    const router = useRouter();

    const personas = [
        {
            id: 1,
            name: "Hitesh choudhary",
            description: "I am a teacher. Click me to ask any questions about coding, career, or learning!",
            image: "/hitesh.webp",
            socials: {
                instagram: "#",
                facebook: "#",
                linkedin: "#",
            }
        },
        {
            id: 2,
            name: "piyush garg",
            description: "I am a teacher, ready to help with any project or idea you have.",
            image: "/piyush.png",
            socials: {
                instagram: "#",
                facebook: "#",
                linkedin: "#",
            }
        }
    ];

    return (
        <section className="relative overflow-hidden min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 flex flex-col items-center justify-center p-6">

            <div className="absolute w-64 h-64 bg-gradient-to-br from-blue-700/80 to-white/20 rounded-full top-[20%] left-[10%] animate-pulse"></div>
            <div className="absolute w-64 h-64 bg-gradient-to-br from-cyan-400/80 to-white/20 rounded-full bottom-[20%] right-[10%] animate-pulse delay-200"></div>

            <h2 className="relative z-10 text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-12 tracking-tight text-center animate-fade-in-up">
                ✨ Choose Your <span className="text-blue-600 dark:text-cyan-400">Mentor</span>
            </h2>

            <div className="flex justify-around gap-5 px-80 w-full z-10">
                {personas.map((p) => (
                    <div
                        key={p.id}
                        onClick={() => router.push(`/chat?persona=${p.id}`)}
                        className="relative text-center p-8 rounded-2xl bg-white/80 dark:bg-slate-900/80 w-[80%] backdrop-blur-lg shadow-lg 
                hover:shadow-2xl hover:scale-105 transition-transform duration-500 
                cursor-pointer overflow-hidden group border border-gray-200 dark:border-slate-800 animate-fade-in-up"
                    >
                        <div className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-white shadow-lg overflow-hidden group-hover:scale-110 transition-transform duration-300">
                            <Image
                                src={p.image}
                                alt={p.name}
                                width={96}
                                height={96}
                                className="object-cover"
                            />
                        </div>

                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                            {p.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">{p.description}</p>

                        <button className="mt-4 px-6 py-2 rounded-lg bg-blue-600 text-white font-medium transition hover:bg-blue-700">
                            Chat Now
                        </button>
                    </div>
                ))}
            </div>

        </section>
    );
}
