import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
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

  const correctAnswersCount = questions.filter((q, index) => {
    const userAnswer = userAnswers[index] || [];
    const correctAnswerTexts = q.correctOptions.map(
      (opt) => q.options[opt.charCodeAt(0) - 65]
    );
    return (
      correctAnswerTexts.every((text) => userAnswer.includes(text)) &&
      userAnswer.length === correctAnswerTexts.length
    );
  }).length;

  const copyAsMarkdown = () => {
    const markdown = questions
      .map((q, index) => {
        const userAnswer = userAnswers[index] || [];
        const correctAnswerTexts = q.correctOptions.map(
          (opt) => q.options[opt.charCodeAt(0) - 65]
        );
        const isCorrect =
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
          isCorrect ? "✅ Correct" : "❌ Incorrect"
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
      </div>
      <div className="flex flex-col gap-4">
        {questions.map((q, index) => {
          const userAnswer = userAnswers[index] || [];
          const correctAnswerTexts = q.correctOptions.map(
            (opt) => q.options[opt.charCodeAt(0) - 65]
          );
          const isCorrect =
            correctAnswerTexts.every((text) => userAnswer.includes(text)) &&
            userAnswer.length === correctAnswerTexts.length;

          return (
            <div
              key={index}
              className="p-4 border rounded-md shadow-sm bg-white print:border-none print:shadow-none"
            >
              <h2 className="font-medium">Question {index + 1}</h2>
              <p>{q.question}</p>
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
                    <strong>{String.fromCharCode(65 + optIndex)}. </strong>
                    {option}
                    {correctAnswerTexts.includes(option) && " (Correct)"}
                    {userAnswer.includes(option) && " (Your Choice)"}
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                <strong>Result:</strong>{" "}
                {isCorrect ? (
                  <span className="text-green-600">✅ Correct</span>
                ) : (
                  <span className="text-red-600">❌ Incorrect</span>
                )}
              </p>
              {q.explanation && (
                <div className="mt-4">
                  <strong>Explanation:</strong>
                  <ReactMarkdown className="prose">
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
