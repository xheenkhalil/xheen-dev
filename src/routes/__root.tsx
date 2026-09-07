import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { AuthProvider } from "@/lib/auth/provider";
import { site } from "@/data/site";
import appCss from "../styles.css?url";

const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("xheen-theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${site.name} (${site.alias}) | ${site.title}` },
      { name: "theme-color", content: "#101412" },
      { name: "description", content: site.summary },
      { name: "author", content: `${site.name} (Moses Naantagam Thomas / Xheen Zhyfer)` },
      {
        name: "keywords",
        content:
          "Moses Thomas, Moses Naantagam Thomas, Naantagam, Xheen, Xheen Zhyfer, Senior Full Stack Engineer, Applied Data Scientist, AI Systems Architect, xheen.tech, Next.js, React, TypeScript, Python, PostgreSQL, RAG",
      },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { property: "og:site_name", content: `${site.name} — ${site.alias}` },
      { property: "og:title", content: `${site.name} (${site.alias}) | ${site.title}` },
      { property: "og:description", content: site.summary },
      { property: "og:type", content: "website" },
      { property: "og:url", content: site.url },
      { property: "og:image", content: `${site.url}/images/profile.jpg` },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: site.twitterHandle },
      { name: "twitter:creator", content: site.twitterHandle },
      { name: "twitter:title", content: `${site.name} (${site.alias}) | ${site.title}` },
      { name: "twitter:description", content: site.summary },
      { name: "twitter:image", content: `${site.url}/images/profile.jpg` },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "alternate", type: "application/rss+xml", href: "/rss.xml", title: `${site.name} Engineering Journal` },
      { rel: "canonical", href: site.url },
    ],
  }),
  component: RootLayout,
});

function RootLayout() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <SiteHeader />
          <main id="main">
            <Outlet />
          </main>
          <SiteFooter />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
