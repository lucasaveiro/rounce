const steps = [
  {
    icon: '📝',
    title: 'Create an account',
    text: 'Sign up with your email to get started.',
  },
  {
    icon: '📦',
    title: 'Add products or services',
    text: 'List what you sell in just a few minutes.',
  },
  {
    icon: '📊',
    title: 'Follow orders and books',
    text: 'Watch sales and stock in one place.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="py-12 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <h2 id="how-heading" className="text-2xl font-semibold text-center">
          How it works
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.title} className="p-6 bg-white rounded shadow text-center">
              <div className="text-3xl" aria-hidden="true">{s.icon}</div>
              <h3 className="mt-4 font-medium">{s.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
