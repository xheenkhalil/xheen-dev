import { Link } from "@tanstack/react-router";
import { nav, site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-serif text-2xl tracking-tight">
            {site.wordmark}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            {site.name} — {site.tagline}
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm" aria-label="Footer">
          {nav.map((item) => (
            <Link key={item.href} to={item.href} className="min-h-11 inline-flex items-center">
              {item.label}
            </Link>
          ))}
          <a href={site.github} className="min-h-11 inline-flex items-center" rel="noreferrer">
            GitHub
          </a>
          <a href={site.linkedin} className="min-h-11 inline-flex items-center" rel="noreferrer">
            LinkedIn
          </a>
          <a href={site.twitter} className="min-h-11 inline-flex items-center" rel="noreferrer">
            X (Twitter)
          </a>
        </nav>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} {site.name}. {site.domain}
        </p>
      </div>
    </footer>
  );
}
