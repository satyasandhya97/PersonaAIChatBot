"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Instagram, Facebook, Linkedin } from "lucide-react";

export default function PersonaSelector() {
    const router = useRouter();

    const personas = [
        {
            id: 1,
            name: "Hitesh choudhary",
            description: "I am a teacher. Click me to ask any questions about coding, career, or learning!",
            image: "/hitesh.webp",
            socials: {
                instagram: "https://instagram.com/hitesh",
                facebook: "https://facebook.com/hitesh",
                linkedin: "https://linkedin.com/in/hitesh",
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
        <section className="relative overflow-hidden min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6">
            {/* Glass Circles (Background Decoration) */}
            <div className="absolute w-64 h-64 bg-gradient-to-br from-blue-700/80 to-white/20 rounded-full top-[20%] left-[10%]"></div>
            <div className="absolute w-64 h-64 bg-gradient-to-br from-cyan-400/80 to-white/20 rounded-full bottom-[20%] right-[10%]"></div>

            {/* Container */}
            <div className="flex justify-around gap-5 px-80 w-full z-10">
                {personas.map((p) => (
                    <div
                        key={p.id}
                        onClick={() => router.push(`/chat?persona=${p.id}`)}
                        className="relative text-center p-8 rounded-2xl bg-white/30 w-[80%] backdrop-blur-md shadow-lg 
                       hover:shadow-2xl hover:scale-105 transition-transform duration-500 
                       cursor-pointer overflow-hidden group"
                    >
                        {/* Avatar Image */}
                        <div className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-white shadow-lg overflow-hidden">
                            <Image
                                src={p.image}
                                alt={p.name}
                                width={96}
                                height={96}
                                className="object-cover"
                            />
                        </div>

                        {/* Title & Description */}
                        <h3 className="text-lg font-semibold text-gray-800">{p.name}</h3>
                        <p className="text-gray-600 text-sm mt-2">{p.description}</p>

                        {/* Button */}
                        <button className="mt-4 px-6 py-2 rounded-lg bg-blue-600 text-white font-medium transition hover:bg-blue-700">
                            Chat Now
                        </button>

                        {/* Social Icons (Slide-in Animation) */}
                        <div className="absolute top-1/2 -translate-y-1/2 left-4 flex flex-col space-y-4">
                            <a
                                href={p.socials.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-800 hover:text-pink-500 transform -translate-x-20 group-hover:translate-x-0 transition duration-300"
                            >
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a
                                href={p.socials.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-800 hover:text-pink-600 transform -translate-x-20 group-hover:translate-x-0 transition duration-500"
                            >
                                <Facebook className="w-6 h-6" />
                            </a>
                            <a
                                href={p.socials.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-800 hover:text-pink-700 transform -translate-x-20 group-hover:translate-x-0 transition duration-700"
                            >
                                <Linkedin className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
