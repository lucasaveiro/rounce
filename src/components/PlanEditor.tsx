'use client';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Plan = { content_md?: string } | null;

export default function PlanEditor({ plan, onSave }: { plan: Plan; onSave: (md: string) => Promise<void>; }) {
  const [md, setMd] = useState(plan?.content_md || '');
  const [section, setSection] = useState('Executive Summary');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    const res = await fetch('/api/generate', { method: 'POST', body: JSON.stringify({ section, input }) });
    const data = await res.json();
    setMd(prev => prev + `\n\n` + (data.draft || ''));
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <div className="flex gap-2 mb-2">
          <input value={section} onChange={e=>setSection(e.target.value)} placeholder="Section" className="border px-2 py-1 rounded w-40" />
          <input value={input} onChange={e=>setInput(e.target.value)} placeholder="What should this section cover?" className="border px-2 py-1 rounded flex-1" />
          <button onClick={generate} disabled={loading} className="px-3 py-1.5 rounded bg-black text-white text-sm">{loading?'Thinking…':'Draft'}</button>
        </div>
        <textarea value={md} onChange={e=>setMd(e.target.value)} className="w-full h-[480px] border rounded p-3 font-mono text-sm" />
        <div className="mt-3 flex gap-2">
          <button onClick={() => onSave(md)} className="px-3 py-1.5 rounded bg-emerald-600 text-white text-sm">Save</button>
        </div>
      </div>
      <div className="prose max-w-none border rounded p-3 bg-white">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{md}</ReactMarkdown>
      </div>
    </div>
  );
}