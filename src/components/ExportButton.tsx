'use client';
import html2pdf from 'html2pdf.js';
import { useRef, useState } from 'react';
import { supabaseClient } from '@/lib/supabaseClient';

export default function ExportButton({ selector, planId }: { selector: string; planId: string }) {
  const supabase = supabaseClient();
  const [loading, setLoading] = useState(false);

  const exportAndUpload = async () => {
    setLoading(true);
    const element = document.querySelector(selector) as HTMLElement;
    const blob: Blob = await new Promise((resolve) => {
      const opt = { margin: 10, filename: `rounce-plan-${planId}.pdf` } as any;
      html2pdf().from(element).set(opt).outputPdf('blob').then((b: Blob) => resolve(b));
    });

    // upload to storage
    const { data: userRes } = await supabase.auth.getUser();
    if (!userRes.user) return;
    const path = `${userRes.user.id}/${planId}.pdf`;
    const { data, error } = await supabase.storage.from('plans').upload(path, blob, { upsert: true, contentType: 'application/pdf' });
    if (error) { alert(error.message); setLoading(false); return; }

    // save path in DB
    await fetch('/api/plan', { method: 'PUT', body: JSON.stringify({ id: planId, content_md: undefined, title: undefined, export_pdf_path: path }) });

    setLoading(false);
    alert('Exported & uploaded!');
  };

  return (
    <button onClick={exportAndUpload} disabled={loading}
      className="px-3 py-1.5 rounded bg-indigo-600 text-white text-sm disabled:opacity-50">
      {loading ? 'Exporting…' : 'Export to PDF'}
    </button>
  );
}