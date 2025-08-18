'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewPlan() {
  const [title, setTitle] = useState('My Business Plan');
  const router = useRouter();
  const create = async () => {
    const res = await fetch('/api/plan', { method: 'POST', body: JSON.stringify({ title }) });
    const data = await res.json();
    if (data.plan?.id) router.push(`/dashboard/${data.plan.id}`);
  };
  return (
    <div className="max-w-lg">
      <h2 className="text-xl font-semibold mb-2">Create a new plan</h2>
      <input value={title} onChange={e=>setTitle(e.target.value)} className="border w-full px-3 py-2 rounded mb-3" />
      <button onClick={create} className="px-3 py-1.5 rounded bg-black text-white text-sm">Create</button>
    </div>
  );
}