import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const outDir = "/workspace/public/images/projects";

const shots = [
  { url: "https://agathalabs.app", file: "agatha-career-intelligence.jpg" },
  { url: "https://velostores.vercel.app/", file: "velo-e-commerce.jpg" },
  { url: "https://herozodiac.vercel.app", file: "hero-zodiac-website-blog.jpg" },
  { url: "https://secureweb-five.vercel.app/", file: "secure-web.jpg" },
  { url: "https://supportiq-ten.vercel.app/", file: "supportiq.jpg" },
  { url: "https://gymnest.vercel.app/", file: "gymzest.jpg" },
  { url: "https://zyntraexams.vercel.app", file: "zyntra.jpg" },
  { url: "https://vydra-downloader.vercel.app", file: "vydra.jpg" },
  { url: "https://cinemusemovies.netlify.app", file: "cinemuse.jpg" },
  { url: "https://mosesthomas.vercel.app", file: "portfolio-site.jpg" },
];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
});

for (const shot of shots) {
  const page = await context.newPage();
  const dest = join(outDir, shot.file);
  try {
    await page.goto(shot.url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(3500);
    await page.screenshot({
      path: dest,
      type: "jpeg",
      quality: 82,
      fullPage: false,
    });
    console.log("ok", shot.file);
  } catch (err) {
    console.error("fail", shot.file, err instanceof Error ? err.message : err);
  } finally {
    await page.close();
  }
}

await browser.close();
