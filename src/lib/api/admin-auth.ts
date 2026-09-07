/**
 * Admin session check — reads JWT cookie from incoming request headers.
 *
 * Login and logout are handled by Nitro API routes (server/api/admin/*.ts)
 * which can properly set/clear HttpOnly cookies on the response.
 *
 * This file provides the session validator used by other server functions.
 */
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "__admin_session";
const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || "xheen-cms-secret-change-me",
);
const JWT_ISSUER = "xheen-cms";

// ---------------------------------------------------------------------------
// Session check — reads cookie from the incoming request headers
// ---------------------------------------------------------------------------
export const getAdminSession = createServerFn({ method: "GET" }).handler(
  async () => {
    let cookieHeader = "";
    try {
      const request = getRequest();
      cookieHeader = request.headers.get("cookie") || "";
    } catch {
      return null;
    }

    // Parse the specific cookie
    const match = cookieHeader
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith(`${COOKIE_NAME}=`));
    if (!match) return null;

    const token = match.split("=").slice(1).join("=");
    if (!token) return null;

    try {
      const { payload } = await jwtVerify(token, JWT_SECRET, {
        issuer: JWT_ISSUER,
      });
      return {
        userId: payload.sub as string,
        email: payload.email as string,
      };
    } catch {
      return null;
    }
  },
);

/**
 * Guard helper — throws if not authenticated. Use in other server functions.
 */
export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}
