"use client";

import { useState, useMemo } from "react";
import { toPlainText } from "@portabletext/react";
import { PaginationNav } from "@components/atoms/PaginationNav/PaginationNav";
import { ByteCard } from "@components/molecules/ByteCard";
import { CategoryList } from "@components/molecules/CategoryList";
import styles from "./page.module.css";

interface SanityByte {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  categories?: string[];
  body?: any[];
}

interface SanityCategory {
  _id: string;
  title: string;
  slug: string;
  count: number;
}

interface BytesFeedProps {
  bytes: SanityByte[];
  categories: SanityCategory[];
}

const ITEMS_PER_PAGE = 10;

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function BytesFeed({ bytes, categories }: BytesFeedProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredBytes = useMemo(() => {
    if (!activeCategory) return bytes;
    return bytes.filter((b) => b.categories?.includes(activeCategory));
  }, [bytes, activeCategory]);

  const totalPages = Math.ceil(filteredBytes.length / ITEMS_PER_PAGE);

  return (
    <div className={styles.feedLayout}>
      <div className={styles.feedCol}>
        {filteredBytes.map((byte) => {
          const description = byte.body
            ? toPlainText(byte.body)
            : undefined;

          return (
            <ByteCard
              key={byte._id}
              categories={byte.categories?.slice(0, 3)}
              date={formatDate(byte.publishedAt)}
              dateISO={byte.publishedAt}
              title={byte.title}
              description={description}
            />
          );
        })}

        {filteredBytes.length === 0 && (
          <p className={styles.emptyState}>
            No bytes found in this category.
          </p>
        )}

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <PaginationNav totalItems={totalPages} itemsShown={8} />
          </div>
        )}
      </div>

      <div className={styles.sidebarCol}>
        <div className={styles.intro}>
          <h1 className={`${styles.introHeading} type-fluid-heading-05`}>
            Bytes
          </h1>
          <p className={`${styles.introDescription} type-body-01`}>
            A brief piece of insight, observation, or practical learning.
          </p>
        </div>

        {categories.length > 0 && (
          <CategoryList
            heading="Categories"
            items={categories.map((c) => ({
              label: c.title,
              count: c.count,
              isActive: c.title === activeCategory,
            }))}
            onSelect={(label) =>
              setActiveCategory((prev) => (prev === label ? null : label))
            }
          />
        )}
      </div>
    </div>
  );
}
