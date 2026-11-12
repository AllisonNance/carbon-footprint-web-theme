"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  PORTFOLIO_ACCESS_COOKIE,
  PORTFOLIO_ACCESS_MAX_AGE,
  checkPortfolioPassword,
} from "@/lib/portfolioAccess";

export interface UnlockState {
  error?: string;
}

const SLUG_PATTERN = /^[A-Za-z0-9_-]+$/;

export async function unlockPortfolio(
  _prev: UnlockState,
  formData: FormData,
): Promise<UnlockState> {
  const attempt = String(formData.get("password") ?? "");
  const slug = String(formData.get("slug") ?? "");

  if (!attempt) return { error: "Enter the password to continue." };

  const value = await checkPortfolioPassword(attempt);
  if (!value) {
    // Small delay to slow down repeated guessing.
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { error: "That password isn't right. Please try again." };
  }

  (await cookies()).set(PORTFOLIO_ACCESS_COOKIE, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: PORTFOLIO_ACCESS_MAX_AGE,
  });

  redirect(SLUG_PATTERN.test(slug) ? `/work/${slug}` : "/");
}
