import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-12" role="contentinfo">
      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} Rounce</p>
        <div className="flex gap-4">
          <Link href="/terms" className="hover:underline">Terms</Link>
          <Link href="/privacy" className="hover:underline">Privacy</Link>
          <a href="mailto:hello@rounce.com" className="hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  );
}
