"use client";

import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { AnchorNav } from "@components/molecules/AnchorNav/AnchorNav";
import { SectionNav } from "@components/molecules/SectionNav";
import styles from "./page.module.css";

const stickyOffset = 48;

interface SectionItem {
  key: string;
  navLabel: string;
  target: string;
}

interface WorkSectionsProps {
  sections: SectionItem[];
  children: ReactNode;
}

export function WorkSections({ sections, children }: WorkSectionsProps) {
  const navItems = sections.map((s) => ({
    label: s.navLabel,
    target: s.target,
  }));

  const [activeTarget, setActiveTarget] = useState(
    sections[0]?.target ?? "",
  );

  useEffect(() => {
    if (sections.length === 0) return;
    const threshold = stickyOffset + 50;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        let current = sections[0].target;
        for (const item of sections) {
          const el = document.getElementById(item.target);
          if (!el) continue;
          if (el.getBoundingClientRect().top <= threshold) {
            current = item.target;
          }
        }
        setActiveTarget(current);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  const handleNavigate = useCallback((target: string) => {
    const el = document.getElementById(target);
    if (!el) return;
    const y =
      el.getBoundingClientRect().top + window.scrollY - stickyOffset - 8;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  return (
    <>
      <AnchorNav items={navItems} stickyOffset={stickyOffset} />

      <div className={styles.sectionLayout}>
        <SectionNav
          items={navItems}
          activeTarget={activeTarget}
          stickyOffset={stickyOffset}
          onNavigate={handleNavigate}
        />

        <div className={styles.sections}>{children}</div>
      </div>
    </>
  );
}
