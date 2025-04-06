import { Question } from "@/utils/types";

export default function ResultSummary({
  questions,
  userAnswers,
}: {
  questions: Question[];
  userAnswers: Record<number, string[]>;
}) {
  const totalQuestions = questions.length;
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

  return (
    <div className="p-6 border rounded-md shadow-sm space-y-6">
      {/* Score Section */}
      <div className="p-4 bg-gray-100 rounded-md shadow-sm">
        <h2 className="text-2xl font-bold mb-2">Score</h2>
        <p className="text-lg">
          You answered <strong>{correctAnswersCount}</strong> out of{" "}
          <strong>{totalQuestions}</strong> questions correctly.
        </p>
        <p className="text-lg">
          Your score:{" "}
          <strong>
            {((correctAnswersCount / totalQuestions) * 100).toFixed(2)}%
          </strong>
        </p>
      </div>

      {/* Summary Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Summary</h2>
        <ul className="list-none space-y-6">
          {questions.map((q, index) => {
            const userAnswer = userAnswers[index] || [];
            const correctAnswerTexts = q.correctOptions.map(
              (opt) => q.options[opt.charCodeAt(0) - 65]
            );

            return (
              <li key={index} className="p-4 border rounded-md shadow-sm">
                <h3 className="text-lg font-medium mb-4">
                  Question {index + 1}: {q.question}
                </h3>
                <ul className="list-none space-y-2">
                  {q.options.map((option, optIndex) => {
                    const isCorrect = correctAnswerTexts.includes(option);
                    const isSelected = userAnswer.includes(option);

                    return (
                      <li
                        key={optIndex}
                        className={`p-2 rounded-md ${
                          isCorrect
                            ? "bg-green-100 text-green-800"
                            : isSelected
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100"
                        }`}
                      >
                        <strong>{String.fromCharCode(65 + optIndex)}. </strong>
                        {option}
                        {isCorrect && " (Correct)"}
                        {isSelected && " (Your Choice)"}
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-4">
                  <strong>Result:</strong>{" "}
                  {correctAnswerTexts.every((text) => userAnswer.includes(text)) &&
                  userAnswer.length === correctAnswerTexts.length ? (
                    <span className="text-green-600">✅ Correct</span>
                  ) : (
                    <span className="text-red-600">❌ Incorrect</span>
                  )}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
