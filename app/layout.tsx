import type { Metadata } from "next";
import Link from "next/link";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import {
  buildOrganizationJsonLd,
  buildWebsiteJsonLd,
} from "@/lib/structuredData";
import "./globals.css";
import classes from "./layout.module.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
};

function Header() {
  return (
    <header className={classes.header}>
      <Link className={classes.siteBrand} href="/">
        maintainable.software
      </Link>

      <nav className={classes.siteNav} aria-label="Main navigation">
        <Link className={classes.link} href="/references/">
          References
        </Link>
        <Link className={classes.link} href="/about/">
          About
        </Link>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.footerInner}>
        <nav className={classes.footerNav} aria-label="Footer primary links">
          <Link className={classes.footerLink} href="/me/">
            About me
          </Link>
        </nav>

        <nav className={classes.footerNav} aria-label="Footer secondary links">
          <Link className={classes.footerLink} href="/rss.xml">
            RSS
          </Link>
          <span className={classes.footerDivider} aria-hidden="true">
            |
          </span>
          <Link className={classes.footerLink} href="/posts/">
            Posts
          </Link>
          <span className={classes.footerDivider} aria-hidden="true">
            |
          </span>
          <Link className={classes.footerLink} href="/imprint/">
            Imprint
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteJsonLd = buildWebsiteJsonLd();
  const organizationJsonLd = buildOrganizationJsonLd();

  return (
    <html lang="en">
      <body className="site-shell">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <Header />

        <main className="site-main">
          <div className="site-frame">{children}</div>
        </main>

        <Footer />
      </body>
    </html>
  );
}
