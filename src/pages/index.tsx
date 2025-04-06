import { useState } from "react";
import { useRouter } from "next/router";
import ConfigForm from "@/components/ConfigForm";
import { parseCsv } from "@/utils/parseCsv";
import { Question } from "@/utils/types";

type Config = {
  pagination: string;
  timer: boolean;
  showAnswers: string;
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
    } catch {
      alert("Invalid CSV format. Please check your input.");
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
        placeholder="Paste your CSV or markdown-style MCQs here..."
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
        <ConfigForm onSubmit={handleSubmit} />
      )}
    </div>
  );
}
