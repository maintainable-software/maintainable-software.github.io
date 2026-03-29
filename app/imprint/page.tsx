import { buildNoIndexPageMetadata } from "@/lib/siteMetadata";

export const metadata = buildNoIndexPageMetadata({
  title: "Imprint and legal information | maintainable.software",
  description:
    "Legal notice and contact details for maintainable.software and Jan-Gerke Salomon.",
  path: "/imprint/"
});

export default function ImprintPage() {
  return (
    <article className="content-shell page-shell">
      <header className="content-header">
        <h1>Impressum</h1>
      </header>

      <div className="content-body">
        <p>
          Jan-Gerke Salomon
          <br />
          Leibnizstr. 1
          <br />
          76137 Karlsruhe
        </p>

        <h2>Kontakt</h2>
        <p>
          Telefon: +49 176 38636269
          <br />
          E-Mail: jgs.salomon@gmail.com
        </p>

        <h2>Umsatzsteuer-ID</h2>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
          <br />
          35152/00755
        </p>

        <h2>Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
        <p>
          Wir sind nicht bereit oder verpflichtet, an
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </p>
      </div>
    </article>
  );
}
