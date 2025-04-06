import matter from "gray-matter";

export function markdownToCsv(markdown: string) {
  const { content } = matter(markdown);
  // Convert content to CSV format (implementation pending)
  return content;
}
