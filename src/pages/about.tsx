import Head from "next/head";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen p-8 flex flex-col gap-8">
      <Head>
        <title>About | MockGuru</title>
      </Head>
      <header className="flex justify-between items-center mb-8">
        <Link href="/" className="text-blue-500 hover:underline">
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
      <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
        {`Act as an expert question paper setter for competitive exams. Based on the official syllabus, past year papers, and important exam-relevant concepts, generate high-quality multiple-choice questions (MCQs) with detailed explanations.

Instructions:
- Follow this CSV format:
exam,section,subject,question,option_a,option_b,option_c,option_d,correct_option,explanation
[EXAM],[TOPIC],[SUBJECT],"Your question here","Option A","Option B","Option C","Option D","Correct Option","Explanation with key concepts, steps, and formulas. Use \\n to separate each line of explanation for better readability."

Requirements:
- Use **GitHub-flavored markdown** (e.g., \`**bold**\`) in questions and explanations.
- Use **KaTeX-style math notation** (e.g., \`$x^2 + y^2 = z^2$\`) for mathematical expressions.
- All questions should be of **moderate to slightly challenging** difficulty, aligned with the real exam style.
- Format answers for:
  - Single correct: use \`A\`, \`B\`, etc.
  - Multi-correct: use \`A,B\` or \`B,C,D\` etc.

Inputs:
- Exam: [EXAM]
- Subject: [SUBJECT]
- Number of questions: 10`}
      </pre>
      <h2 className="text-2xl font-bold mt-4">Copy for ChatGPT</h2>
      <p className="text-lg">
        After completing the exam, use the &quot;Copy for ChatGPT&quot; button on the result page to copy your performance data. Paste this data into ChatGPT to get a detailed analysis of your strengths and weaknesses, along with actionable recommendations for improvement.
      </p>
    </div>
  );
}

