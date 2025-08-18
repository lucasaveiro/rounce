'use client';
import Link from 'next/link';
import { supabaseClient } from '@/lib/supabaseClient';
import SubscribeButton from './SubscribeButton';

export default function Header() {
  const supabase = supabaseClient();
  const signOut = async () => { await supabase.auth.signOut(); };
  return (
    <header className="border-b bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="font-bold text-xl hover:text-gray-300">Rounce</Link>
        <nav className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm hover:text-gray-300">Dashboard</Link>
          <SubscribeButton />
          <button
            onClick={signOut}
            className="text-sm px-3 py-1 rounded bg-gray-700 hover:bg-gray-600"
          >
            Sign out
          </button>
        </nav>
      </div>
    </header>
  );
}
