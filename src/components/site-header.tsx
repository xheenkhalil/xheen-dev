import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { nav, site } from "@/data/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6">
        <Link
          to="/"
          className="font-serif text-2xl tracking-tight text-foreground"
          onClick={() => setOpen(false)}
        >
          {site.wordmark}
          <span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-150",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button asChild className="hidden sm:inline-flex">
            <Link to="/hire">
              Hire me
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          className="border-t border-border bg-background px-4 py-4 md:hidden"
          aria-label="Mobile"
        >
          <div className="grid gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/hire"
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center text-sm font-medium text-accent"
            >
              Hire me
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
