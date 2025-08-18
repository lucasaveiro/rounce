import AuthGate from '@/components/AuthGate';
export default function Home() {
  return (
    <AuthGate>
      <div className="text-center">
        <h1 className="text-3xl font-semibold">Rounce — AI Business Plan Builder</h1>
        <p className="mt-2 text-gray-600">Move your ideas forward with a guided, chat-based planner.</p>
      </div>
    </AuthGate>
  );
}