import { Question } from "@/utils/types";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm"; // Add support for GitHub-flavored markdown
import "katex/dist/katex.min.css";

export default function QuestionCard({
  question,
  currentQuestion = 0,
  totalQuestions = 1,
  onAnswer,
}: {
  question: Question;
  currentQuestion: number;
  totalQuestions: number;
  onAnswer?: (answer: string[]) => void;
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
      onAnswer(updatedOptions);
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
      <h2 className="font-medium mb-4">
        <ReactMarkdown
          rehypePlugins={[rehypeKatex]}
          remarkPlugins={[remarkMath, remarkGfm]} // Ensure both math and markdown plugins are included
        >
          {question.question}
        </ReactMarkdown>
      </h2>
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
              <ReactMarkdown
                rehypePlugins={[rehypeKatex]}
                remarkPlugins={[remarkMath, remarkGfm]}
              >
                {`${String.fromCharCode(65 + index)}. ${option}`}
              </ReactMarkdown>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
