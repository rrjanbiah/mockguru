import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import ResultSummary from "@/components/ResultSummary";
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
      setUserAnswers(parsedData.userAnswers);
    } else {
      alert("No result data found. Redirecting to home.");
      router.push("/");
    }
  }, [router]);

  const copyAsMarkdown = () => {
    const markdown = questions
      .map((q, index) => {
        const userAnswer = userAnswers[index]?.join(", ") || "No answer";
        const correctAnswer = q.correctOptions.join(", ");
        const isCorrect =
          JSON.stringify(userAnswers[index]?.sort()) ===
          JSON.stringify(q.correctOptions.sort());
        return `### Question ${index + 1}\n\n**Question:** ${q.question}\n\n**Your Answer:** ${userAnswer}\n\n**Correct Answer:** ${correctAnswer}\n\n**Result:** ${
          isCorrect ? "✅ Correct" : "❌ Incorrect"
        }\n\n**Explanation:**\n${q.explanation || "No explanation provided."}\n`;
      })
      .join("\n---\n");

    navigator.clipboard.writeText(markdown);
    alert("Result copied as markdown!");
  };

  return (
    <div className="min-h-screen p-8 flex flex-col gap-8">
      <h1 className="text-2xl font-bold">Test Results</h1>
      <ResultSummary questions={questions} userAnswers={userAnswers} />
      <div className="flex flex-col gap-4">
        {questions.map((q, index) => {
          const userAnswer = userAnswers[index]?.join(", ") || "No answer";
          const correctAnswer = q.correctOptions.join(", ");
          const isCorrect =
            JSON.stringify(userAnswers[index]?.sort()) ===
            JSON.stringify(q.correctOptions.sort());
          return (
            <div
              key={index}
              className="p-4 border rounded-md shadow-sm bg-white print:border-none print:shadow-none"
            >
              <h2 className="font-medium">Question {index + 1}</h2>
              <p>{q.question}</p>
              <p>
                <strong>Your Answer:</strong>{" "}
                <span
                  className={`${
                    isCorrect ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {userAnswer}
                </span>
              </p>
              <p>
                <strong>Correct Answer:</strong>{" "}
                <span className="text-green-600">{correctAnswer}</span>
              </p>
              <p>
                <strong>Result:</strong>{" "}
                {isCorrect ? "✅ Correct" : "❌ Incorrect"}
              </p>
              {q.explanation && (
                <div>
                  <strong>Explanation:</strong>
                  <ReactMarkdown className="prose">{q.explanation}</ReactMarkdown>
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
