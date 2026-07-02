import type { Metadata } from "next";
import { getSiteChrome } from "@/lib/getSiteChrome";
import { PageLayout } from "@components/templates/PageLayout";
import { Text } from "@components/atoms/Text";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Privacy — Allison Nance",
  description: "How this site handles your data.",
};

export default async function PrivacyPage() {
  const { header, footer } = await getSiteChrome();

  return (
    <PageLayout title="Privacy" header={header} footer={footer}>
      <div className={styles.body}>
        <Text as="p" type="body-01">
          Right now, this site does not use analytics or behavioral
          tracking.
        </Text>
        <Text as="p" type="body-01">
          I have been thinking a lot about digital privacy and the
          responsibility designers and technologists have in shaping what
          becomes normal online. That includes reflecting on the role of
          tracking in UX research: what data we collect, what we assume we
          are entitled to observe, and whether visitors meaningfully
          understand what they are agreeing to.
        </Text>
        <Text as="p" type="body-01">
          My current position is privacy should be the default, not
          something people have to protect themselves by finding the right
          setting. Research and analytics can help improve digital
          experiences, but they should be intentional, minimal, clearly
          explained, and respectful of the person behind the data.
        </Text>
        <Text as="p" type="body-01">
          I may add limited analytics or research-related tracking in the
          future. But until I decide concretely what I believe is right for
          this site, it will remain untracked.
        </Text>
      </div>
    </PageLayout>
  );
}
