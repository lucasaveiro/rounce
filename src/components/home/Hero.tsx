import Link from 'next/link';

export default function Hero() {
  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-bold text-gray-900">Run your shop with ease</h1>
      <p className="text-lg text-gray-700">
        Rounce keeps your products, orders, and books in one simple place.
      </p>
      <p className="text-gray-700">
        <Link href="#how-it-works" className="text-blue-600 underline">
          See how it works
        </Link>
      </p>
    </div>
  );
}
