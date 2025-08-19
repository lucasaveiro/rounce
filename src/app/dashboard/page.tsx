import Link from 'next/link';
import { supabaseServer } from '@/lib/supabaseServer';
import PlanListItem from '@/components/PlanListItem';

export default async function Dashboard() {
  const supabase = supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return <div>Please sign in.</div>;
  const { data: plans } = await supabase
    .from('plans')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_deleted', false)
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Your Plans</h2>
        <Link href="/dashboard/new" className="px-3 py-1.5 rounded bg-black text-white text-sm">New Plan</Link>
      </div>
      <ul className="space-y-2">
        {plans?.map((p) => (
          <PlanListItem key={p.id} plan={p} />
        ))}
      </ul>
    </div>
  );
}
