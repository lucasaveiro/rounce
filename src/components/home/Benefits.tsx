const benefits = [
  {
    icon: '📅',
    title: 'Daily clarity',
    text: 'Know what needs doing each morning.',
  },
  {
    icon: '📁',
    title: 'Simple organization',
    text: 'Everything sits in one tidy dashboard.',
  },
  {
    icon: '❌',
    title: 'Fewer mistakes',
    text: 'Avoid double entries and lost notes.',
  },
  {
    icon: '💰',
    title: 'More sales',
    text: 'See what to stock and when.',
  },
];

export default function Benefits() {
  return (
    <section aria-labelledby="benefits-heading" className="py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h2 id="benefits-heading" className="text-2xl font-semibold text-center">
          Benefits
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div key={b.title} className="p-6 bg-gray-50 rounded text-center">
              <div className="text-3xl" aria-hidden="true">{b.icon}</div>
              <h3 className="mt-4 font-medium">{b.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
