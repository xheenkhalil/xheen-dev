/**
 * Admin login API route — Nitro server endpoint.
 * POST /api/admin/login
 *
 * Sets the session cookie directly on the response.
 */
import { defineEventHandler, readBody, setCookie, createError } from "h3";
import { eq } from "drizzle-orm";
import { SignJWT } from "jose";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/db/drizzle";
import { adminUsers } from "@/lib/db/schema";

const COOKIE_NAME = "__admin_session";
const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || "xheen-cms-secret-change-me",
);
const JWT_ISSUER = "xheen-cms";

export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as { email?: string; password?: string };
  const { email, password } = body || {};

  if (!email || !password) {
    throw createError({ statusCode: 400, message: "Email and password required" });
  }

  const db = await getDb();
  const [user] = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.email, email))
    .limit(1);

  if (!user) {
    throw createError({ statusCode: 401, message: "Invalid email or password" });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    throw createError({ statusCode: 401, message: "Invalid email or password" });
  }

  const token = await new SignJWT({ sub: user.id, email: user.email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer(JWT_ISSUER)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);

  setCookie(event, COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });

  return { ok: true, email: user.email };
});
