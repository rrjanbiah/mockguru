import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Ensure this import exists
import Link from "next/link"; // Import Link from next/link

export default function ExamPage({
  content,
  frontmatter,
}: {
  content: string;
  frontmatter: { title: string; description: string };
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <header className="bg-blue-500 dark:bg-blue-600 text-white p-4">
        <Link href="/" className="text-xl font-bold hover:underline">
          MockGuru
        </Link>
      </header>
      <div className="p-8 bg-gray-50 dark:bg-gray-800">
        <Head>
          <title>{frontmatter.title}</title>
          <meta name="description" content={frontmatter.description} />
        </Head>
        <article className="prose prose-lg dark:prose-invert max-w-none mx-auto">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown> {/* Ensure remark-gfm is used */}
        </article>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const examsDir = path.join(process.cwd(), "src/content/exams");
  const filenames = fs.readdirSync(examsDir);

  const paths = filenames.map((filename) => ({
    params: { slug: filename.replace(".md", "") },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const filePath = path.join(process.cwd(), "src/content/exams", `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { content, data: frontmatter } = matter(fileContent);

  return {
    props: {
      content,
      frontmatter,
    },
  };
};
