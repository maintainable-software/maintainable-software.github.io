import Link from "next/link";
import { buildNoIndexPageMetadata } from "@/lib/siteMetadata";

export const metadata = buildNoIndexPageMetadata({
  title: "Privacy / Datenschutzerklärung | maintainable.software",
  description:
    "Privacy policy and Datenschutzerklärung for maintainable.software, including the site's hosting, analytics, and user rights.",
  path: "/privacy/",
});

export default function PrivacyPage() {
  return (
    <article className="content-shell page-shell">
      <header className="content-header">
        <p className="content-header__kicker">Datenschutzerklärung</p>
        <h1>Privacy / Datenschutzerklärung</h1>
      </header>

      <div className="content-body">
        <p>
          <strong>German version first.</strong> The German text is intended to
          be the binding version. The English text below is provided for
          convenience.
        </p>

        <h2>1. Verantwortlicher</h2>
        <p>
          Verantwortlicher für die Datenverarbeitung auf dieser Website ist:
          <br />
          Jan-Gerke Salomon
          <br />
          Leibnizstr. 1
          <br />
          76137 Karlsruhe
          <br />
          E-Mail: jgs.salomon@maintainable.software
        </p>

        <h2>2. Allgemeine Hinweise zur Datenverarbeitung</h2>
        <p>
          Beim Besuch dieser Website werden technisch notwendige Verbindungs-
          und Nutzungsdaten verarbeitet, damit die Website ausgeliefert und
          sicher betrieben werden kann. Dazu können insbesondere IP-Adresse,
          Datum und Uhrzeit des Abrufs, aufgerufene Seite, Browser,
          Betriebssystem und Referrer gehören.
        </p>

        <p>
          Die Website ist statisch exportiert. Es werden derzeit keine
          Formulare, Kommentarfunktionen, eingebetteten Drittinhalte oder
          Newsletter-Tools betrieben.
        </p>

        <h2>3. Hosting und Server-Logfiles</h2>
        <p>
          Diese Website wird über GitHub Pages, einen Dienst der GitHub, Inc.,
          gehostet und unter einer eigenen Domain ausgeliefert. Die eigene
          Domain ändert die öffentliche Adresse der Website, nicht aber den
          Hosting-Anbieter.
        </p>

        <p>
          Beim Abruf der Website verarbeitet GitHub technische Zugriffsdaten,
          insbesondere zur Bereitstellung des Dienstes und aus
          Sicherheitsgründen. Dazu können insbesondere IP-Adresse, Header- und
          Browser-Informationen, Datum und Uhrzeit des Abrufs sowie die
          aufgerufene Ressource gehören. Ich erhalte über GitHub Pages keine
          gesonderten Roh-Server-Logfiles für Besucherzugriffe.
        </p>

        <p>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Das berechtigte
          Interesse liegt in der sicheren, zuverlässigen und effizienten
          Bereitstellung der Website.
        </p>

        <p>
          Weitere Informationen zur Datenverarbeitung durch GitHub finden sich
          in der Datenschutzerklärung von GitHub:
          <br />
          https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement
        </p>

        <h2>4. TelemetryDeck</h2>
        <p>
          Diese Website nutzt TelemetryDeck für die Auswertung der
          Webseiten-Nutzung. TelemetryDeck wird so eingesetzt, dass keine
          Cookies gesetzt und keine Fingerprinting-Verfahren verwendet werden.
          Zur Unterscheidung einzelner Browser-Installationen wird jedoch eine
          zufällig erzeugte pseudonyme Kennung im Browser gespeichert und bei
          späteren Aufrufen wiederverwendet. Die Auswertung dient dazu, zu
          verstehen, welche Inhalte gelesen werden, über welche Wege
          Besucherinnen und Besucher auf die Website kommen und welche Geräte,
          Browser und Länder häufig vorkommen.
        </p>

        <p>
          Je nach Seite und Aufruf können an TelemetryDeck insbesondere folgende
          Informationen übermittelt werden: aufgerufene URL und Pfad, Referrer,
          UTM-Parameter, Browser, Browser-Version, Betriebssystem, Gerätetyp,
          Land, Bot-Erkennung sowie die gehashte pseudonyme Besucherkennung.
        </p>

        <p>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Das berechtigte
          Interesse liegt in der Reichweitenmessung und in der inhaltlichen und
          technischen Verbesserung dieser Website.
        </p>

        <p>
          Wenn diese TelemetryDeck-Nutzung oder andere Werkzeuge künftig so
          erweitert werden, dass eine Einwilligung nach dem TDDDG erforderlich
          ist, werden sie erst nach einer wirksamen Einwilligung aktiviert.
        </p>

        <h2>5. Speicherdauer</h2>
        <p>
          Die Speicherdauer technischer Zugriffsdaten bei GitHub Pages richtet
          sich nach den Vorgaben und internen Aufbewahrungsfristen von GitHub.
          Ich habe auf diese serverseitigen Fristen keinen unmittelbaren
          Einfluss.
        </p>

        <p>
          Die über diese Website an TelemetryDeck gesendeten Analysedaten werden
          im TelemetryDeck-Konto vorgehalten, bis sie dort gelöscht werden oder
          bis TelemetryDeck die serverseitigen Aufbewahrungsregeln ändert. Über
          den Website-Code ist derzeit keine kürzere automatische Löschfrist
          konfiguriert.
        </p>

        <h2>6. Ihre Rechte</h2>
        <p>
          Sie haben die Rechte auf Auskunft, Berichtigung, Löschung,
          Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch
          gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
          Sofern eine Verarbeitung auf Ihrer Einwilligung beruht, können Sie die
          Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen.
        </p>

        <p>
          Außerdem haben Sie das Recht, sich bei einer
          Datenschutzaufsichtsbehörde zu beschweren. Zuständig ist insbesondere
          die Aufsichtsbehörde an Ihrem gewöhnlichen Aufenthaltsort, Ihrem
          Arbeitsplatz oder dem Ort des mutmaßlichen Verstoßes.
        </p>

        <h2>7. Pflicht zur Bereitstellung</h2>
        <p>
          Die Bereitstellung der für den Website-Besuch erforderlichen
          technischen Daten ist für die Nutzung der Website notwendig. Ohne
          diese Daten kann die Website nicht zuverlässig ausgeliefert werden.
        </p>

        <h2>8. Stand der Datenschutzerklärung</h2>
        <p>
          Diese Datenschutzerklärung gilt für die aktuell betriebene Website mit
          TelemetryDeck und statischem Export. Wenn sich die technischen
          Werkzeuge oder Inhalte ändern, wird diese Seite entsprechend
          angepasst.
        </p>

        <hr />

        <h2>1. Controller</h2>
        <p>
          The controller for data processing on this website is:
          <br />
          Jan-Gerke Salomon
          <br />
          Leibnizstr. 1
          <br />
          76137 Karlsruhe
          <br />
          E-mail: jgs.salomon@maintainable.software
        </p>

        <h2>2. General information on data processing</h2>
        <p>
          When you visit this website, technical connection and usage data are
          processed so the site can be delivered and operated securely. This may
          include IP address, date and time of access, requested page, browser,
          operating system, and referrer.
        </p>

        <p>
          The website is statically exported. There are currently no forms,
          comment systems, embedded third-party content, or newsletter tools.
        </p>

        <h2>3. Hosting and server log files</h2>
        <p>
          This website is hosted on GitHub Pages, a service operated by GitHub,
          Inc., and is served through a custom domain. The custom domain changes
          the public address of the site, but not the hosting provider.
        </p>

        <p>
          When the website is accessed, GitHub processes technical access data
          in order to provide the service and for security purposes. This may
          include IP address, request headers, browser information, date and
          time of access, and the requested resource. I do not receive separate
          raw visitor server log files from GitHub Pages.
        </p>

        <p>
          The legal basis is Art. 6(1)(f) GDPR. The legitimate interest is the
          secure, reliable, and efficient provision of the website.
        </p>

        <p>
          More information about GitHub&apos;s processing is available in
          GitHub&apos;s general privacy statement:
          <br />
          https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement
        </p>

        <h2>4. TelemetryDeck</h2>
        <p>
          This website uses TelemetryDeck for website analytics. TelemetryDeck
          is used in a cookie-free way and without fingerprinting. To
          distinguish individual browser installations, a randomly generated
          pseudonymous identifier is stored in the browser and reused on later
          visits. The purpose is to understand which content is read, how
          visitors arrive at the site, and which devices, browsers, and
          countries are most common.
        </p>

        <p>
          Depending on the page and request, TelemetryDeck may receive in
          particular the following information: page URL and path, referrer, UTM
          parameters, browser, browser version, operating system, device type,
          country, bot detection, and the hashed pseudonymous visitor
          identifier.
        </p>

        <p>
          The legal basis is Art. 6(1)(f) GDPR. The legitimate interest is reach
          measurement and the editorial and technical improvement of this
          website.
        </p>

        <p>
          If this TelemetryDeck setup or other tools are later extended in ways
          that require consent under the TDDDG, they will only be activated
          after valid consent.
        </p>

        <h2>5. Retention period</h2>
        <p>
          The retention period for technical access data on GitHub Pages is
          determined by GitHub&apos;s own policies and internal retention rules.
          I do not directly control those server-side retention periods.
        </p>

        <p>
          Analytics data sent by this website to TelemetryDeck is retained in
          the TelemetryDeck account until it is deleted there or until
          TelemetryDeck changes its server-side retention rules. No shorter
          automatic deletion period is currently enforced in this site&apos;s
          code.
        </p>

        <h2>6. Your rights</h2>
        <p>
          You have the right to access, rectification, erasure, restriction of
          processing, data portability, and to object to processing based on
          Art. 6(1)(f) GDPR. If processing is based on your consent, you may
          withdraw that consent at any time with effect for the future.
        </p>

        <p>
          You also have the right to lodge a complaint with a data protection
          supervisory authority, in particular the authority at your habitual
          residence, workplace, or the place of the alleged infringement.
        </p>

        <h2>7. Necessity of data provision</h2>
        <p>
          The technical data required to load and operate the website is
          necessary for using the site. Without it, the website cannot be
          delivered reliably.
        </p>

        <h2>8. Version of this policy</h2>
        <p>
          This privacy policy applies to the current website setup with
          TelemetryDeck and static export. If the technical tools or content
          change, this page will be updated accordingly.
        </p>

        <p>
          <Link href="/imprint/">Back to the imprint</Link>
        </p>
      </div>
    </article>
  );
}
