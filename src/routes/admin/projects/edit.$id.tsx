import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { getAdminSession } from '@/lib/api/admin-auth';
import { getProjectById, updateProject } from '@/lib/api/projects';
import { uploadMultipleImages } from '@/lib/api/upload';
import { AdminLayout } from '@/components/admin/admin-layout';
import { MarkdownEditor } from '@/components/admin/markdown-editor';
import { TagInput } from '@/components/admin/tag-input';
import { ImageUpload } from '@/components/admin/image-upload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export const Route = createFileRoute('/admin/projects/edit/$id')({
  loader: async ({ params }) => {
    const session = await getAdminSession();
    if (!session) throw redirect({ to: '/admin/login' as string });
    const project = await getProjectById({ data: params.id });
    if (!project) throw new Error('Project not found');
    return { project };
  },
  component: EditProjectPage,
});

function EditProjectPage() {
  const { project } = Route.useLoaderData();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    slug: project.slug,
    title: project.title,
    summary: project.summary,
    body: project.body,
    cover: project.cover || '',
    images: project.images || [],
    stack: project.stack || [],
    liveUrl: project.liveUrl || '',
    githubUrl: project.githubUrl || '',
    category: project.category,
    featured: project.featured,
    date: project.date,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProject({
        data: {
          id: project.id,
          data: {
            slug: formData.slug,
            title: formData.title,
            summary: formData.summary,
            category: formData.category,
            stack: formData.stack,
            liveUrl: formData.liveUrl || undefined,
            githubUrl: formData.githubUrl || undefined,
            featured: formData.featured,
            cover: formData.cover || undefined,
            images: formData.images,
            date: formData.date,
            body: formData.body,
          },
        },
      });
      navigate({ to: '/admin/projects' as string });
    } catch (err) {
      alert('Failed to update: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-zinc-100 mb-8">Edit Project</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Title *</label>
            <Input required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="bg-zinc-800 border-zinc-700 text-zinc-100" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Slug *</label>
            <Input required value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="bg-zinc-800 border-zinc-700 text-zinc-100" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Category *</label>
            <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full h-10 rounded-md border border-zinc-700 bg-zinc-800 px-3 text-zinc-100 text-sm">
              <option value="Product">Product</option>
              <option value="Web">Web</option>
              <option value="Data Analytics">Data Analytics</option>
              <option value="Data Science">Data Science</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Date *</label>
            <Input type="date" required value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="bg-zinc-800 border-zinc-700 text-zinc-100" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Summary *</label>
          <Textarea required rows={3} value={formData.summary} onChange={(e) => setFormData({ ...formData, summary: e.target.value })} className="bg-zinc-800 border-zinc-700 text-zinc-100" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Tech Stack</label>
          <TagInput value={formData.stack} onChange={(tags) => setFormData({ ...formData, stack: tags })} placeholder="Add technology and press Enter" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Live URL</label>
            <Input type="url" value={formData.liveUrl} onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })} className="bg-zinc-800 border-zinc-700 text-zinc-100" placeholder="https://..." />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">GitHub URL</label>
            <Input type="url" value={formData.githubUrl} onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })} className="bg-zinc-800 border-zinc-700 text-zinc-100" placeholder="https://github.com/..." />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Cover Image Path</label>
          <Input value={formData.cover} onChange={(e) => setFormData({ ...formData, cover: e.target.value })} className="bg-zinc-800 border-zinc-700 text-zinc-100" placeholder="/images/projects/my-cover.jpg" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Project Images</label>
          <ImageUpload
            images={formData.images}
            onChange={(imgs) => setFormData({ ...formData, images: imgs })}
            uploadFn={async (files) => {
              const result = await uploadMultipleImages({ data: files });
              return result;
            }}
          />
        </div>

        <div className="flex items-center space-x-2">
          <input type="checkbox" id="featured" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} className="h-4 w-4 rounded border-zinc-700 bg-zinc-800 text-emerald-600 focus:ring-emerald-500" />
          <label htmlFor="featured" className="text-sm font-medium text-zinc-300">Featured Project</label>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Body (Markdown) *</label>
          <MarkdownEditor value={formData.body} onChange={(val) => setFormData({ ...formData, body: val })} />
        </div>

        <div className="pt-4 flex gap-3">
          <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button type="button" variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800" onClick={() => navigate({ to: '/admin/projects' as string })}>
            Cancel
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
}
