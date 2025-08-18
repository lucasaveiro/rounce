'use client';
import { useState } from 'react';

export default function SubscribeButton() {
  const [loading, setLoading] = useState(false);
  const onClick = async () => {
    setLoading(true);
    const res = await fetch('/api/checkout', { method: 'POST' });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    setLoading(false);
  };
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="px-3 py-1.5 rounded bg-white text-gray-900 text-sm hover:bg-gray-100 disabled:opacity-50"
    >
      {loading ? 'Redirecting…' : 'Go Pro'}
    </button>
  );
}
