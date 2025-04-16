import Head from "next/head";
import Link from "next/link";
import { useRef } from "react";

export default function AboutPage() {
  const promptRef = useRef<HTMLPreElement>(null);

  const handleCopy = () => {
    if (promptRef.current) {
      navigator.clipboard.writeText(promptRef.current.innerText);
      alert("Prompt copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen p-8 flex flex-col gap-8 bg-white dark:bg-gray-900 text-black dark:text-white">
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="../img/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="../img/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="../img/favicon-16x16.png" />
        <link rel="icon" type="image/x-icon" href="../favicon.ico" />
        <link rel="manifest" href="../site.webmanifest" />
        <meta property="og:image" content={`${process.env.SITE_URL}/img/og-image.png`} />
        <meta property="og:title" content="About | MockGuru" />
        <meta property="og:description" content="Learn more about MockGuru, the AI-powered mock test platform for JEE, NEET, UPSC, and more." />
        <meta property="og:url" content={process.env.SITE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <title>About | MockGuru</title>
      </Head>
      <header className="flex justify-between items-center mb-8">
        <Link href="/" className="text-blue-500 dark:text-blue-400 hover:underline">
          <h1 className="text-3xl font-bold">MockGuru</h1>
        </Link>
      </header>
      <p className="text-lg">
        MockGuru is designed to help students prepare for competitive exams by leveraging the power of ChatGPT. The workflow is simple:
      </p>
      <ol className="list-decimal pl-6 text-lg">
        <li>
          Use ChatGPT to generate high-quality multiple-choice questions (MCQs) in a CSV format using the sample prompt provided below.
        </li>
        <li>
          Paste the generated CSV into the{" "}
          <Link href="/" className="text-blue-500 hover:underline">
            homepage
          </Link>{" "}
          of MockGuru to parse the questions and take the exam.
        </li>
        <li>
          After completing the exam, navigate to the result page and use the &quot;Copy for ChatGPT&quot; button to copy your performance data.
        </li>
        <li>
          Paste the copied data back into ChatGPT for a detailed analysis of your strengths and weaknesses, along with recommendations for improvement.
        </li>
      </ol>
      <h2 className="text-2xl font-bold mt-4">Sample Prompt for Generating Questions</h2>
      <div className="relative">
        <button
          onClick={handleCopy}
          className="absolute top-0 right-0 px-2 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
        >
          Copy
        </button>
        <pre
          ref={promptRef}
          className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white p-4 rounded-md text-sm overflow-x-auto"
        >
          {`Act as an expert question paper setter for competitive exams. Use the **official syllabus**, **previous year papers**, **question banks**, and key **exam-relevant concepts** to generate **high-quality** multiple-choice questions (MCQs) with **detailed explanations**.

📝 Output Format:
Return the questions in valid **CSV format**, structured as follows:
exam,section,subject,question,option_a,option_b,option_c,option_d,correct_option,explanation  
[EXAM],[TOPIC],[SUBJECT],"Your question here","Option A","Option B","Option C","Option D","Correct Option","Detailed explanation with concepts, logic, and formulas. Use \\n to separate each line."

📌 Formatting and Content Guidelines:
- Use **GitHub-flavored Markdown** (e.g., \`**bold**\` for emphasis) in both *questions* and *explanations*.
- Use **KaTeX-style math notation** (e.g., \`$x^2 + y^2 = z^2$\`) for all mathematical expressions.
- Questions should reflect **moderate to challenging** difficulty and closely follow real exam patterns.
- Provide detailed explanations that include:
  - Step-by-step solution
  - Underlying concepts
  - Common traps or misconceptions
  - Relevant formulas
- 📌 Reading Comprehension Requirement:
  - If the section is Reading Comprehension, include the full passage followed by the question, clearly separated.
- Correct answer formats:
  - For **single correct**: \`A\`, \`B\`, \`C\`, or \`D\`
  - For **multi-correct**: \`A,B\` or \`B,C,D\` (comma-separated)

✅ Quality Checklist:
- **Ensure all answer choices and explanations are accurate.**
- **Ensure the CSV is correctly formatted and not malformed.**
- **Avoid duplicate or vague options.**

🔽 Inputs:
- Exam: [EXAM]
- Subject: [SUBJECT]
- Number of questions: 10

Begin generating the MCQs now.`}
        </pre>
      </div>
      <h2 className="text-2xl font-bold mt-4">Copy for ChatGPT</h2>
      <p className="text-lg">
        After completing the exam, use the &quot;Copy for ChatGPT&quot; button on the result page to copy your performance data. Paste this data into ChatGPT to get a detailed analysis of your strengths and weaknesses, along with actionable recommendations for improvement.
      </p>
    </div>
  );
}

