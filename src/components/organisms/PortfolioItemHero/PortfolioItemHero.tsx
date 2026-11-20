import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { Tile } from "@components/atoms/Tile/Tile";
import styles from "./PortfolioItemHero.module.css";

export interface PortfolioItemHeroTile {
  icon?: ReactNode;
  label: string;
  value: string;
}

export interface PortfolioItemHeroProps extends HTMLAttributes<HTMLElement> {
  /** Portfolio item title. */
  heading: string;
  /** Description paragraph below the heading. */
  description?: string;
  /** Static tile metadata cards shown below the hero media. */
  tiles?: PortfolioItemHeroTile[];
  /** Hero media — typically an `<img>`. Rendered in the right column
   *  with `object-fit: cover` filling the full height. */
  media?: ReactNode;
  /** Small 72×72 element (e.g. a GIF) in the bottom-right corner of the
   *  title area. Only shown with `wide`. */
  accent?: ReactNode;
  /** Title area spans the full hero width (left edge of the media) instead
   *  of the centered 600px column. */
  wide?: boolean;
}

export const PortfolioItemHero = forwardRef<HTMLElement, PortfolioItemHeroProps>(
  function PortfolioItemHero(
    {
      heading,
      description,
      tiles,
      media,
      accent,
      wide = false,
      className,
      ...rest
    },
    ref,
  ) {
    const classes = [styles.root, wide && styles.wide, className]
      .filter(Boolean)
      .join(" ");

    return (
      <section ref={ref} className={classes} {...rest}>
        <div className={styles.inner}>
          <div className={styles.top}>
            <div className={styles.content}>
              <h1 className={`${styles.heading} type-fluid-heading-05`}>
                {heading}
              </h1>

              {description && (
                <p className={`${styles.description} type-body-01`}>
                  {description}
                </p>
              )}
            </div>

            {wide && accent && <div className={styles.accent}>{accent}</div>}
          </div>

          {media && <div className={styles.media}>{media}</div>}

          {tiles && tiles.length > 0 && (
            <div className={styles.tiles}>
              {tiles.map((tile, i) => (
                <Tile key={`${tile.label}-${i}`} transparent className={styles.tile}>
                  {tile.icon && (
                    <div className={styles.tileIcon} aria-hidden>
                      {tile.icon}
                    </div>
                  )}
                  <p className={`${styles.tileLabel} type-heading-compact-01`}>
                    {tile.label}
                  </p>
                  <p className={`${styles.tileValue} type-body-01`}>
                    {tile.value}
                  </p>
                </Tile>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  },
);
