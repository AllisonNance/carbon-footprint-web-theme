import type { ReactNode } from "react";
import { Text } from "@components/atoms/Text";
import styles from "./PageLayout.module.css";

export interface PageLayoutProps {
  /** Shown as `<h1>` when `hideDefaultHeader` is false. */
  title?: string;
  description?: string;
  /** When true, the default `<h1>` + description block is omitted (e.g. use `PageTitleBlock` as the first child). */
  hideDefaultHeader?: boolean;
  /** Remove top padding from main so content sits flush against the header. */
  flush?: boolean;
  header?: ReactNode;
  /** Full-width stripe between `<main>` and `footer` (e.g. CTA band). */
  preFooter?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

export function PageLayout({
  title,
  description,
  hideDefaultHeader = false,
  flush = false,
  header,
  preFooter,
  footer,
  children,
}: PageLayoutProps) {
  const showBuiltinTitle = !hideDefaultHeader && title != null && title !== "";

  return (
    <div
      className={[styles.page, header ? styles.pageWithFixedHeader : ""]
        .filter(Boolean)
        .join(" ")}
    >
      {header}
      <main id="main-content" className={[styles.main, flush ? styles.flush : ""].filter(Boolean).join(" ")}>
        {showBuiltinTitle ? (
          <header className={styles.titleBlock}>
            <Text as="h1" type="fluid-heading-05">
              {title}
            </Text>
            {description && (
              <Text as="p" type="body-02" tone="secondary">
                {description}
              </Text>
            )}
          </header>
        ) : null}
        <section className={styles.content}>{children}</section>
      </main>
      {preFooter}
      {footer}
    </div>
  );
}
