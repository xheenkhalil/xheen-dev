import { useState } from 'react';
import { markdownToHtml } from '@/lib/markdown';

export function MarkdownEditor({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  const [tab, setTab] = useState<'write' | 'preview'>('write');

  return (
    <div className="border border-zinc-800 rounded-md overflow-hidden bg-zinc-900 flex flex-col">
      <div className="flex border-b border-zinc-800 bg-zinc-950">
        <button type="button" onClick={() => setTab('write')} className={`px-4 py-2 text-sm ${tab === 'write' ? 'text-emerald-500 border-b-2 border-emerald-500' : 'text-zinc-400 hover:text-zinc-100'}`}>Write</button>
        <button type="button" onClick={() => setTab('preview')} className={`px-4 py-2 text-sm ${tab === 'preview' ? 'text-emerald-500 border-b-2 border-emerald-500' : 'text-zinc-400 hover:text-zinc-100'}`}>Preview</button>
      </div>
      <div className="flex-1 min-h-[300px] p-4">
        {tab === 'write' ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-full min-h-[300px] bg-transparent text-zinc-100 font-mono resize-y outline-none border-none focus:ring-0"
            placeholder="Write markdown here..."
          />
        ) : (
          <div className="prose-article prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: markdownToHtml(value) }} />
        )}
      </div>
    </div>
  );
}
