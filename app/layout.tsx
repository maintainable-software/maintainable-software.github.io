import type { Metadata } from "next";
import Link from "next/link";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL
} from "@/lib/site";
import {
  buildOrganizationJsonLd,
  buildWebsiteJsonLd
} from "@/lib/structuredData";
import "./globals.css";
import classes from './layout.module.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: SITE_DESCRIPTION
};

function Header() {
  return (
    <header className={classes.header}>
      <Link className={classes.siteBrand} href="/">
        maintainable.software
      </Link>

      <nav className={classes.siteNav} aria-label="Main navigation">
        <Link className={classes.link} href="/posts/">Posts</Link>
        <Link className={classes.link} href="/about/">About</Link>
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer className={classes.footer}>
      <Link className={classes.footerLink} href="/imprint/">Imprint</Link>
    </footer>
  )
}

function _Footer() {
  return (
    <footer className="site-footer">
      <div className="site-frame">
        <div className="site-footer__inner">
          <Link href="/imprint/">Imprint</Link>
        </div>
      </div>
    </footer>
  )
}

export default function RootLayout({
  children
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
            __html: JSON.stringify(websiteJsonLd)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd)
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
