const quotes = [
  {
    text: '“Rounce cut our paperwork in half.”',
    author: 'Maria, gift shop owner',
  },
  {
    text: '“I check it every morning with my coffee.”',
    author: 'Derek, bike store',
  },
];

export default function Testimonials() {
  return (
    <section aria-labelledby="testimonials-heading" className="py-12 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <h2 id="testimonials-heading" className="text-2xl font-semibold text-center">
          What shop owners say
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {quotes.map((q) => (
            <figure key={q.text} className="p-6 bg-white rounded shadow">
              <blockquote className="text-gray-700">{q.text}</blockquote>
              <figcaption className="mt-4 text-sm text-gray-600">{q.author}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
