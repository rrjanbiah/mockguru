import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import ConfigForm from "@/components/ConfigForm";
import { parseCsv } from "@/utils/parseCsv";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Question } from "@/utils/types";

type Config = {
  pagination: string;
  timer: boolean;
  timerDuration: number;
  shuffle: boolean;
};

type Exam = {
  slug: string;
  title: string;
  description: string;
};

export default function IndexPage({ exams }: { exams: Exam[] }) {
  const [input, setInput] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const router = useRouter();

  const handleParse = () => {
    try {
      const parsed = parseCsv(input);
      setQuestions(parsed);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message || "Invalid CSV format. Please check your input.");
      } else {
        alert("An unknown error occurred.");
      }
    }
  };

  const handleSubmit = (config: Config) => {
    if (questions.length === 0) {
      alert("No questions parsed. Please provide valid input.");
      return;
    }

    // Store questions and config in localStorage
    localStorage.setItem("testData", JSON.stringify({ questions, config }));

    // Clear any previous user answers or results
    localStorage.removeItem("userAnswers");
    localStorage.removeItem("testResult");

    // Navigate to the test page
    router.push("/test");
  };

  return (
    <div className="min-h-screen p-8 flex flex-col gap-8">
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon-16x16.png" />
        <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta property="og:image" content={`${process.env.SITE_URL}/img/og-image.png`} />
        <meta property="og:title" content="MockGuru - Smart Exam Prep" />
        <meta property="og:description" content="AI-powered mock tests for JEE, NEET, UPSC, and more" />
        <meta property="og:url" content={process.env.SITE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <title>MockGuru - Smart Exam Prep</title>
      </Head>
      
      <header className="flex justify-between items-center mb-8">
        <Link href="/" className="text-blue-500 hover:underline">
          <h1 className="text-3xl font-bold">MockGuru</h1>
        </Link>
        <Link href="/about" className="text-blue-500 hover:underline">
          About
        </Link>
      </header>
      <textarea
        className="w-full h-40 p-4 border rounded-md"
        placeholder="Paste your CSV of questions here. Ensure it follows the required format."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
        onClick={handleParse}
      >
        Parse Questions
      </button>
      {questions.length > 0 && (
        <div>
          {/* <h2 className="text-xl font-bold mt-4">Parsed Questions</h2>
          <ul className="list-disc pl-6">
            {questions.map((q, index) => (
              <li key={index} className="mb-2">
                <strong>Q{index + 1}:</strong> {q.question}
                <ul className="list-disc pl-6">
                  {q.options.map((option, optIndex) => (
                    <li key={optIndex}>
                      <strong>{String.fromCharCode(65 + optIndex)}. </strong>
                      {option}
                    </li>
                  ))}
                </ul>
                {q.explanation && (
                  <p className="mt-2">
                    <strong>Explanation:</strong> {q.explanation}
                  </p>
                )}
              </li>
            ))}
          </ul> */}
          <ConfigForm onSubmit={handleSubmit} />
          <hr />
        </div>
      )}
      <h2 className="text-xl font-semibold mt-4">Exams</h2>
      <ul className="list-disc pl-6">
        {exams.map((exam) => (
          <li key={exam.slug} className="mb-2">
            <Link href={`/exam/${exam.slug}`} className="text-blue-500 dark:text-blue-400 hover:underline">
              {exam.title}
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">{exam.description}</p> {/* Improved contrast */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const examsDir = path.join(process.cwd(), "src/content/exams");
  const filenames = fs.readdirSync(examsDir);

  const exams = filenames.map((filename) => {
    const filePath = path.join(examsDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    return {
      slug: filename.replace(".md", ""),
      title: data.title || "Untitled Exam",
      description: data.description || "No description available.",
    };
  });

  return {
    props: {
      exams,
    },
  };
}
