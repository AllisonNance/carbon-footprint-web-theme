/**
 * Shared helpers for the Style Guide pages.
 * - `useResolvedCssVar`  — reads the resolved value of a CSS custom property
 *    from the document root and re-reads when `data-theme` flips.
 * - `Swatch`             — a small chip + metadata tile for a color token.
 * - `PaletteStrip`       — renders a 10-step palette row from the primitive scale.
 */

import { useEffect, useState, type ReactNode } from "react";
import styles from "./styleGuide.module.css";

/** Read a CSS custom property's resolved value from the document root. */
function readCssVar(name: string): string {
  if (typeof window === "undefined") return "";
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return v;
}

/**
 * React hook that subscribes to `data-theme` changes on <html> so swatches
 * always show the resolved value for the currently active theme.
 */
export function useResolvedCssVar(name: string): string {
  const [value, setValue] = useState<string>(() => readCssVar(name));

  useEffect(() => {
    setValue(readCssVar(name));

    if (typeof window === "undefined") return;
    const target = document.documentElement;

    const observer = new MutationObserver(() => {
      setValue(readCssVar(name));
    });
    observer.observe(target, {
      attributes: true,
      attributeFilter: ["data-theme", "class", "style"],
    });

    return () => observer.disconnect();
  }, [name]);

  return value;
}

/** A single color swatch tile. `token` is the raw CSS var name (no leading `--`). */
export function Swatch({
  token,
  label,
}: {
  token: string;
  label?: ReactNode;
}) {
  const varName = `--${token}`;
  const resolved = useResolvedCssVar(varName);
  return (
    <div className={styles.swatch}>
      <div
        className={styles.swatchChip}
        style={{ backgroundColor: `var(${varName})` }}
        aria-hidden="true"
      />
      <div className={styles.swatchBody}>
        <span className={styles.swatchName}>{label ?? varName}</span>
        <span className={styles.swatchValue}>{resolved || "—"}</span>
      </div>
    </div>
  );
}

/**
 * Render a 10-step palette row for a primitive color family.
 * `family` is the color name (e.g. "blue") — we look up `--<family>-10` through
 * `--<family>-100`. Text color switches at step 50 for legibility.
 */
export function PaletteStrip({
  family,
  label,
  steps: customSteps,
}: {
  family: string;
  label?: string;
  steps?: number[];
}) {
  const steps = customSteps ?? [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  return (
    <div className={styles.paletteRow}>
      <div className={styles.paletteLabel}>{label ?? family}</div>
      <div className={styles.paletteStrip}>
        {steps.map((step) => {
          const token = `--${family}-${step < 10 ? `0${step}` : step}`;
          const isLight = step <= 40;
          return (
            <PaletteStep
              key={step}
              token={token}
              step={step}
              isLight={isLight}
            />
          );
        })}
      </div>
    </div>
  );
}

function PaletteStep({
  token,
  step,
  isLight,
}: {
  token: string;
  step: number;
  isLight: boolean;
}) {
  const resolved = useResolvedCssVar(token);
  return (
    <div
      className={styles.paletteStep}
      style={{
        backgroundColor: `var(${token})`,
        color: isLight ? "#161616" : "#ffffff",
      }}
      title={`${token}: ${resolved}`}
    >
      <div>{step}</div>
      <div style={{ opacity: 0.75 }}>{resolved}</div>
    </div>
  );
}
