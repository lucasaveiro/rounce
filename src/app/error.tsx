'use client';
import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('Uncaught error:', error);
  }, [error]);

  return (
    <html>
      <body className="p-4">
        <h2 className="text-lg font-semibold">Something went wrong</h2>
        {error.digest && (
          <p className="mt-2 text-sm text-gray-500">Digest: {error.digest}</p>
        )}
        <button
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
          onClick={() => reset()}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
