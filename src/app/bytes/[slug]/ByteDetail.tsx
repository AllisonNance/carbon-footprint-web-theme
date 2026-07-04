"use client";

import { PortableText } from "@components/atoms/PortableText/PortableText";
import { Link } from "@components/atoms/Link";
import { ArrowRight } from "@carbon/icons-react";
import styles from "./ByteDetail.module.css";
import feedStyles from "../page.module.css";

interface SanityByte {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  categories?: string[];
  body?: any[];
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ByteDetail({ byte }: { byte: SanityByte }) {
  return (
    <div className={`${feedStyles.feedLayout} ${styles.detailLayout}`}>
      <div className={feedStyles.sidebarCol}>
        <div className={styles.sidebar}>
          <h1 className={`${feedStyles.introHeading} type-fluid-heading-05`}>
            Bytes
          </h1>
          <p className={`${feedStyles.introDescription} type-body-01`}>
            Brief pieces of insight, observation, or practical learning.
          </p>
          <Link
            href="/bytes"
            size="md"
            renderIcon={ArrowRight}
            className={styles.viewAllLink}
          >
            View all Bytes
          </Link>
        </div>
      </div>

      <div className={feedStyles.feedCol}>
        <article className={styles.article}>
          {byte.categories && byte.categories.length > 0 && (
            <div className={styles.metaRow}>
              <span className={styles.categories}>
                {byte.categories.slice(0, 3).map((cat, i) => (
                  <span key={i} className={styles.categoryWrap}>
                    {i > 0 && (
                      <span className={styles.dot} aria-hidden>
                        ·
                      </span>
                    )}
                    <a href={`/bytes?category=${encodeURIComponent(cat)}`} className={styles.category}>
                      {cat}
                    </a>
                  </span>
                ))}
              </span>
            </div>
          )}

          <h2 className={`${styles.title} type-heading-04`}>{byte.title}</h2>

          <time className={styles.date} dateTime={byte.publishedAt}>
            {formatDate(byte.publishedAt)}
          </time>

          {byte.body && byte.body.length > 0 && (
            <div className={`${styles.body} type-body-01`}>
              <PortableText value={byte.body} />
            </div>
          )}
        </article>

        <div className={styles.bottomLink}>
          <Link
            href="/bytes"
            size="md"
            renderIcon={ArrowRight}
            className={styles.viewAllLink}
          >
            View all Bytes
          </Link>
        </div>
      </div>
    </div>
  );
}
