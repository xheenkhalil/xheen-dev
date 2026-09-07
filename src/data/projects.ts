export type Project = {
  slug: string;
  title: string;
  summary: string;
  category: "Product" | "Web" | "Data Analytics" | "Data Science";
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  cover?: string;
  date: string;
  body: string;
};

export const projects: Project[] = [
  {
    slug: "agatha-career-intelligence",
    title: "Agatha Career Intelligence",
    summary:
      "Agatha Career Intelligence is an AI-powered career platform that helps job seekers discover opportunities, optimize resumes, generate tailored cover letters, prepare for interviews, and automate job applications. Built with a modern full-stack architecture, it combines intelligent career insights, AI-driven document generation, and workflow automation to simplify and accelerate the job search process while improving application quality and success rates.",
    category: "Product",
    stack: ["Next.js", "TypeScript", "AI", "Full stack"],
    liveUrl: "https://agathalabs.app",
    featured: true,
    cover: "/images/projects/agatha-career-intelligence.jpg",
    date: "2026-08-01",
    body: `Agatha Career Intelligence is the product I point at when someone asks what “shipping the thing” looks like. It is not a resume template pack with a chatbot glued on. It is a career platform that takes a messy PDF, turns it into structured profile data, matches roles, rewrites documents for each posting, and can run the application loop while the candidate sleeps.

## The job, not the demo

Job search is a queue of repetitive work: parse the CV, scan twenty boards, rewrite bullets for ATS, draft a cover letter that is not generic, and actually submit. Agatha owns that queue.

- Upload a CV and get a queryable profile, not a blob of text.
- Match against live openings instead of a static job dump.
- Tailor the resume per role — keywords, structure, and ATS score in the same pass.
- Generate a cover letter that cites the posting, not a paragraph of adjectives.
- Auto-apply through a connected inbox when the candidate wants the agent to move.

The live product is at [agathalabs.app](https://agathalabs.app). That URL is the case study.

## What I actually built

The architecture is a Next.js / TypeScript full stack with background workers for the slow jobs — crawling, matching, document generation — so the UI never waits on a model. Profile extraction turns unstructured PDFs into a schema a matcher can query. Skill inference is the unglamorous piece: “built a React app” has to mean hooks, state, and ES6+, or the matching layer is theatre.

ATS quality is measured, not claimed. Templates are recruiter-vetted. The score is computed against the posting, not a vibes check. When the agent applies, Gmail is connected over OAuth. Credentials stay with the candidate. Nothing is trained on their CV.

## Why this is the featured case

Agatha is the standard I hold the rest of the studio to: a live URL, a real workflow, and a handoff a client can run a meeting with. If you want the build notes, I wrote them up in [Shipping Agatha Career Intelligence](/articles/shipping-agatha-career-intelligence).
`,
  },
  {
    slug: "velo-e-commerce",
    title: "Velo - E-Commerce",
    summary:
      "A simple yet detailed ecommerce site built using Typescript, Next.JS and Tailwind CSS. Headless dummy data initialized and prepared with Sanity.io.",
    category: "Web",
    stack: ["TypeScript", "Next.js", "Tailwind CSS", "Sanity"],
    liveUrl: "https://velostores.vercel.app/",
    githubUrl: "https://github.com/xheenkhalil/velostore",
    featured: true,
    cover: "/images/projects/velo-e-commerce.jpg",
    date: "2025-12-15",
    body: `A simple yet detailed ecommerce site built using Typescript, Next.JS and Tailwind CSS. Headless dummy data initialized and prepared with Sanity.io.

This small website is built with a standard SEO practice and optimized for speed. I used Framer motion for swift motion and animation.

## What the storefront actually does

Velo is a catalogue, product page, and cart — the parts a merchant can walk through on a call without a six-month commerce platform underneath. Sanity holds the merchandising data. Next.js renders the storefront. Tailwind keeps the layout honest on a phone.

- Headless content, not a theme locked to a CMS.
- Product data you can edit without a deploy.
- Fast first paint; the merchandising is the point, not the framework tour.

Live: [velostores.vercel.app](https://velostores.vercel.app/). Source: [github.com/xheenkhalil/velostore](https://github.com/xheenkhalil/velostore).
`,
  },
  {
    slug: "hero-zodiac-website-blog",
    title: "Hero zodiac - Website/Blog",
    summary:
      "An astrology website built headless with Typescript and Next.js. Used Tailwind V4.",
    category: "Web",
    stack: ["TypeScript", "Next.js", "Tailwind v4"],
    liveUrl: "https://herozodiac.vercel.app",
    githubUrl: "https://github.com/xheenkhalil/herozodiac",
    featured: true,
    cover: "/images/projects/hero-zodiac-website-blog.jpg",
    date: "2025-12-11",
    body: `An astrology website built headless with Typescript and Next.js. Used Tailwind V4.

Hero zodiac is a content site first: signs, articles, and a reading experience that holds up on a phone. Headless so editorial can move without a deploy ritual. Tailwind v4 for the visual system — type, space, and a layout that does not collapse when the copy gets long.

Live: [herozodiac.vercel.app](https://herozodiac.vercel.app).
`,
  },
  {
    slug: "secure-web",
    title: "Secure Web - Abstract Web Security Platform",
    summary:
      "A simple raw HTML 5/Tailwind CSS CDN website made from pure imagination. No serverside application.",
    category: "Web",
    stack: ["HTML5", "Tailwind CSS", "Vanilla JS", "SVG"],
    liveUrl: "https://secureweb-five.vercel.app/",
    githubUrl: "https://github.com/xheenkhalil/secureweb",
    featured: true,
    cover: "/images/projects/secure-web.jpg",
    date: "2025-12-08",
    body: `A simple raw HTML 5/Tailwind CSS CDN website made from pure imagination. No serverside application.

SecureWeb - Real-time Data Dashboard
Stack: HTML5, Tailwind CSS, Vanilla JavaScript
Description: A performance-first dashboard prototype built without heavy JavaScript frameworks.

- Advanced CSS/Tailwind: Utilized for complex grid layouts, glassmorphism (backdrop-blur), and hardware-accelerated keyframe animations.
- SVG Manipulation: Created custom, multi-layer gauges and a dynamic network map using SVG strokes and dash-offsets to simulate data flow.
- Responsive Architecture: Implemented a mobile-first approach, ensuring complex data grids stack legibly on smaller devices while maintaining the visual hierarchy.

Live: [secureweb-five.vercel.app](https://secureweb-five.vercel.app/). Source: [github.com/xheenkhalil/secureweb](https://github.com/xheenkhalil/secureweb).
`,
  },
  {
    slug: "supportiq",
    title: "SupportIQ - Support Chatbot For Websites",
    summary:
      "An intelligent, autonomous customer support platform powered by Google's Gemini LLM. SupportIQ automatically crawls and indexes company documentation to provide accurate, context-aware answers to user queries in real-time.",
    category: "Product",
    stack: ["Next.js", "Gemini", "Supabase", "Firecrawl"],
    liveUrl: "https://supportiq-ten.vercel.app/",
    githubUrl: "https://github.com/xheenkhalil/supportiq",
    featured: true,
    cover: "/images/projects/supportiq.jpg",
    date: "2025-12-07",
    body: `An intelligent, autonomous customer support platform powered by Google's Gemini LLM. SupportIQ automatically crawls and indexes company documentation to provide accurate, context-aware answers to user queries in real-time.

SupportIQ
Stack: Next.js, Google Gemini API, Supabase, Firecrawl
Description: A full-stack RAG (Retrieval-Augmented Generation) application designed for automated customer success.

- Data Pipeline: Utilized Firecrawl to scrape and turn web documentation into clean markdown.
- Vector Search: Implemented Supabase for storing vector embeddings, allowing the AI to semantic search through company data for precise context.
- Generative AI: Integrated the Gemini API to synthesize natural, human-like responses based on the retrieved context.
- Frontend: Built a responsive chat interface with Next.js, featuring real-time streaming responses and a custom backend.

The point of SupportIQ is not “a chatbot.” It is a retrieval loop you can defend in a standup: crawl the docs, chunk them, retrieve the passage, generate the answer, and show the source. If the model cannot cite the page, it should say so.

Live: [supportiq-ten.vercel.app](https://supportiq-ten.vercel.app/). Source: [github.com/xheenkhalil/supportiq](https://github.com/xheenkhalil/supportiq).
`,
  },
  {
    slug: "gymzest",
    title: "Gymzest Premium Gym Membership Site",
    summary:
      "A full responsive gym membership website with a display of available services and prices of each packages. Built with Next.js and Tailwind CSS.",
    category: "Web",
    stack: ["Next.js", "Tailwind CSS"],
    liveUrl: "https://gymnest.vercel.app/",
    githubUrl: "https://github.com/xheenkhalil/gymnest",
    featured: true,
    cover: "/images/projects/gymzest.jpg",
    date: "2025-11-28",
    body: `A full responsive gym membership website with a display of available services and prices of each packages. Built with Next.js and Tailwind CSS.

This high-performance, fully responsive gym membership platform is engineered using Next.js for optimal SEO and rendering speed, seamlessly styled with Tailwind CSS to ensure a flawless mobile-first experience across all devices. The user interface features a visually engaging services showcase utilizing modern grid layouts, alongside a clear, dynamic pricing tier display that enables prospective members to intuitively compare package benefits and costs. Built with scalability and conversion in mind, the architecture supports easy content management and secure inquiries, effectively streamlining the path from digital visitor to loyal gym member.

Live: [gymnest.vercel.app](https://gymnest.vercel.app/). Source: [github.com/xheenkhalil/gymnest](https://github.com/xheenkhalil/gymnest).
`,
  },
  {
    slug: "zyntra",
    title: "Exams Site",
    summary:
      "A full-featured exams website built with React, Node.js, Typecript, Vite and Postgres.",
    category: "Web",
    stack: ["React", "Node.js", "TypeScript", "Vite", "Postgres"],
    liveUrl: "https://zyntraexams.vercel.app",
    githubUrl: "https://github.com/xheenkhalil/zyntra_",
    featured: false,
    cover: "/images/projects/zyntra.jpg",
    date: "2023-10-15",
    body: `A full-featured exams website built with React, Node.js, Typecript, Vite and Postgres.

Zyntra is an online examination platform: timed papers, question banks, and a Postgres-backed record of attempts. React and Vite on the client, Node.js on the API, Postgres for the durable bits — enrolments, papers, and scores that have to survive a refresh.

Live: [zyntraexams.vercel.app](https://zyntraexams.vercel.app). Source: [github.com/xheenkhalil/zyntra_](https://github.com/xheenkhalil/zyntra_).
`,
  },
  {
    slug: "vydra",
    title: "Vydra - All Video Downloader",
    summary:
      "An all video downloader made with Python and Next.js. Analyze URL and fetch video/Audio information and allows user to download.",
    category: "Web",
    stack: ["Python", "Next.js"],
    liveUrl: "https://vydra-downloader.vercel.app",
    githubUrl: "https://github.com/xheenkhalil/vydra",
    featured: false,
    cover: "/images/projects/vydra.jpg",
    date: "2023-10-01",
    body: `An all video downloader made with Python and Next.js. Analyze URL and fetch video/Audio information and allows user to download.

Vydra is a powerful video downloader application. Paste a URL, inspect the available streams, and pull video or audio. Python handles the analysis; Next.js is the surface the user actually touches.

Live: [vydra-downloader.vercel.app](https://vydra-downloader.vercel.app). Source: [github.com/xheenkhalil/vydra](https://github.com/xheenkhalil/vydra).
`,
  },
  {
    slug: "cinemuse",
    title: "Movie Recommendation System",
    summary:
      "A simple movie recommendation system built with HTML5/Tailwind CSS and Vanilla Javascript.",
    category: "Web",
    stack: ["HTML5", "Tailwind CSS", "Vanilla Javascript"],
    liveUrl: "https://cinemusemovies.netlify.app",
    githubUrl: "https://github.com/xheenkhalil/cinemuse",
    featured: false,
    cover: "/images/projects/cinemuse.jpg",
    date: "2023-06-05",
    body: `A simple movie recommendation system built with HTML5/Tailwind CSS and Vanilla Javascript.

Cinemuse is a movie recommendation engine. No framework tax — HTML5, Tailwind, and vanilla JavaScript — so the catalogue and the recommend loop stay easy to read and easy to host.

Live: [cinemusemovies.netlify.app](https://cinemusemovies.netlify.app). Source: [github.com/xheenkhalil/cinemuse](https://github.com/xheenkhalil/cinemuse).
`,
  },
  {
    slug: "amazon-data-analytics",
    title: "Amazon Data Analytics",
    summary:
      "Using python, SQL and powerbi for and in-depth analytics on Amazon store dataset to generate insights and to help store owners make informed decisions.",
    category: "Data Analytics",
    stack: ["Python", "SQL", "Power BI"],
    featured: false,
    date: "2025-09-24",
    body: `Using python, SQL and powerbi for and in-depth analytics on Amazon store dataset to generate insights and to help store owners make informed decisions.

The work is a store-operations loop: clean the extract, write the SQL that answers the meeting question, and put the result in Power BI so a merchant can see category, fulfilment, and trend without opening a notebook.
`,
  },
  {
    slug: "portfolio-site",
    title: "Portfolio Site",
    summary: "Built with Next.js and Typescript for speed and ease of management.",
    category: "Web",
    stack: ["Next.js", "TypeScript"],
    liveUrl: "https://mosesthomas.vercel.app",
    githubUrl: "https://github.com/xheenkhalil/portfolio-site",
    featured: false,
    cover: "/images/projects/portfolio-site.jpg",
    date: "2023-11-01",
    body: `Built with Next.js and Typescript for speed and ease of management.

My personal portfolio website built with Next.js, optimized for speed and SEO filled.

Live: [mosesthomas.vercel.app](https://mosesthomas.vercel.app). Source: [github.com/xheenkhalil/portfolio-site](https://github.com/xheenkhalil/portfolio-site).
`,
  },
  {
    slug: "spotify-analytics-dashboard",
    title: "Spotify Analytics Dashboard",
    summary:
      "Interactive BI dashboard (Power BI + Python) for streaming trends & artist insights.",
    category: "Data Analytics",
    stack: ["Power BI", "Python"],
    githubUrl: "https://github.com/xheenkhalil/Spotify-Dashboard",
    featured: false,
    date: "2023-09-15",
    body: `Interactive BI dashboard (Power BI + Python) for streaming trends & artist insights.

A comprehensive dashboard analyzing Spotify streaming data. Python prepares the extract; Power BI is the interactive surface for trends, artist mix, and the questions a music-ops meeting actually asks.

Source: [github.com/xheenkhalil/Spotify-Dashboard](https://github.com/xheenkhalil/Spotify-Dashboard).
`,
  },
  {
    slug: "disease-prediction-model",
    title: "Disease Prediction Model",
    summary:
      "ML classification pipeline (scikit-learn) with feature engineering and model explainability.",
    category: "Data Science",
    stack: ["scikit-learn", "Python"],
    githubUrl: "https://github.com/xheenkhalil/med-diagnosis",
    featured: false,
    date: "2023-08-20",
    body: `ML classification pipeline (scikit-learn) with feature engineering and model explainability.

Machine learning model predicting diseases from symptoms. The pipeline is the product: features, a classifier you can retrain, and enough explainability that a reviewer can see why a label fired.

Source: [github.com/xheenkhalil/med-diagnosis](https://github.com/xheenkhalil/med-diagnosis).
`,
  },
  {
    slug: "walmart-store-analysis",
    title: "Walmart Store Analysis",
    summary:
      "SQL + Python analysis of product/category performance with actionable recommendations.",
    category: "Data Analytics",
    stack: ["SQL", "Python"],
    githubUrl: "https://github.com/xheenkhalil/walmart-store-analysis",
    featured: false,
    date: "2023-07-10",
    body: `SQL + Python analysis of product/category performance with actionable recommendations.

Analysis of Walmart store sales data. Category and product performance, written so a merchandising lead can act — not a gallery of charts without a recommendation.

Source: [github.com/xheenkhalil/walmart-store-analysis](https://github.com/xheenkhalil/walmart-store-analysis).
`,
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function featuredProjects() {
  return projects.filter((project) => project.featured);
}

export function otherProjects() {
  return projects.filter((project) => !project.featured);
}
