import { useState } from "react";
import { useRouter } from "next/router";
import ConfigForm from "@/components/ConfigForm";
import { parseCsv } from "@/utils/parseCsv";
import { Question } from "@/utils/types";

type Config = {
  pagination: string;
  timer: boolean;
  timerDuration: number; // Match ConfigForm
  shuffle: boolean;
};

export default function IndexPage() {
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

    // Clear previous session data
    localStorage.removeItem("userAnswers");
    localStorage.removeItem("testResult");

    const payload = {
      questions,
      config,
    };
    const encodedPayload = encodeURIComponent(JSON.stringify(payload));
    router.push(`/test?data=${encodedPayload}`);
  };

  return (
    <div className="min-h-screen p-8 flex flex-col gap-8">
      <h1 className="text-2xl font-bold">Mock Test Configuration</h1>
      <textarea
        className="w-full h-40 p-4 border rounded-md"
        placeholder="Paste your CSV of questions here. Ensure it follows the required format."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={handleParse}
      >
        Parse Questions
      </button>
      {questions.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mt-4">Parsed Questions</h2>
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
          </ul>
          <ConfigForm onSubmit={handleSubmit} />
        </div>
      )}
    </div>
  );
}
