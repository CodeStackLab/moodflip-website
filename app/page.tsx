// MoodFlip Homepage - single-screen tool, no scrolling
"use client";

import React from "react";
import Link from "next/link";
import HeroSectionExact from "@/components/HeroSectionExact";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={styles.pageShell}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo} aria-label="MoodFlip home">
          <img src="/moodflip-logo.png" alt="MoodFlip" className={styles.logoImg} />
        </Link>
        <nav className={styles.nav} aria-label="Primary navigation">
          <Link href="/" className={styles.navLink}>Mood Tool</Link>
          <Link href="/about" className={styles.navLink}>About</Link>
          <Link href="/contact" className={styles.navLink}>Contact</Link>
          <Link href="/privacy" className={styles.navLink}>Privacy Policy</Link>
          <Link href="/login" className={styles.navLink}>Login</Link>
        </nav>
        <Link href="/login" className={styles.mobileLogin}>Login</Link>
      </header>
      <main className={styles.main}>
        <HeroSectionExact />
      </main>
    </div>
  );
}
