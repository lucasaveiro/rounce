import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { section, input, tone = 'concise' } = await req.json();
  const key = process.env['OPENAI_API_KEY'];
  if (!key) {
    // Fallback stub for early MVP when no key is set
    const stub = `## ${section}\n${input ? `Input: ${input}\n` : ''}Draft: (stub) Write 2-3 concise paragraphs addressing this section.`;
    return NextResponse.json({ draft: stub });
  }
  const prompt = `You are an assistant helping write a small-business plan. Section: ${section}. Tone: ${tone}. Use plain, simple English and avoid jargon. Return Markdown.`;

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: input || '' },
      ],
      temperature: 0.5,
    }),
  });
  const data = await res.json();
  const draft = data.choices?.[0]?.message?.content || '';
  return NextResponse.json({ draft });
}

