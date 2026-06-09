"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { Accordion } from "@components/atoms/Accordion/Accordion";
import { AccordionItem } from "@components/atoms/Accordion/AccordionItem";
import styles from "./CategoryList.module.css";

export interface CategoryItem {
  /** Category label. */
  label: string;
  /** Number of items in this category. */
  count: number;
  /** Whether this category is currently selected. */
  isActive?: boolean;
}

export interface CategoryListProps extends Omit<HTMLAttributes<HTMLElement>, "onSelect"> {
  /** Section heading. */
  heading?: string;
  /** Ordered list of categories. */
  items: CategoryItem[];
  /** Callback when a category is clicked. */
  onSelect?: (label: string) => void;
}

function CategoryLinks({
  items,
  onSelect,
}: Pick<CategoryListProps, "items" | "onSelect">) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item.label} className={styles.item}>
          <button
            className={[
              styles.link,
              item.isActive ? styles.linkActive : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => onSelect?.(item.label)}
            aria-current={item.isActive ? "true" : undefined}
          >
            <span className={styles.label}>
              {item.label}
            </span>
            <span className={`${styles.count} type-label-01`}>
              ({item.count})
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export const CategoryList = forwardRef<HTMLElement, CategoryListProps>(
  function CategoryList(
    { heading = "Categories", items, onSelect, className, ...rest },
    ref,
  ) {
    const classes = [styles.root, className].filter(Boolean).join(" ");

    return (
      <nav ref={ref} className={classes} aria-label={heading} {...rest}>
        {/* Desktop: heading + flat list */}
        <div className={styles.desktop}>
          {heading && (
            <h3 className={`${styles.heading} type-heading-03`}>{heading}</h3>
          )}
          <CategoryLinks items={items} onSelect={onSelect} />
        </div>

        {/* Mobile: accordion */}
        <div className={styles.mobile}>
          <Accordion align="start" size="md">
            <AccordionItem title={heading}>
              <CategoryLinks items={items} onSelect={onSelect} />
            </AccordionItem>
          </Accordion>
        </div>
      </nav>
    );
  },
);
