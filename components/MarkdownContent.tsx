import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

const markdownComponents: Components = {
  a({ href, children, ...props }) {
    return (
      <a data-telemetry-link="content" href={href} {...props}>
        {children}
      </a>
    );
  },
};

export function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={markdownComponents}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
    >
      {content}
    </ReactMarkdown>
  );
}
