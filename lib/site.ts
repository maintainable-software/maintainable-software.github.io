export const SITE_NAME = "maintainable.software";
export const SITE_URL = "https://maintainable.software";
export const SITE_DESCRIPTION =
  "Essays on agentic engineering, software architecture, docs-first product development, and maintainable software delivery.";

export const AUTHOR_NAME = "Jan-Gerke Salomon";
export const AUTHOR_PATH = "/me/";
export const AUTHOR_TITLE = "Independent Software Engineer";
export const AUTHOR_DESCRIPTION =
  "Independent software engineer focused on agentic engineering, software architecture, and maintainable full-stack delivery.";
export const AUTHOR_SAME_AS = [
  "https://github.com/Mohammer5",
  "https://www.linkedin.com/in/jan-gerke-salomon/"
];
export const AUTHOR_KNOWS_ABOUT = [
  "Agentic engineering",
  "Software architecture",
  "Maintainable software delivery",
  "Frontend engineering",
  "Full-stack development"
];

export function toAbsoluteUrl(pathOrUrl: string): string {
  return new URL(pathOrUrl, SITE_URL).toString();
}

export const AUTHOR_URL = toAbsoluteUrl(AUTHOR_PATH);
