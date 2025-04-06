import { Question } from "@/utils/types";

export default function ResultSummary({
  questions,
  userAnswers,
}: {
  questions: Question[];
  userAnswers: Record<number, string[]>;
}) {
  return (
    <div className="p-4 border rounded-md shadow-sm">
      <h2 className="text-xl font-bold mb-4">Summary</h2>
      <ul className="list-disc pl-6">
        {questions.map((q, index) => {
          const userAnswer = userAnswers[index]?.join(", ") || "No answer";
          const correctAnswer = q.correctOptions.join(", ");
          const isCorrect =
            JSON.stringify(userAnswers[index]?.sort()) ===
            JSON.stringify(q.correctOptions.sort());
          return (
            <li key={index} className="mb-2">
              <strong>Question {index + 1}:</strong> {q.question}
              <br />
              <strong>Your Answer:</strong> {userAnswer}
              <br />
              <strong>Correct Answer:</strong> {correctAnswer}
              <br />
              <strong>Result:</strong>{" "}
              {isCorrect ? (
                <span className="text-green-600">✅ Correct</span>
              ) : (
                <span className="text-red-600">❌ Incorrect</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
