import type { Metadata } from 'next';
import Link from 'next/link';
import AuthGate from '@/components/AuthGate';
import Hero from '@/components/home/Hero';
import HowItWorks from '@/components/home/HowItWorks';
import Benefits from '@/components/home/Benefits';
import Testimonials from '@/components/home/Testimonials';
import FAQ from '@/components/home/FAQ';
import Footer from '@/components/home/Footer';

export const metadata: Metadata = {
  title: 'Rounce | Simple shop organizer',
  description:
    'Rounce gives small retail shops a clear view of products, orders, and sales in one tidy place.',
  openGraph: {
    title: 'Rounce | Simple shop organizer',
    description:
      'Rounce gives small retail shops a clear view of products, orders, and sales in one tidy place.',
    url: 'https://rounce.example',
    siteName: 'Rounce',
    type: 'website',
  },
};

export default function Home() {
  return (
    <main>
      <section className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row items-start gap-8">
        <div className="flex-1">
          <Hero />
        </div>
        <div className="w-full max-w-md">
          <AuthGate>
            <div className="p-6 bg-white rounded shadow">
              <p className="mb-4">You are signed in.</p>
              <Link href="/dashboard" className="text-blue-600 underline">
                Go to dashboard
              </Link>
            </div>
          </AuthGate>
        </div>
      </section>
      <HowItWorks />
      <Benefits />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
