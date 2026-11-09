import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import styles from "./PortfolioItemCard.module.css";

export interface PortfolioItemGridProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

/**
 * PortfolioItemGrid — single-column editorial list container for
 * `PortfolioItemCard` children. Capped at a 1200px max-width and
 * centered within the page.
 */
export const PortfolioItemGrid = forwardRef<
  HTMLElement,
  PortfolioItemGridProps
>(function PortfolioItemGrid({ children, className, ...rest }, ref) {
  const classes = [styles.grid, className].filter(Boolean).join(" ");

  return (
    <section ref={ref} className={classes} {...rest}>
      {children}
    </section>
  );
});
