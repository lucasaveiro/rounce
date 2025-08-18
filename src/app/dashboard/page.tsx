import Link from 'next/link';
import { supabaseServer } from '@/lib/supabaseServer';

export default async function Dashboard() {
  const supabase = supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return <div>Please sign in.</div>;
  const { data: plans } = await supabase.from('plans').select('*').eq('user_id', user.id).eq('is_deleted', false).order('created_at', { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Your Plans</h2>
        <Link href="/dashboard/new" className="px-3 py-1.5 rounded bg-black text-white text-sm">New Plan</Link>
      </div>
      <ul className="space-y-2">
        {plans?.map((p) => (
          <li key={p.id} className="border rounded p-3 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{p.title}</div>
                <div className="text-xs text-gray-500">{new Date(p.updated_at).toLocaleString()}</div>
              </div>
              <Link href={`/dashboard/${p.id}`} className="text-sm underline">Open</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}