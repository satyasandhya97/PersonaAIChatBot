import { Linkedin, Github, Twitter } from "lucide-react";

export default function Header() {
    return (
        <header className="w-full bg-white shadow-md p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-700">
                Persona AI ChatBot
            </h1>

            <div className="flex gap-4 text-blue-600">
                <a href="#" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-6 h-6 hover:text-blue-800 transition" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                    <Twitter className="w-6 h-6 hover:text-blue-800 transition" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                    <Github className="w-6 h-6 hover:text-blue-800 transition" />
                </a>

            </div>
        </header>
    );
}
