import { createFileRoute, redirect, Link, useRouter } from '@tanstack/react-router';
import { getAdminSession } from '@/lib/api/admin-auth';
import { listProjects, deleteProject } from '@/lib/api/projects';
import { AdminLayout } from '@/components/admin/admin-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const Route = createFileRoute('/admin/projects/')({
  loader: async () => {
    const session = await getAdminSession();
    if (!session) throw redirect({ to: '/admin/login' as string });
    const projects = await listProjects();
    return { projects };
  },
  component: ProjectsList,
});

function ProjectsList() {
  const { projects } = Route.useLoaderData();
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await deleteProject({ data: id });
      router.invalidate();
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-zinc-100">Projects</h1>
        <Link to={'/admin/projects/new' as string}>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">New Project</Button>
        </Link>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="p-4 text-zinc-400 font-medium">Title</th>
              <th className="p-4 text-zinc-400 font-medium">Category</th>
              <th className="p-4 text-zinc-400 font-medium">Featured</th>
              <th className="p-4 text-zinc-400 font-medium">Date</th>
              <th className="p-4 text-zinc-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                <td className="p-4 text-zinc-100 font-medium">{project.title}</td>
                <td className="p-4 text-zinc-400">{project.category}</td>
                <td className="p-4">
                  {project.featured && <Badge className="bg-emerald-500/20 text-emerald-500 border-none">Featured</Badge>}
                </td>
                <td className="p-4 text-zinc-400">{project.date}</td>
                <td className="p-4 space-x-2">
                  <Link to={'/admin/projects/edit/$id' as string} params={{ id: project.id }}>
                    <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-xs px-2 py-1 h-auto">Edit</Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="border-red-800 text-red-400 hover:bg-red-900/30 text-xs px-2 py-1 h-auto"
                    onClick={() => handleDelete(project.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-zinc-500">No projects found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
