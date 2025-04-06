import { Question } from "@/utils/types";
import { useState } from "react";

export default function QuestionCard({
  question,
  currentQuestion = 0, // Default to 0 if not provided
  totalQuestions = 1, // Default to 1 if not provided
  onAnswer,
}: {
  question: Question;
  currentQuestion: number; // 0-based index
  totalQuestions: number;
  onAnswer?: (answer: string[]) => void; // Make onAnswer optional
}) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionChange = (option: string) => {
    let updatedOptions = selectedOptions;

    if (question.isMultipleChoice) {
      updatedOptions = selectedOptions.includes(option)
        ? selectedOptions.filter((o) => o !== option)
        : [...selectedOptions, option];
    } else {
      updatedOptions = [option];
    }

    setSelectedOptions(updatedOptions);
    if (onAnswer) {
      onAnswer(updatedOptions); // Call onAnswer only if it exists
    }
  };

  return (
    <div className="p-4 border rounded-md shadow-sm">
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">
            Question {currentQuestion + 1} of {totalQuestions}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{
              width: `${((currentQuestion + 1) / totalQuestions) * 100}%`,
            }}
          ></div>
        </div>
      </div>
      <h2 className="font-medium mb-4">{question.question}</h2>
      <ul className="list-none">
        {question.options.map((option, index) => (
          <li key={index} className="mb-2">
            <label className="flex items-center gap-2">
              <input
                type={question.isMultipleChoice ? "checkbox" : "radio"}
                name={`question-${question.question}`}
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={() => handleOptionChange(option)}
              />
              <strong>{String.fromCharCode(65 + index)}. </strong>
              {option}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
