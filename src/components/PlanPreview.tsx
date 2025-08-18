'use client';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function PlanPreview({ content }: { content: string }) {
  return (
    <div className="prose max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}