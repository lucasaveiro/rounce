'use client';
import Link from 'next/link';
import { supabaseClient } from '@/lib/supabaseClient';
import SubscribeButton from './SubscribeButton';

export default function Header() {
  const supabase = supabaseClient();
  const signOut = async () => { await supabase.auth.signOut(); };
  return (
    <header className="border-b bg-white">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="font-bold text-xl">Rounce</Link>
        <nav className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm">Dashboard</Link>
          <SubscribeButton />
          <button onClick={signOut} className="text-sm px-3 py-1 rounded bg-gray-100 hover:bg-gray-200">Sign out</button>
        </nav>
      </div>
    </header>
  );
}