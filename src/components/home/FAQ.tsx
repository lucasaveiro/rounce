const faqs = [
  {
    q: 'What is Rounce?',
    a: 'It is a simple online tool that helps small shops track products, orders, and sales.',
  },
  {
    q: 'Do I need special software?',
    a: 'No. Any device with a web browser works.',
  },
  {
    q: 'Can I try it for free?',
    a: 'Yes. The basic plan is free to use.',
  },
  {
    q: 'Is my data safe?',
    a: 'We store your data on secure servers.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. You can stop using it whenever you like.',
  },
  {
    q: 'How can I get help?',
    a: 'Email us at hello@rounce.com for support.',
  },
];

export default function FAQ() {
  return (
    <section aria-labelledby="faq-heading" className="py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h2 id="faq-heading" className="text-2xl font-semibold text-center">
          Frequently asked questions
        </h2>
        <div className="mt-8 space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className="p-4 bg-gray-50 rounded">
              <summary className="cursor-pointer font-medium focus:outline-none focus:ring-2 focus:ring-blue-500">
                {f.q}
              </summary>
              <p className="mt-2 text-sm text-gray-700">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
