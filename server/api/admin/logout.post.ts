/**
 * Admin logout API route — Nitro server endpoint.
 * POST /api/admin/logout
 *
 * Clears the session cookie.
 */
import { defineEventHandler, setCookie } from "h3";

export default defineEventHandler(async (event) => {
  setCookie(event, "__admin_session", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
  return { ok: true };
});
