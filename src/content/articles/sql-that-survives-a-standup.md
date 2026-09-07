A dashboard that cannot answer the question in the room is decoration. I have sat in those rooms. Someone opens Power BI. Someone else asks “which category actually moved last month?” and the author of the dashboard starts clicking filters like a pianist who forgot the piece.

The analytics I want to be hired for is the other kind: SQL you can read aloud, a number with a grain, and a sentence a merchant can act on. That is the work behind [Amazon Data Analytics](/projects/amazon-data-analytics), [Walmart Store Analysis](/projects/walmart-store-analysis), and the [Spotify dashboard](/projects/spotify-analytics-dashboard). This is the method.

## Start from the meeting, not the schema

I write the question first, in the stakeholder’s words.

- “Which categories should we cut if we have to free warehouse space?”
- “Is the Amazon store’s fulfilment mix hiding a margin hole?”
- “Which artists are carrying the playlist, and which are passengers?”

Then I write the grain: one row per what, as of when, with which filters. If you cannot say the grain in one sentence, you are not ready to SELECT.

Examples of grain that survive a standup:

- One row per category per week, net of returns.
- One row per SKU in the current catalogue, with trailing 12-week units and contribution.
- One row per artist per month, with stream share and a flag for “new this quarter.”

A model with three different grains glued together is how you get a number nobody can reconcilie to the extract. Split the models. Join in the last mile only when the meeting needs a comparison.

## The extract is a contract

Python gets the file in. SQL tells the truth. Power BI is the stage.

I do not let Power BI be the place where business logic is invented. Calculated columns that encode “if region is X then Y” will fork the second someone builds a second report. Put that rule in SQL, name it, and test it.

A boring extract checklist:

- Row counts in vs out, by file date.
- Null rates on the keys you will join.
- Duplicate keys. If `order_id` is not unique, stop. Do not “distinct” your way to a story.
- Timezone and currency, written down. “Last month” is not a timestamp.

Amazon store extracts are messy in the ways operations are messy: fulfilment channels, returns that land in a later file, SKUs that change title. Walmart category files have the same energy. I keep a `stg_` layer that only renames and types, and a `int_` layer that implements the rules. The mart the dashboard reads should be dull.

If I cannot rebuild the mart from the raw files with one command, I do not trust the number. Notebooks that only run on my laptop are not a pipeline. A script with a README is.

## SQL I will defend

A query that survives a standup has four qualities.

**It names the grain in a CTE.** `category_week` is better than a 120-line FROM with aliases `a`, `b`, `c`.

**It isolates filters.** Date range, channel, and “is_active” are CTEs or views, not WHERE clauses hidden in a join. When someone asks “did you include marketplace?” you can point.

**It shows the denominator.** Conversion without sessions is a vibe. Contribution without units is a vibe. I select both.

**It is runnable without the BI tool.** I keep the canonical query in the repo. Power BI imports the result or the view. If the DAX and the SQL disagree, the SQL wins and the DAX is deleted.

A pattern I reuse:

```
with orders as (... grain: one row per order line ...),
category_week as (
  select category, week, sum(units) as units, sum(net_revenue) as net_revenue
  from orders
  group by 1, 2
),
ranked as (
  select *,
    net_revenue / nullif(sum(net_revenue) over (partition by week), 0) as revenue_share
  from category_week
)
select * from ranked
```

Window functions for share. Aggregates for the number. No nested IIF. No surprise filter in a JOIN condition.

## Metrics that mean something

I refuse vanity metrics unless the meeting asks for theatre. Useful ones, with the definition attached:

- **Net units:** units minus returns attributed to the sale week, or to the return week — pick one, write it on the dashboard.
- **Contribution:** revenue minus the costs you actually have, not a fully loaded fantasy.
- **Share of category:** the SKU against its friends, not against the whole store.
- **Forward cover:** weeks of stock at trailing rate. Merchants understand this. A z-score they do not.

For Spotify work the analogues are stream share, skip rate if you have it, and “new vs catalogue.” Same rule: define, then plot.

A metric without an owner is how you get two “revenue” tiles. I put the definition in the dashboard subtitle. Ugly. Clear.

## Recommendations are the artefact

Analysis that ends at a chart is homework. The handoff is a recommendation.

Walmart store analysis in this studio is “SQL + Python analysis of product/category performance with **actionable recommendations**.” The last noun is the job.

A recommendation I will sign:

- Cut or markdown these twelve SKUs. Here is trailing demand, stock, and the category they drag.
- Do not cut this SKU even though units are low: it is a traffic item / a bundle parent / a seasonal that has not started.
- Move budget from category A to B. Here is share, margin, and the constraint (shelf, ads, supplier).

If I cannot name the action, I am not done. I will not hide that behind a word cloud.

## Power BI is a stage, not a brain

I like Power BI when it is a thin stage: slicers that match the grain, a few tiles, a table the merchant can export. I dislike it when it is a second data warehouse.

Practices that keep me honest:

- One page per question, not one page per dataset.
- Slicers that cannot produce a meaningless grain (no “day” slicer on a weekly model).
- Tooltips that show the definition.
- A “as of” date in the header, always.

Python is for the bits BI should not do: ugly files, models, anything that needs a test. scikit-learn belongs in a pipeline, not in a dashboard click.

## How I run the hour

When I present:

1. The question, in their words.
2. The grain and the date range.
3. The one chart or table that answers it.
4. The recommendation.
5. The caveats — returns lag, incomplete week, a SKU rename.

I do not walk the schema. I do not start with EDA. EDA is how I got here. They paid for the sentence.

If they want the notebook, they can have it in the repo. It is not the meeting.

## What I will not do

- Ship a dashboard with no grain.
- Let DAX become the source of truth.
- Call a correlation a cause.
- Hide a filter that changes the number by more than a rounding error.

SQL that survives a standup is ordinary on purpose. Named CTEs, a mart you can rebuild, a metric with a denominator, and a recommendation you would still defend after lunch. That is the analytics practice at this studio. The live web products are the other half. The queries are how those products know what to build next.
