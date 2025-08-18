'use client';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Failed to load plan.</h2>
      {error.digest && (
        <p className="text-sm text-gray-500">Digest: {error.digest}</p>
      )}
      <Link href="/dashboard" className="text-sm underline">
        Back to Dashboard
      </Link>
    </div>
  );
}
