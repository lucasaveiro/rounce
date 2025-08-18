import StartProButton from '@/components/pricing/StartProButton';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing – Rounce',
  description: 'Simple plans for small businesses. Upgrade to Pro to save time and stay organized.',
  openGraph: {
    title: 'Pricing – Rounce',
    description: 'Simple plans for small businesses. Upgrade to Pro to save time and stay organized.',
  },
};

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      {/* Hero */}
      <section className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Choose your plan</h1>
        <p className="mt-2 text-gray-600">Built for owners who want proposals done in minutes.</p>
      </section>

      {/* Tiers */}
      <section aria-labelledby="plans-heading" className="mb-16">
        <h2 id="plans-heading" className="sr-only">Plans</h2>
        <div className="grid gap-8 sm:grid-cols-2">
          {/* Free tier */}
          <div className="rounded-lg border p-6">
            <h3 className="text-xl font-semibold">Free</h3>
            <p className="mt-4 text-3xl font-bold">$0</p>
            <ul className="mt-4 space-y-2">
              <li>1 proposal per month</li>
              <li>Basic templates</li>
              <li>Email support</li>
            </ul>
          </div>

          {/* Pro tier */}
          <div className="rounded-lg border p-6 bg-gray-50">
            <h3 className="text-xl font-semibold">Pro</h3>
            <p className="mt-4 text-3xl font-bold">$19<span className="text-base font-medium">/mo</span></p>
            <ul className="mt-4 space-y-2">
              <li>Unlimited proposals</li>
              <li>Custom branding</li>
              <li>Priority support</li>
            </ul>
            <StartProButton />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section aria-labelledby="benefits-heading" className="mb-16">
        <h2 id="benefits-heading" className="text-2xl font-bold mb-4">Why go Pro?</h2>
        <ul className="space-y-2">
          <li>Save hours creating documents</li>
          <li>Keep every proposal organized</li>
          <li>Onboard your team in minutes</li>
        </ul>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="mb-16">
        <h2 id="faq-heading" className="text-2xl font-bold mb-4">FAQ</h2>
        <div className="space-y-4">
          <details className="rounded border p-4">
            <summary className="font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              How does billing work?
            </summary>
            <p className="mt-2 text-sm text-gray-600">Billing is monthly. Cancel anytime.</p>
          </details>
          <details className="rounded border p-4">
            <summary className="font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              Can I cancel?
            </summary>
            <p className="mt-2 text-sm text-gray-600">Yes, cancel whenever. Your plan runs until the end of the cycle.</p>
          </details>
          <details className="rounded border p-4">
            <summary className="font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              Do you offer support?
            </summary>
            <p className="mt-2 text-sm text-gray-600">Pro users receive priority email support.</p>
          </details>
        </div>
      </section>
    </main>
  );
}
