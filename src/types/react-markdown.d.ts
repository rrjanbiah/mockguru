declare module "react-markdown" {
  import * as React from "react";

  export interface ReactMarkdownProps {
    children: string;
    rehypePlugins?: unknown[]; // Replaced any[] with unknown[]
    remarkPlugins?: unknown[]; // Replaced any[] with unknown[]
  }

  const ReactMarkdown: React.FC<ReactMarkdownProps>;
  export default ReactMarkdown;
}
