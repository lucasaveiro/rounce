'use client';
import { useState } from 'react';

export default function StartProButton() {
  const [loading, setLoading] = useState(false);
  const start = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', { method: 'POST' });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      onClick={start}
      disabled={loading}
      data-track="start-pro-cta"
      className={[
        'mt-6 w-full rounded bg-blue-600 px-5 py-2 text-white font-medium hover:bg-blue-500 disabled:opacity-50',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
      ].join(' ')}
    >
      {loading ? 'Loading…' : 'Start Pro'}
    </button>
  );
}
