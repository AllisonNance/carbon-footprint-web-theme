"use client";

import { useActionState, useId } from "react";
import { Locked } from "@carbon/icons-react";
import { unlockPortfolio, type UnlockState } from "./actions";
import styles from "./PasswordGate.module.css";

interface PasswordGateProps {
  slug: string;
}

/** Password form shown in place of a protected case study's content. */
export function PasswordGate({ slug }: PasswordGateProps) {
  const [state, formAction, pending] = useActionState<UnlockState, FormData>(
    unlockPortfolio,
    {},
  );
  const inputId = useId();
  const errorId = useId();

  return (
    <div className={styles.root}>
      <div className={styles.intro}>
        <Locked size={20} className={styles.icon} aria-hidden />
        <p className={`${styles.message} type-body-01`}>
          This case study is password protected. Enter the password to
          view it.
        </p>
      </div>

      <form action={formAction} className={styles.form}>
        <input type="hidden" name="slug" value={slug} />
        <label htmlFor={inputId} className={`${styles.label} type-label-01`}>
          Password
        </label>
        <div className={styles.row}>
          <input
            id={inputId}
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className={styles.input}
            aria-invalid={state.error ? true : undefined}
            aria-describedby={state.error ? errorId : undefined}
          />
          <button type="submit" className={styles.button} disabled={pending}>
            {pending ? "Checking…" : "View case study"}
          </button>
        </div>
        <p
          id={errorId}
          role="alert"
          className={`${styles.error} type-body-01`}
        >
          {state.error ?? ""}
        </p>
      </form>
    </div>
  );
}
