import { GetStaticProps, GetStaticPaths } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function ExamPage({ content }: { content: string }) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join(process.cwd(), "src/content/exams"));
  const paths = files.map((file) => ({
    params: { slug: file.replace(".md", "") },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const filePath = path.join(
    process.cwd(),
    "src/content/exams",
    `${params?.slug}.md`
  );
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(fileContent);
  return { props: { content } };
};
