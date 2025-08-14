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
        <section className="relative overflow-hidden min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6">
            {/* Glass Circles (Background Decoration) */}
            <div className="absolute w-64 h-64 bg-gradient-to-br from-blue-700/80 to-white/20 rounded-full top-[20%] left-[10%]"></div>
            <div className="absolute w-64 h-64 bg-gradient-to-br from-cyan-400/80 to-white/20 rounded-full bottom-[20%] right-[10%] "></div>

            {/* Container */}
            <div className="flex justify-around gap-5 px-80 w-full z-10">
                {personas.map((p, index) => (
                    <div
                        key={p.id}
                        onClick={() => router.push(`/chat?persona=${p.id}`)}
                        className="relative text-center p-8 rounded-2xl bg-white/30 w-[80%] backdrop-blur-md shadow-lg 
                       hover:shadow-2xl hover:scale-105 transition-transform duration-500 
                       cursor-pointer overflow-hidden group"
                    >
                        {/* Avatar Icon */}
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full border-2 border-white shadow-lg bg-gradient-to-br from-blue-100 to-white flex items-center justify-center group-hover:from-blue-200 transition">
                            <User className="w-10 h-10 text-blue-600" />
                        </div>

                        {/* Title & Description */}
                        <h3 className="text-lg font-semibold text-gray-800">{p.name}</h3>
                        <p className="text-gray-600 text-sm mt-2">{p.description}</p>

                        {/* Button */}
                        <button className="mt-4 px-5 py-2 rounded-lg bg-white/40 backdrop-blur-sm text-gray-800 font-medium transition hover:bg-white/60">
                            Know More
                        </button>

                        {/* Social Icons (Slide-in Animation) */}
                        <div className="absolute top-1/2 -translate-y-1/2 left-4 flex flex-col space-y-4">
                            <a
                                href="#"
                                className="text-gray-800 text-xl transform -translate-x-20 group-hover:translate-x-0 transition duration-300"
                            >
                                <i className="bx bxl-instagram"></i>
                            </a>
                            <a
                                href="#"
                                className="text-gray-800 text-xl transform -translate-x-20 group-hover:translate-x-0 transition duration-500"
                            >
                                <i className="bx bxl-facebook"></i>
                            </a>
                            <a
                                href="#"
                                className="text-gray-800 text-xl transform -translate-x-20 group-hover:translate-x-0 transition duration-700"
                            >
                                <i className="bx bxl-tiktok"></i>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
