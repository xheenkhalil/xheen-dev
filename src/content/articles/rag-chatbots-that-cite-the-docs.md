A support chatbot that cannot point at a paragraph is a liability. It will sound confident. It will be wrong on the refund policy. A teammate will spend Thursday undoing it in the ticket.

SupportIQ exists because I got tired of that shape. It is a RAG application: crawl the docs, chunk them, retrieve the passage, generate the answer, and show the source. The live work is at [supportiq-ten.vercel.app](/projects/supportiq). This is the build notes.

## The product is retrieval, not chat

Chat is the costume. The product is a loop you can defend in a standup:

1. Firecrawl turns a docs site into clean markdown.
2. Chunks go into Supabase with embeddings.
3. A question hits vector search, not the whole corpus.
4. Gemini writes an answer *from those chunks*.
5. The UI streams the answer and lists the pages it used.

If step 5 is missing, you do not have a support product. You have a language model with your logo.

I am blunt about this with clients. “We will add citations later” means “we will ship a liar and hope nobody asks for the policy.” Citations are not a v2 polish. They are the difference between a bot you can put on a marketing site and a bot you can put next to a human agent.

## Crawling is a data problem

Garbage in, theatre out. If the crawler eats the nav, the footer, and three cookie banners, the retriever will quote the cookie banner.

Firecrawl is in the stack because I want markdown, not a soup of divs. The pipeline is:

- Start from a sitemap or a docs root the client names. Do not wander the whole marketing site unless they ask.
- Drop obvious chrome: nav, footer, cookie, “related posts” that recycle the same three sentences.
- Keep headings. Headings are retrieval gold. A chunk that starts with “Refunds after 30 days” will beat a chunk that starts in the middle of a paragraph.
- Store the canonical URL with every chunk. If you cannot deep-link the source, the citation is a gesture.

I keep a crawl report: pages fetched, pages skipped, bytes of markdown, and the URLs that 404’d. That report is the first artefact in a handoff. When a client says “it doesn’t know the new pricing page,” you look at the report before you look at the prompt.

Re-crawl is a job, not a button someone remembers. Docs change on Tuesdays. A weekly crawl with a diff of new/removed URLs is enough for most marketing-site knowledge bases. Product docs that move daily need a hook from the CMS. Do not guess. Ask how often the source of truth moves, then schedule the worker to that.

## Chunking is where most RAG dies

Too big and the retriever returns an essay. Too small and the model gets a sentence with no subject.

Rules I actually use:

- Split on headings first, then on size. A section is a better atom than a 500-token window that straddles two policies.
- Overlap a little so a sentence at the boundary still has a home.
- Keep the title path in the chunk: `Billing > Refunds > Partial refunds`. The model should see the trail.
- Do not mix a changelog with a policy. Separate collections if the corpus is that messy.

I store `title`, `url`, `heading_path`, `text`, and `embedding`. That is the table. Fancy metadata can wait until a query log says you need it.

A chunk without a URL is a defect. Delete it. A chunk that is only a heading is a defect. Delete it. A chunk that is a cookie banner is a defect. You already know this. The crawl report should have caught it.

## Embeddings and the query that actually runs

Supabase holds the vectors. The query is: embed the question, take the top k, optionally filter by collection (docs vs changelog vs status page), and pass those rows to Gemini.

I do not start with a reranker. I start with k=6, a minimum similarity, and a log of what came back. If the right paragraph is never in the top 6, you have a chunking or crawling problem, not a model problem. If it is in the top 6 and the answer still ignores it, you have a prompt problem.

Hybrid search (keyword + vector) earns its keep on part numbers, error codes, and SKU-like tokens that embeddings shrug at. Add it when the query log shows those misses. Do not add it because a blog said to.

The embedder and the query embedder must be the same model. This is obvious and still the bug I see in cloned repos. Write it on the runbook.

## The prompt is a contract

Gemini gets a system instruction that is boring on purpose:

- Answer only from the provided passages.
- Quote or paraphrase, then cite the URL.
- If the passages are insufficient, say you do not know and offer the human channel.
- Never invent a price, a date, or a policy exception.

The user message is the question plus the passages, each labelled with URL and heading path. I want the model to copy the URL, not invent a slug.

Streaming is for the chat UI. Citations render as soon as the model names them, or — more reliably — from the retrieved set regardless of whether the prose named them. I prefer the second. The retriever already knows the sources. The model is not the librarian.

When the model says it does not know, that is a success. Log it. If the same question “does not know” twice, the corpus is missing a page or the chunk is wrong. That is a content ticket, not a prompt tweak.

## Eval you can run on a Friday

I keep a set of twenty questions with an expected URL and a short must-include phrase. The eval retrieves, generates, and checks:

- Did the cited URL match?
- Did the answer contain the phrase, or a documented equivalent?
- Did a “should refuse” question refuse?

That is enough to stop a regression when you change chunk size or model. It is not a research benchmark. It is a standup artefact: “18/20 still cite the right page. The two misses are the new billing FAQ we have not crawled.”

If you cannot name the twenty questions, you do not know what the bot is for. Sit with a support lead and write them down. Include the nasty ones: “Can I get a refund after 45 days if I was in hospital?” If the policy is no, the bot says no and cites the page. If the policy is “ask a human,” the bot says that and stops.

## The UI is a support surface

The Next.js chat is a pane a customer can use and a pane an agent can audit.

- Stream tokens so the wait feels like a reply, not a spinner.
- Show sources under the answer, as links, with the heading path.
- Keep a transcript the team can search.
- Offer “talk to a human” as a first-class action, not a footer apology.

I do not hide the retrieval. A customer who can see the refund page trusts the sentence more. An agent who can see the page can override faster.

Empty states matter. Before a crawl, the pane should say “no docs yet,” not pretend to be helpful. After a failed crawl, it should say the crawl failed. Silence here is how you ship a bot that answers from 2024’s pricing.

## What I will not ship

- A bot with no sources.
- A crawl of the whole internet “just in case.”
- Fine-tuning as the first move. Retrieval fixes more support answers than weights.
- A widget that cannot be turned off when the corpus is stale.

SupportIQ is the case for RAG at this studio: Next.js, Gemini, Supabase, Firecrawl, and a citation on every reply. If your docs already exist, this is the product. If they do not, write the docs first. I will not retrieve a vacuum.
