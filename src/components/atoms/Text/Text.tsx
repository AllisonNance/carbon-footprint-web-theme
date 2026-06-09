import type { ElementType, HTMLAttributes, ReactNode } from "react";
import styles from "./Text.module.css";

/**
 * Every type token from Carbon v11. Maps 1:1 to the `.type-*` utility
 * classes in `src/tokens/typography.css`.
 */
export type TextType =
  /* Utility */
  | "code-01"
  | "code-02"
  | "label-01"
  | "label-02"
  | "helper-text-01"
  | "helper-text-02"
  | "legal-01"
  | "legal-02"
  /* Body */
  | "body-compact-01"
  | "body-compact-02"
  | "body-01"
  | "body-02"
  /* Fixed headings */
  | "heading-compact-01"
  | "heading-compact-02"
  | "heading-01"
  | "heading-02"
  | "heading-03"
  | "heading-04"
  | "heading-05"
  | "heading-06"
  | "heading-07"
  /* Fluid headings */
  | "fluid-heading-03"
  | "fluid-heading-04"
  | "fluid-heading-05"
  | "fluid-heading-06"
  /* Fluid display */
  | "fluid-paragraph-01"
  | "fluid-quotation-01"
  | "fluid-quotation-02"
  | "fluid-display-01"
  | "fluid-display-02"
  | "fluid-display-03"
  | "fluid-display-04";

export type TextTone =
  | "primary"
  | "secondary"
  | "helper"
  | "placeholder"
  | "error"
  | "on-color"
  | "inverse";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** Carbon type token, e.g. "body-01", "heading-03". Defaults to "body-01". */
  type?: TextType;
  /** Semantic color. Defaults to "primary". */
  tone?: TextTone;
  children: ReactNode;
}

export function Text({
  as: Tag = "span",
  type = "body-01",
  tone = "primary",
  className,
  children,
  ...rest
}: TextProps) {
  const classes = [
    `type-${type}`,
    styles[`tone-${tone}`],
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}
