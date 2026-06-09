import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import styles from "./Tag.module.css";

/**
 * Carbon Tag — a small taupe pill representing a category or attribute.
 *
 * Spec: https://web-components.carbondesignsystem.com/?path=/docs/components-tag--overview
 */

export type TagType = "taupe";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  /** Color family. Defaults to `taupe`. */
  type?: TagType;
  /** Size — currently only `sm` is used. */
  size?: "sm";
  /** Disable the tag (visual only). */
  disabled?: boolean;
  children?: ReactNode;
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  { type = "taupe", size = "sm", disabled = false, className, children, ...rest },
  ref,
) {
  const classes = [
    styles.tag,
    disabled ? styles.disabled : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span ref={ref} className={classes} {...rest}>
      <span className={styles.label}>{children}</span>
    </span>
  );
});
