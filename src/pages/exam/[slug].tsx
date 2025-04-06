import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import ReactMarkdown from "react-markdown";

export default function ExamPage({
  content,
  frontmatter,
}: {
  content: string;
  frontmatter: { title: string; description: string };
}) {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
      </Head>
      <article className="prose prose-lg max-w-none mx-auto">
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>
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
