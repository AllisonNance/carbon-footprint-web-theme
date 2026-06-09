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
  /** Static tile metadata cards shown below the description. */
  tiles?: PortfolioItemHeroTile[];
  /** Hero media — typically an `<img>`. Rendered in the right column
   *  with `object-fit: cover` filling the full height. */
  media?: ReactNode;
}

export const PortfolioItemHero = forwardRef<HTMLElement, PortfolioItemHeroProps>(
  function PortfolioItemHero(
    { heading, description, tiles, media, className, ...rest },
    ref,
  ) {
    const classes = [styles.root, className].filter(Boolean).join(" ");

    return (
      <section ref={ref} className={classes} {...rest}>
        <div className={styles.inner}>
          <div className={styles.content}>
            <h1 className={`${styles.heading} type-fluid-heading-05`}>
              {heading}
            </h1>

            {description && (
              <p className={`${styles.description} type-body-01`}>
                {description}
              </p>
            )}

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

          <div className={styles.media}>
            {media}
          </div>
        </div>
      </section>
    );
  },
);
