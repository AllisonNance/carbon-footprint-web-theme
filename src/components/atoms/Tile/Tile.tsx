import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import styles from "./Tile.module.css";

/**
 * Basic Tile — a static container with Carbon's layer background and
 * padding. Use it as the visual shell for dashboard cards, product
 * callouts, stats, or any grouped content that should feel elevated
 * from the page.
 *
 * Spec: https://web-components.carbondesignsystem.com/?path=/docs/components-tile--overview
 *
 * Skipped (intentional): `slug`, `decorator`, `AILabel`, `light` (deprecated),
 * `hasRoundedCorners` (AILabel-only).
 */
export interface TileProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  /** When true, removes background and padding for inline/embedded use. */
  transparent?: boolean;
}

export const Tile = forwardRef<HTMLDivElement, TileProps>(function Tile(
  { children, transparent = false, className, ...rest },
  ref,
) {
  const classes = [
    styles.tile,
    transparent ? styles.transparent : "",
    className,
  ].filter(Boolean).join(" ");
  return (
    <div ref={ref} className={classes} {...rest}>
      {children}
    </div>
  );
});
