"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  TelemetryDeckProvider,
  browserPlugin,
  createTelemetryDeck,
  useTelemetryDeck,
} from "@typedigital/telemetrydeck-react";
import type { ReactNode } from "react";

type TelemetryDeckPostOpenTrackerProps = {
  post: {
    slug: string;
    title: string;
    tags?: string[];
    series_slug?: string;
  };
};

type TelemetryDestinationType =
  | "external"
  | "internal"
  | "header"
  | "footer"
  | "archive-pagination"
  | "post"
  | "rss"
  | "author"
  | "tag"
  | "content"
  | "post-card";

type TelemetryContentType = "page" | "post" | "navigation";
type TelemetryInteractionKind =
  | "nav"
  | "rss"
  | "archive"
  | "author"
  | "tag"
  | "content"
  | "post-card"
  | "outbound";

type StructuredTelemetryPayload = Record<string, unknown> & {
  contentType: TelemetryContentType;
  destinationType: TelemetryDestinationType;
  linkText?: string;
  interactionKind?: TelemetryInteractionKind;
};

const TELEMETRY_DECK_APP_ID = "D9A18849-0409-45E3-B270-4F7F345B2CD7";
const ANONYMOUS_VISITOR_ID_STORAGE_KEY =
  "maintainable.software.telemetryDeckVisitorId";

type TelemetryDeckInstance = ReturnType<typeof createTelemetryDeck>;

function createAnonymousVisitorId(): string {
  if (typeof window !== "undefined" && window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  if (typeof window !== "undefined" && window.crypto?.getRandomValues) {
    const bytes = new Uint8Array(16);
    window.crypto.getRandomValues(bytes);
    return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(
      "",
    );
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function readStoredVisitorId(storage: Storage): string | null {
  try {
    return storage.getItem(ANONYMOUS_VISITOR_ID_STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeStoredVisitorId(storage: Storage, visitorId: string): boolean {
  try {
    storage.setItem(ANONYMOUS_VISITOR_ID_STORAGE_KEY, visitorId);
    return true;
  } catch {
    return false;
  }
}

function getExistingAnonymousVisitorId(): string | null {
  const storages = [window.localStorage, window.sessionStorage];

  for (const storage of storages) {
    const visitorId = readStoredVisitorId(storage);
    if (visitorId) {
      return visitorId;
    }
  }

  return null;
}

function persistAnonymousVisitorId(visitorId: string): void {
  const storages = [window.localStorage, window.sessionStorage];

  for (const storage of storages) {
    if (writeStoredVisitorId(storage, visitorId)) {
      return;
    }
  }
}

function createInitialClientUser(): string {
  if (typeof window === "undefined") {
    return "server-render";
  }

  return getExistingAnonymousVisitorId() ?? createAnonymousVisitorId();
}

function isModifiedClick(event: MouseEvent): boolean {
  return (
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  );
}

function getLinkLabel(anchor: HTMLAnchorElement): string {
  return anchor.textContent?.replace(/\s+/g, " ").trim() ?? "";
}

function getLinkCategory(anchor: HTMLAnchorElement): string | undefined {
  return anchor
    .closest("[data-telemetry-link]")
    ?.getAttribute("data-telemetry-link")
    ?.trim()
    .toLowerCase();
}

function buildStructuredTelemetryPayload(
  payload: StructuredTelemetryPayload,
): StructuredTelemetryPayload {
  return payload;
}

function getTrackedHref(url: URL, isExternal: boolean): string {
  return isExternal
    ? url.toString()
    : `${url.pathname}${url.search}${url.hash}`;
}

function TelemetryDeckPageViewTracker() {
  const { signal } = useTelemetryDeck();
  const pathname = usePathname();
  const previousUrlRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    const url = window.location.href;
    const referrer = previousUrlRef.current ?? document.referrer;

    void signal("pageView", {
      contentType: "page",
      destinationType: "internal",
      path: pathname,
      referrer,
      url,
    });

    previousUrlRef.current = url;
  }, [pathname, signal]);

  return null;
}

function TelemetryDeckClickTracker() {
  const { signal } = useTelemetryDeck();
  const pathname = usePathname();

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || isModifiedClick(event)) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) {
        return;
      }

      const href = anchor.getAttribute("href");
      if (!href) {
        return;
      }

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }

      if (url.protocol !== "http:" && url.protocol !== "https:") {
        return;
      }

      const linkLabel = getLinkLabel(anchor);
      const linkCategory = getLinkCategory(anchor);
      const area = anchor
        .closest("[data-telemetry-area]")
        ?.getAttribute("data-telemetry-area");
      const currentPath = pathname;
      const isExternal = url.origin !== window.location.origin;
      const trackedHref = getTrackedHref(url, isExternal);

      if (linkCategory === "content") {
        void signal(
          "contentLinkClick",
          buildStructuredTelemetryPayload({
            contentType: "navigation",
            destinationType: isExternal ? "external" : "content",
            href: trackedHref,
            interactionKind: "content",
            linkText: linkLabel,
            isExternal,
            sourcePath: currentPath,
          }),
        );

        if (isExternal) {
          void signal(
            "outboundLinkClick",
            buildStructuredTelemetryPayload({
              contentType: "navigation",
              destinationType: "external",
              href: trackedHref,
              interactionKind: "outbound",
              linkText: linkLabel,
              isExternal: true,
              sourcePath: currentPath,
            }),
          );
        }

        return;
      }

      if (linkCategory === "author") {
        void signal(
          "authorClick",
          buildStructuredTelemetryPayload({
            contentType: "navigation",
            destinationType: "author",
            href: trackedHref,
            interactionKind: "author",
            linkText: linkLabel,
            isExternal,
            sourcePath: currentPath,
          }),
        );
        return;
      }

      if (linkCategory === "tag") {
        void signal(
          "tagClick",
          buildStructuredTelemetryPayload({
            contentType: "navigation",
            destinationType: "tag",
            href: trackedHref,
            interactionKind: "tag",
            linkText: linkLabel,
            isExternal,
            sourcePath: currentPath,
          }),
        );
        return;
      }

      if (linkCategory === "post-card") {
        void signal(
          "postCardClick",
          buildStructuredTelemetryPayload({
            contentType: "navigation",
            destinationType: "post-card",
            interactionKind: "post-card",
            href: trackedHref,
            linkText: linkLabel,
            isExternal,
            sourcePath: currentPath,
          }),
        );
        return;
      }

      if (isExternal) {
        void signal(
          "outboundLinkClick",
          buildStructuredTelemetryPayload({
            contentType: "navigation",
            destinationType: "external",
            href: trackedHref,
            interactionKind: "outbound",
            linkText: linkLabel,
            isExternal: true,
            sourcePath: currentPath,
          }),
        );
        return;
      }

      if (area === "archive-pagination") {
        void signal(
          "archivePaginationClick",
          buildStructuredTelemetryPayload({
            contentType: "navigation",
            destinationType: "archive-pagination",
            interactionKind: "archive",
            href: trackedHref,
            linkText: linkLabel,
            isExternal,
            sourcePath: currentPath,
          }),
        );
        return;
      }

      if (area === "header" || area === "footer") {
        void signal(
          "navigationClick",
          buildStructuredTelemetryPayload({
            contentType: "navigation",
            destinationType:
              url.pathname === "/rss.xml" &&
              url.search === "" &&
              url.hash === ""
                ? "rss"
                : area,
            area,
            href: trackedHref,
            kind:
              url.pathname === "/rss.xml" &&
              url.search === "" &&
              url.hash === ""
                ? "rss"
                : "nav",
            interactionKind:
              url.pathname === "/rss.xml" &&
              url.search === "" &&
              url.hash === ""
                ? "rss"
                : "nav",
            linkText: linkLabel,
            isExternal,
            sourcePath: currentPath,
          }),
        );
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [pathname, signal]);

  return null;
}

export function TelemetryDeckPostOpenTracker({
  post,
}: Readonly<TelemetryDeckPostOpenTrackerProps>) {
  const { signal } = useTelemetryDeck();

  useEffect(() => {
    void signal(
      "postOpen",
      buildStructuredTelemetryPayload({
        contentType: "post",
        destinationType: "post",
        interactionKind: "content",
        path: window.location.pathname,
        slug: post.slug,
        title: post.title,
        seriesSlug: post.series_slug,
        tags: post.tags,
      }),
    );
  }, [post.series_slug, post.slug, post.tags, post.title, signal]);

  return null;
}

export function TelemetryDeckShell({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [clientUser] = useState(createInitialClientUser);
  const telemetryDeck = useMemo<TelemetryDeckInstance>(
    () =>
      createTelemetryDeck({
        appID: TELEMETRY_DECK_APP_ID,
        clientUser,
        plugins: [browserPlugin],
      }),
    [clientUser],
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    persistAnonymousVisitorId(clientUser);
    telemetryDeck.clientUser = clientUser;
  }, [clientUser, telemetryDeck]);

  return (
    <TelemetryDeckProvider telemetryDeck={telemetryDeck}>
      <TelemetryDeckPageViewTracker />
      <TelemetryDeckClickTracker />
      {children}
    </TelemetryDeckProvider>
  );
}
