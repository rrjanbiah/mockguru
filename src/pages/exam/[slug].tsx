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
          <link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon-16x16.png" />
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <link rel="manifest" href="/site.webmanifest" />
          <meta property="og:image" content={`${process.env.SITE_URL}/img/og-image.png`} />
          <meta property="og:title" content={`${frontmatter.title} | MockGuru`} /> {/* Updated for SEO */}
          <meta property="og:description" content={frontmatter.description} /> {/* Updated */}
          <meta property="og:url" content={process.env.SITE_URL} />
          <meta name="twitter:card" content="summary_large_image" />
          <title>{`${frontmatter.title} | MockGuru`}</title> {/* Updated */}
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
