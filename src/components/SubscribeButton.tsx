'use client';
import Link from 'next/link';

export default function SubscribeButton() {
  return (
    <Link
      href="/pricing"
      data-track="go-pro-nav"
      className={[
        'px-3 py-1.5 rounded bg-white text-gray-900 text-sm hover:bg-gray-100',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500',
      ].join(' ')}
    >
      Go Pro
    </Link>
  );
}
