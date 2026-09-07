import { createFileRoute, redirect, Link, useRouter } from '@tanstack/react-router';
import { getAdminSession } from '@/lib/api/admin-auth';
import { listAllArticles, deleteArticle } from '@/lib/api/articles';
import { AdminLayout } from '@/components/admin/admin-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const Route = createFileRoute('/admin/articles/')({
  loader: async () => {
    const session = await getAdminSession();
    if (!session) throw redirect({ to: '/admin/login' as string });
    const articles = await listAllArticles();
    return { articles };
  },
  component: ArticlesList,
});

function ArticlesList() {
  const { articles } = Route.useLoaderData();
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      await deleteArticle({ data: id });
      router.invalidate();
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-zinc-100">Articles</h1>
        <Link to={'/admin/articles/new' as string}>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">New Article</Button>
        </Link>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="p-4 text-zinc-400 font-medium">Title</th>
              <th className="p-4 text-zinc-400 font-medium">Tags</th>
              <th className="p-4 text-zinc-400 font-medium">Published</th>
              <th className="p-4 text-zinc-400 font-medium">Date</th>
              <th className="p-4 text-zinc-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                <td className="p-4 text-zinc-100 font-medium">{article.title}</td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {article.tags?.slice(0, 3).map((tag) => (
                      <Badge key={tag} className="bg-zinc-800 text-zinc-300 text-xs border-none">{tag}</Badge>
                    ))}
                  </div>
                </td>
                <td className="p-4">
                  {article.published ? (
                    <Badge className="bg-emerald-500/20 text-emerald-500 border-none">Published</Badge>
                  ) : (
                    <Badge variant="outline" className="border-zinc-700 text-zinc-500">Draft</Badge>
                  )}
                </td>
                <td className="p-4 text-zinc-400">{article.date}</td>
                <td className="p-4 space-x-2">
                  <Link to={'/admin/articles/edit/$id' as string} params={{ id: article.id }}>
                    <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-xs px-2 py-1 h-auto">Edit</Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="border-red-800 text-red-400 hover:bg-red-900/30 text-xs px-2 py-1 h-auto"
                    onClick={() => handleDelete(article.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
            {articles.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-zinc-500">No articles found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
