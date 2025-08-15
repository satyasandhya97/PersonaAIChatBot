
import PersonaSelector from "@/components/elements/PersonaSelector";

export default function Home() {
  return (
    <div className="min-h-screen h-screen flex flex-col overflow-hidden bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
      <main className="flex flex-col flex-1 p-4 gap-4 overflow-hidden">
        <PersonaSelector />
      </main>
    </div>
  );
}
