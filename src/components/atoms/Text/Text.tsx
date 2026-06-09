import type { ElementType, HTMLAttributes, ReactNode } from "react";
import styles from "./Text.module.css";

export type TextType =
  /* Utility */
  | "code-02"
  | "label-01"
  /* Body */
  | "body-compact-01"
  | "body-compact-02"
  | "body-01"
  | "body-02"
  /* Headings */
  | "heading-compact-01"
  | "heading-03"
  | "heading-04"
  /* Fluid */
  | "fluid-heading-05";

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
