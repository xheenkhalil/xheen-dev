import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { getAdminSession } from '@/lib/api/admin-auth';
import { createArticle } from '@/lib/api/articles';
import { AdminLayout } from '@/components/admin/admin-layout';
import { MarkdownEditor } from '@/components/admin/markdown-editor';
import { TagInput } from '@/components/admin/tag-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export const Route = createFileRoute('/admin/articles/new')({
  loader: async () => {
    const session = await getAdminSession();
    if (!session) throw redirect({ to: '/admin/login' as string });
  },
  component: NewArticlePage,
});

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function NewArticlePage() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    excerpt: '',
    body: '',
    tags: [] as string[],
    published: true,
    date: new Date().toISOString().split('T')[0],
  });

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug === slugify(prev.title) || !prev.slug ? slugify(title) : prev.slug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createArticle({
        data: {
          slug: formData.slug,
          title: formData.title,
          excerpt: formData.excerpt,
          date: formData.date,
          tags: formData.tags,
          body: formData.body,
          published: formData.published,
        },
      });
      navigate({ to: '/admin/articles' as string });
    } catch (err) {
      alert('Failed to create article: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-zinc-100 mb-8">New Article</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Title *</label>
            <Input required value={formData.title} onChange={(e) => handleTitleChange(e.target.value)} className="bg-zinc-800 border-zinc-700 text-zinc-100" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Slug *</label>
            <Input required value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="bg-zinc-800 border-zinc-700 text-zinc-100" placeholder="auto-generated-from-title" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Date *</label>
          <Input type="date" required value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="bg-zinc-800 border-zinc-700 text-zinc-100 max-w-xs" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Excerpt *</label>
          <Textarea required rows={2} value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} className="bg-zinc-800 border-zinc-700 text-zinc-100" placeholder="Brief summary shown in article cards and SEO meta" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Tags</label>
          <TagInput value={formData.tags} onChange={(tags) => setFormData({ ...formData, tags })} placeholder="Add tag and press Enter" />
        </div>

        <div className="flex items-center space-x-2">
          <input type="checkbox" id="published" checked={formData.published} onChange={(e) => setFormData({ ...formData, published: e.target.checked })} className="h-4 w-4 rounded border-zinc-700 bg-zinc-800 text-emerald-600 focus:ring-emerald-500" />
          <label htmlFor="published" className="text-sm font-medium text-zinc-300">Published</label>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Body (Markdown) *</label>
          <MarkdownEditor value={formData.body} onChange={(val) => setFormData({ ...formData, body: val })} />
        </div>

        <div className="pt-4 flex gap-3">
          <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white" disabled={saving}>
            {saving ? 'Creating...' : 'Create Article'}
          </Button>
          <Button type="button" variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800" onClick={() => navigate({ to: '/admin/articles' as string })}>
            Cancel
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
}
