import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";
import { Question } from "@/utils/types";

export default function ResultPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, string[]>>({});

  useEffect(() => {
    const localData = localStorage.getItem("testResult");
    if (localData) {
      const parsedData = JSON.parse(localData);
      setQuestions(parsedData.questions);
      setUserAnswers(parsedData.userAnswers || {}); // Ensure userAnswers is initialized
    } else {
      alert("No result data found. Redirecting to home.");
      router.push("/");
    }
  }, [router]);

  const correctAnswersCount = questions.filter((q, index) => {
    const userAnswer = userAnswers[index] || []; // Default to empty array for skipped questions
    const correctAnswerTexts = q.correctOptions.map(
      (opt) => q.options[opt.charCodeAt(0) - 65]
    );
    return (
      userAnswer.length > 0 && // Ensure the question was answered
      correctAnswerTexts.every((text) => userAnswer.includes(text)) &&
      userAnswer.length === correctAnswerTexts.length
    );
  }).length;

  const calculateScoresBy = (key: "section" | "subject") => {
    const groupedScores: Record<string, { correct: number; total: number }> = {};

    questions.forEach((q, index) => {
      const groupKey = q[key] || "N/A";
      if (!groupedScores[groupKey]) {
        groupedScores[groupKey] = { correct: 0, total: 0 };
      }

      const userAnswer = userAnswers[index] || [];
      const correctAnswerTexts = q.correctOptions.map(
        (opt) => q.options[opt.charCodeAt(0) - 65]
      );

      groupedScores[groupKey].total += 1;
      if (
        userAnswer.length > 0 &&
        correctAnswerTexts.every((text) => userAnswer.includes(text)) &&
        userAnswer.length === correctAnswerTexts.length
      ) {
        groupedScores[groupKey].correct += 1;
      }
    });

    return groupedScores;
  };

  const sectionScores = calculateScoresBy("section");
  const subjectScores = calculateScoresBy("subject");

  const copyAsMarkdown = () => {
    const markdown = questions
      .map((q, index) => {
        const userAnswer = userAnswers[index] || []; // Default to empty array for skipped questions
        const correctAnswerTexts = q.correctOptions.map(
          (opt) => q.options[opt.charCodeAt(0) - 65]
        );
        const isCorrect =
          userAnswer.length > 0 && // Ensure the question was answered
          correctAnswerTexts.every((text) => userAnswer.includes(text)) &&
          userAnswer.length === correctAnswerTexts.length;

        const optionsWithLabels = q.options
          .map(
            (option, optIndex) =>
              `${String.fromCharCode(65 + optIndex)}. ${option}${
                correctAnswerTexts.includes(option) ? " (Correct)" : ""
              }${userAnswer.includes(option) ? " (Your Choice)" : ""}`
          )
          .join("\n");

        return `### Q${index + 1}: ${q.question}\n\n**Options:**\n${optionsWithLabels}\n\n**Result:** ${
          userAnswer.length === 0
            ? "⚠️ Skipped"
            : isCorrect
            ? "✅ Correct"
            : "❌ Incorrect"
        }${q.explanation ? `\n\n**Explanation:** ${q.explanation}` : ""}`;
      })
      .join("\n\n---\n\n");

    navigator.clipboard.writeText(markdown);
    alert("Result copied as markdown!");
  };

  return (
    <div className="min-h-screen p-8 flex flex-col gap-8">
      <h1 className="text-2xl font-bold">Test Results</h1>
      {/* Scoring Section */}
      <div className="p-4 bg-gray-100 rounded-md shadow-sm">
        <h2 className="text-2xl font-bold mb-2">Score</h2>
        <p className="text-lg">
          You answered <strong>{correctAnswersCount}</strong> out of{" "}
          <strong>{questions.length}</strong> questions correctly.
        </p>
        <p className="text-lg">
          Your score:{" "}
          <strong>
            {((correctAnswersCount / questions.length) * 100).toFixed(2)}%
          </strong>
        </p>
        <h3 className="text-xl font-bold mt-4">Scores by Section</h3>
        <ul className="list-disc pl-6">
          {Object.entries(sectionScores).map(([section, score]) => (
            <li key={section}>
              <strong>{section}:</strong> {score.correct} / {score.total} (
              {((score.correct / score.total) * 100).toFixed(2)}%)
            </li>
          ))}
        </ul>
        <h3 className="text-xl font-bold mt-4">Scores by Subject</h3>
        <ul className="list-disc pl-6">
          {Object.entries(subjectScores).map(([subject, score]) => (
            <li key={subject}>
              <strong>{subject}:</strong> {score.correct} / {score.total} (
              {((score.correct / score.total) * 100).toFixed(2)}%)
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        {questions.map((q, index) => {
          const userAnswer = userAnswers[index] || []; // Default to empty array for skipped questions
          const correctAnswerTexts = q.correctOptions.map(
            (opt) => q.options[opt.charCodeAt(0) - 65]
          );
          const isCorrect =
            userAnswer.length > 0 && // Ensure the question was answered
            correctAnswerTexts.every((text) => userAnswer.includes(text)) &&
            userAnswer.length === correctAnswerTexts.length;

          return (
            <div
              key={index}
              className="p-4 border rounded-md shadow-sm bg-white print:border-none print:shadow-none"
            >
              <h2 className="font-medium">
                <ReactMarkdown rehypePlugins={[rehypeKatex]} remarkPlugins={[remarkMath]}>
                  {q.question}
                </ReactMarkdown>
              </h2>
              <ul className="list-none space-y-2 mt-2">
                {q.options.map((option, optIndex) => (
                  <li
                    key={optIndex}
                    className={`p-2 rounded-md ${
                      correctAnswerTexts.includes(option)
                        ? "bg-green-100 text-green-800"
                        : userAnswer.includes(option)
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100"
                    }`}
                  >
                    <ReactMarkdown rehypePlugins={[rehypeKatex]} remarkPlugins={[remarkMath]}>
                      {`${String.fromCharCode(65 + optIndex)}. ${option}`}
                    </ReactMarkdown>
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                <strong>Result:</strong>{" "}
                {userAnswer.length === 0 ? (
                  <span className="text-yellow-600">⚠️ Skipped</span>
                ) : isCorrect ? (
                  <span className="text-green-600">✅ Correct</span>
                ) : (
                  <span className="text-red-600">❌ Incorrect</span>
                )}
              </p>
              {q.explanation && (
                <div className="mt-4">
                  <strong>Explanation:</strong>
                  <ReactMarkdown rehypePlugins={[rehypeKatex]} remarkPlugins={[remarkMath]}>
                    {q.explanation}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={copyAsMarkdown}
      >
        Copy this result as markdown
      </button>
      <style jsx global>{`
        @media print {
          body {
            background: white;
            color: black;
          }
          .print\:border-none {
            border: none !important;
          }
          .print\:shadow-none {
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
}
