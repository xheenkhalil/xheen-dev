import { createFileRoute, redirect, Link } from '@tanstack/react-router';
import { getAdminSession } from '@/lib/api/admin-auth';
import { listProjects } from '@/lib/api/projects';
import { listAllArticles } from '@/lib/api/articles';
import { AdminLayout } from '@/components/admin/admin-layout';

export const Route = createFileRoute('/admin/')({
  loader: async () => {
    const session = await getAdminSession();
    if (!session) {
      throw redirect({ to: '/admin/login' as string });
    }
    const [projects, articles] = await Promise.all([
      listProjects(),
      listAllArticles(),
    ]);
    return { projectsCount: projects.length, articlesCount: articles.length };
  },
  component: AdminDashboard,
});

function AdminDashboard() {
  const { projectsCount, articlesCount } = Route.useLoaderData();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-zinc-100">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-zinc-100 mb-2">Projects</h2>
            <p className="text-4xl font-bold text-emerald-500 mb-4">{projectsCount}</p>
            <Link to={'/admin/projects/new' as string} className="text-zinc-400 hover:text-emerald-500 underline">
              + New Project
            </Link>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-zinc-100 mb-2">Articles</h2>
            <p className="text-4xl font-bold text-emerald-500 mb-4">{articlesCount}</p>
            <Link to={'/admin/articles/new' as string} className="text-zinc-400 hover:text-emerald-500 underline">
              + New Article
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
