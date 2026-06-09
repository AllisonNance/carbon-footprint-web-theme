import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import styles from "./PortfolioItemCard.module.css";

export interface PortfolioItemGridProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  /**
   * Layout variant. `4` (default): on desktop, two rows of two cards in
   * a 2/3 + 1/3 and 1/3 + 2/3 pattern; on tablet, a 2×2 equal grid;
   * on mobile, a single column. `3` and `2` use equal columns at each
   * breakpoint as before.
   */
  columns?: 1 | 2 | 3 | 4;
}

/**
 * PortfolioItemGrid — responsive container for `PortfolioItemCard`
 * children. With `columns={4}` (default), desktop uses a 6-column grid:
 * row 1 is ⅔ + ⅓, row 2 is ⅓ + ⅔. Tablet is 2 equal columns; mobile
 * stacks.
 *
 * The dividing rules between cards are produced by a 1px grid-gap
 * over a tinted container background, which guarantees uniform
 * full-height rules between cards regardless of which card is tallest
 * — and naturally suppresses any rule on the outermost left/right
 * edges of each row.
 */
export const PortfolioItemGrid = forwardRef<
  HTMLElement,
  PortfolioItemGridProps
>(function PortfolioItemGrid({ children, className, columns = 4, ...rest }, ref) {
  const classes = [styles.grid, styles[`cols-${columns}`], className]
    .filter(Boolean)
    .join(" ");

  return (
    <section ref={ref} className={classes} {...rest}>
      {children}
    </section>
  );
});
