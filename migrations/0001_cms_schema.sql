-- CMS schema: projects, articles, admin_users
-- Applied by the existing migration system (scripts/migrate.mjs + PGLite auto-apply)

CREATE TABLE IF NOT EXISTS projects (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          text        UNIQUE NOT NULL,
  title         text        NOT NULL,
  summary       text        NOT NULL,
  category      text        NOT NULL CHECK (category IN ('Product', 'Web', 'Data Analytics', 'Data Science')),
  stack         text[]      NOT NULL DEFAULT '{}',
  live_url      text,
  github_url    text,
  featured      boolean     NOT NULL DEFAULT false,
  cover         text,
  images        text[]      NOT NULL DEFAULT '{}',
  date          date        NOT NULL,
  body          text        NOT NULL,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS articles (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          text        UNIQUE NOT NULL,
  title         text        NOT NULL,
  excerpt       text        NOT NULL,
  date          date        NOT NULL,
  tags          text[]      NOT NULL DEFAULT '{}',
  body          text        NOT NULL,
  published     boolean     NOT NULL DEFAULT true,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS admin_users (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  email         text        UNIQUE NOT NULL,
  password_hash text        NOT NULL,
  created_at    timestamptz NOT NULL DEFAULT now()
);
