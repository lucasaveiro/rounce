'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PlanListItem({ plan }: { plan: { id: string; title: string; updated_at: string } }) {
  const router = useRouter();
  const remove = async () => {
    if (!confirm('Delete this plan?')) return;
    await fetch('/api/plan', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: plan.id }),
    });
    router.refresh();
  };
  return (
    <li className="border rounded p-3 bg-white text-gray-900">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium">{plan.title}</div>
          <div className="text-xs text-gray-500">{new Date(plan.updated_at).toLocaleString()}</div>
        </div>
        <div className="flex gap-2">
          <Link href={`/dashboard/${plan.id}`} className="text-sm underline">Open</Link>
          <button onClick={remove} className="text-sm text-red-600">Delete</button>
        </div>
      </div>
    </li>
  );
}
