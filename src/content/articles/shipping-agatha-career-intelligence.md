Job search products fail in a predictable way. They ship a resume editor, bolt on a chatbot, and call the result a platform. The candidate still copy-pastes into twenty boards. The cover letter is still a paragraph of adjectives. The application still does not go out on Thursday night.

Agatha Career Intelligence is the opposite of that. It is a live product at [agathalabs.app](/projects/agatha-career-intelligence) that owns the queue: parse the CV, match the role, rewrite the documents, and — when the candidate asks — apply.

This is how I built it, what I refused to fake, and what I would repeat on the next career product.

## The brief, written down

Before a model was called, the job was a sentence: **take a messy PDF and produce a completed application that would not embarrass the candidate in an ATS.**

That sentence kills a lot of scope.

- A pretty template pack is not the product.
- A chat that “helps you think about your career” is not the product.
- A job board scrape with no tailoring is not the product.

The product is a loop. Upload. Profile. Match. Tailor. Apply. Review. Repeat. Every screen has to justify its place in that loop or it is cut.

I treat that loop as a queue of jobs, not a page of features. Parsing is slow. Matching is slow. Document generation is slow. The UI cannot wait on any of them. That decision — workers for the slow path, a Next.js app for the fast path — is the architecture. Everything else is an implementation detail.

## What the candidate actually does

1. Upload a CV. Agatha parses it into a structured profile: roles, dates, stack, outcomes.
2. Set terms. Location, seniority, salary band, the companies they will not touch.
3. Review matches. The matcher is only as good as the profile schema; this screen is where that becomes obvious.
4. Approve a tailored resume and cover letter per posting. ATS score is computed against the posting, not a vibes check.
5. Optionally connect Gmail over OAuth and let the agent submit.

If a step cannot be explained in one breath on a Friday call, it does not ship.

## Profile extraction is the unglamorous core

Everyone wants to talk about the agent. The agent is downstream of a JSON object.

A CV is a PDF with a personality. Columns, icons, tables that are not tables, dates in three formats, a skills list that mixes “Excel” with “built the billing system.” If you embed the raw text and hope a model will retrieve the right years of experience, you will ship a liar.

Agatha turns the PDF into a schema a matcher can query:

- Role title, employer, start, end, and a short outcome line.
- A technical stack inferred from the bullets, not copied from a keyword cloud.
- Education and certifications as records, not a blob.
- Constraints the candidate typed: visa, city, “no agencies.”

Skill inference is the piece that looks like magic and is mostly rules plus a model with a tight prompt. “Built a React app” has to mean hooks, state, and ES6+, or the matcher will send a junior frontend to a staff platform role because both say React. I would rather under-infer and show the candidate the gap than over-infer and waste a recruiter’s Tuesday.

The schema is the contract. Downstream jobs — matching, tailoring, auto-apply — read the schema. They do not re-parse the PDF. If the schema is wrong, you fix the parser, not the prompt on the cover letter.

## Matching without a fantasy dataset

Job data is stale the moment you store it. Agatha pulls from live boards rather than pretending a nightly dump is a market.

Matching is not cosine similarity on the whole CV. It is a set of filters the candidate would apply by hand, then a ranker:

- Must-match: location, seniority band, work authorization, excluded companies.
- Should-match: stack overlap, domain, company size.
- Rank: how close the posting is to the trajectory in the profile, not how many keywords hit.

The ranker can be a model. The filters cannot. A candidate who said “no agencies” should never see an agency, no matter how pretty the embedding.

I keep a dead-simple eval for this: a fixture of twenty postings a real candidate would accept or reject, and a script that fails the build if the matcher violates a must-match. Cosine demos do not survive that script.

## Tailoring is a rewrite with a score, not a synonym swap

ATS is a picky intern. It wants the posting’s language in the resume’s bullets, in a layout it can parse, without the candidate turning into a different person.

Agatha rewrites against the posting:

- Restructure bullets so the outcome is first and the tool is second.
- Inject keywords that are already true in the profile. If the profile does not support a keyword, it does not get injected. That is a hard rule.
- Format through recruiter-vetted templates so the parser sees jobs, dates, and skills as fields.
- Compute an ATS quality score against *this* posting and show it next to the draft.

The score is the artefact I can put in a meeting. “We improved the score” is a sentence. “The AI made it better” is not.

Cover letters follow the same rule: cite the posting, cite one proof from the profile, stop. A cover letter that could be sent to any company is a defect.

Hallucination is a product bug, not a model personality. The tailoring prompt is not allowed to invent a metric, a title, or a tool. If the profile is thin, the draft is thin, and the UI says so.

## Auto-apply is a privilege, not a default

The dangerous feature is the one that sends email.

Agatha can submit on the candidate’s behalf through a connected Gmail account. That is OAuth, not a stored password. The agent drafts, the candidate can review, and the audit log is the product as much as the send.

I would not ship auto-apply without:

- Explicit opt-in per day, not a buried toggle.
- A cap (ten daily auto-apps is a product decision, not a slogan).
- A paper trail the candidate can export.
- Encryption at rest and in transit. AES-256 and TLS 1.2+ are the floor.
- A promise that CVs are not training data.

If you cannot say “strictly no training” and mean it, you should not hold someone’s employment history.

## Workers, not spinners

The UI is Next.js and TypeScript. The slow work is a queue.

Parsing, crawling, matching, and document generation run as background jobs. The app shows state: queued, running, ready, failed. A candidate can close the tab. That is not a nice-to-have. Job search happens in the gaps of someone else’s job.

Streaming belongs on chat and on draft generation, where watching tokens is useful. It does not belong on “we are scraping twenty boards.” For that, a job status and an email when it is done are more honest.

## What I would not do again

- I would not start with a chatbot. Chat is a surface. The schema is the product.
- I would not skip the ATS score. Without a number, tailoring debates become taste.
- I would not let the model write the profile. Extraction is a pipeline with tests. Generation is downstream.
- I would not demo auto-apply on a founder’s inbox. Use a fixture mailbox and a logged dry-run first.

## What I hand a client

When this kind of product leaves the studio, the Friday artefact is:

- The live URL and the staging URL.
- The profile schema, with examples.
- The matcher eval fixtures.
- The worker map: which job does what, how to retry, how to see a dead letter.
- OAuth setup, env vars, and a credentials page that is not a screenshot of a `.env`.
- A one-pager: what the candidate does, what the agent does, what a human still has to do.

Agatha is the case I put at the top of [the work](/projects) because it is the full loop. If you want a career platform, this is the standard. If you want a pitch deck about one, I am the wrong hire.
