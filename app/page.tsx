
import PersonaSelector from "@/components/elements/PersonaSelector";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-100">
      <main className="flex flex-col flex-1 p-4 gap-4">
        <PersonaSelector />
      </main>
    </div>
  );
}
