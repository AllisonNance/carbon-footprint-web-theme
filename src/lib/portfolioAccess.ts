import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { client } from "@/sanity/lib/client";
import { portfolioPasswordQuery } from "@/sanity/lib/queries";

/**
 * Shared-password access for protected portfolio items.
 *
 * The password lives in Site Settings (private dataset). When a visitor
 * enters it correctly we store an HMAC of the password in an httpOnly
 * cookie — never the password itself. Changing the password in Sanity
 * changes the expected value, which signs everyone out.
 */
export const PORTFOLIO_ACCESS_COOKIE = "portfolio_access";
export const PORTFOLIO_ACCESS_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

async function getPortfolioPassword(): Promise<string | null> {
  const password: string | null = await client.fetch(
    portfolioPasswordQuery,
    {},
    { cache: "no-store" },
  );
  return password && password.trim() ? password : null;
}

function accessValue(password: string): string {
  const key = process.env.SANITY_API_READ_TOKEN || "portfolio-access";
  return createHmac("sha256", key).update(password).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

/** True when the visitor's cookie matches the current password. */
export async function hasPortfolioAccess(): Promise<boolean> {
  const password = await getPortfolioPassword();
  if (!password) return false; // fail closed when no password is set
  const cookie = (await cookies()).get(PORTFOLIO_ACCESS_COOKIE)?.value;
  return Boolean(cookie) && safeEqual(cookie!, accessValue(password));
}

/** Returns the cookie value to store if `attempt` is correct, else null. */
export async function checkPortfolioPassword(
  attempt: string,
): Promise<string | null> {
  const password = await getPortfolioPassword();
  if (!password) return null;
  const expected = accessValue(password);
  return safeEqual(accessValue(attempt), expected) ? expected : null;
}
