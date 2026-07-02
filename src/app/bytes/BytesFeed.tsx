"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronRight } from "@carbon/icons-react";
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
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Read ?category= from URL on mount (e.g. from single byte page links)
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && categories.some((c) => c.title === cat)) {
      setActiveCategory(cat);
    }
  }, [searchParams, categories]);

  const filteredBytes = useMemo(() => {
    if (!activeCategory) return bytes;
    return bytes.filter((b) => b.categories?.includes(activeCategory));
  }, [bytes, activeCategory]);

  const totalPages = Math.ceil(filteredBytes.length / ITEMS_PER_PAGE);

  return (
    <div className={styles.feedLayout}>
      <div className={styles.sidebarCol}>
        <div className={styles.intro}>
          <h1 className={`${styles.introHeading} type-fluid-heading-05`}>
            {activeCategory ? (
              <>
                <a
                  href="/bytes"
                  className={styles.breadcrumbLink}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveCategory(null);
                  }}
                >
                  Bytes
                </a>
                <span className={styles.breadcrumbSeparator}>
                  <ChevronRight size={20} className={styles.breadcrumbChevron} />
                  <span className={styles.breadcrumbCategory}>{activeCategory}</span>
                </span>
              </>
            ) : (
              "Bytes"
            )}
          </h1>
          <p className={`${styles.introDescription} type-body-01`}>
            A brief piece of insight, observation, or practical learning.
          </p>
        </div>

        {categories.length > 0 && (
          <CategoryList
            heading="Categories"
            items={[
              {
                label: "All",
                count: bytes.length,
                isActive: activeCategory === null,
              },
              ...categories.map((c) => ({
                label: c.title,
                count: c.count,
                isActive: c.title === activeCategory,
              })),
            ]}
            onSelect={(label) =>
              setActiveCategory(label === "All" ? null : label)
            }
          />
        )}
      </div>

      <div className={styles.feedCol}>
        {filteredBytes.map((byte) => {
          return (
            <ByteCard
              key={byte._id}
              categories={byte.categories?.slice(0, 3)}
              date={formatDate(byte.publishedAt)}
              dateISO={byte.publishedAt}
              title={byte.title}
              slug={byte.slug}
              body={byte.body}
              onCategoryClick={(cat) => setActiveCategory(cat)}
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
    </div>
  );
}
