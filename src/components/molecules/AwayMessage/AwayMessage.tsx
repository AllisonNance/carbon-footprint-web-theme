"use client";

import { useEffect, useState, type ReactNode } from "react";
import styles from "./AwayMessage.module.css";

type SymColor = "pink" | "purple" | "blue" | "green" | "orange";

/** A colorful AIM-style symbol. Decorative, so screen readers skip it. */
function Sym({ c, children }: { c: SymColor; children: ReactNode }) {
  return (
    <span className={`${styles.sym} ${styles[c]}`} aria-hidden="true">
      {children}
    </span>
  );
}

const LAST_KEY = "away-message:last";

/** Away messages, one picked at random on each page load. */
export const AWAY_MESSAGES: ReactNode[] = [
  <>
    shipping something. back soon <Sym c="pink">✦</Sym>
  </>,
  <>
    <Sym c="pink">~</Sym>
    <Sym c="purple">~</Sym>
    <em>designing</em>
    <Sym c="purple">~</Sym>
    <Sym c="pink">~</Sym> brb
  </>,
  <>
    if ur reading this, my work is below <Sym c="blue">↓</Sym>
  </>,
  <>gone 2 the design review, ttyl</>,
  <>
    prolly in claude lol <Sym c="orange">:D</Sym>
  </>,
];

export interface AwayMessageProps {
  /** Screen name shown in bold. */
  name?: string;
  /** Messages to pick from; defaults to AWAY_MESSAGES. */
  messages?: ReactNode[];
  /** Fix the message and idle time (e.g. for stories); random when unset. */
  index?: number;
  idleMinutes?: number;
  className?: string;
}

/**
 * Early-2000s AIM-style away message: a softly pinging yellow status dot,
 * the screen name, a random away message and an idle time. The message is
 * chosen in the browser after load so it changes on every visit, even
 * though the page itself is cached.
 */
export function AwayMessage({
  name = "allison",
  messages = AWAY_MESSAGES,
  index,
  idleMinutes,
  className,
}: AwayMessageProps) {
  const [pick, setPick] = useState<{ i: number; idle: number } | null>(
    index !== undefined
      ? { i: index, idle: idleMinutes ?? 3 }
      : null,
  );

  useEffect(() => {
    if (index !== undefined) return;
    // Never show the same message twice in a row for this visitor.
    let last = -1;
    try {
      last = Number(localStorage.getItem(LAST_KEY) ?? -1);
    } catch {}
    let i = Math.floor(Math.random() * messages.length);
    if (messages.length > 1 && i === last) {
      i = (i + 1 + Math.floor(Math.random() * (messages.length - 1))) % messages.length;
    }
    try {
      localStorage.setItem(LAST_KEY, String(i));
    } catch {}
    setPick({
      i,
      idle: idleMinutes ?? 1 + Math.floor(Math.random() * 42),
    });
  }, [index, idleMinutes, messages.length]);

  // Before a message is picked, hold the line's space with the first one
  // (hidden) so the tags below don't jump.
  const shown = pick ?? { i: 0, idle: 3 };

  return (
    <p
      className={[styles.root, !pick && styles.pending, className]
        .filter(Boolean)
        .join(" ")}
    >
      <span className={styles.dot} aria-hidden="true" />
      <span>
        <strong className={styles.name}>{name}</strong> is away:{" "}
        {messages[shown.i]}{" "}
        <span className={styles.idle}>(idle {shown.idle} min)</span>
      </span>
    </p>
  );
}
