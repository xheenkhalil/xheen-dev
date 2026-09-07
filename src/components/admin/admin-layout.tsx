import { Button } from '@/components/ui/button';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  };

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 font-sans">
      <aside className="w-60 bg-zinc-900 border-r border-zinc-800 flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold text-zinc-100">Xheen CMS</h1>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <a href="/admin" className="block px-3 py-2 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors">Dashboard</a>
          <a href="/admin/projects" className="block px-3 py-2 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors">Projects</a>
          <a href="/admin/articles" className="block px-3 py-2 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors">Articles</a>
        </nav>
        <div className="p-4 border-t border-zinc-800">
          <Button variant="ghost" className="w-full justify-start text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  );
}
