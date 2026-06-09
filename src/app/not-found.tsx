import { Link } from "@components/atoms/Link";
import { getSiteChrome } from "@/lib/getSiteChrome";
import { PageLayout } from "@components/templates/PageLayout";
import styles from "./not-found.module.css";

export default async function NotFound() {
  const { header, footer } = await getSiteChrome();

  return (
    <PageLayout hideDefaultHeader header={header} footer={footer}>
      <div className={styles.root}>
        <p className={`${styles.code} type-label-01`}>404</p>
        <h1 className={`${styles.heading} type-heading-04`}>Page not found</h1>
        <p className={`${styles.description} type-body-01`}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/" size="md" className={styles.link}>
          Back to home
        </Link>
      </div>
    </PageLayout>
  );
}
