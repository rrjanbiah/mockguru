import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import QuestionCard from "@/components/QuestionCard";
import Timer from "@/components/Timer";
import { Question } from "@/utils/types";
import "katex/dist/katex.min.css"; // Ensure KaTeX CSS is imported

type Config = {
  pagination: string;
  timer: boolean;
  timerDuration: number;
  shuffle: boolean;
};

export default function TestPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [config, setConfig] = useState<Config | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string[] }>({});

  useEffect(() => {
    const localData = localStorage.getItem("testData");
    if (localData) {
      const parsedData = JSON.parse(localData);
      setQuestions(parsedData.questions);
      setConfig(parsedData.config);
    } else {
      alert("No test data found. Redirecting to home.");
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    const savedAnswers = localStorage.getItem("userAnswers");
    if (savedAnswers) {
      setUserAnswers(JSON.parse(savedAnswers)); // Load saved answers
    }
  }, []);

  const handleAnswer = (questionIndex: number, answer: string[]) => {
    const updatedAnswers = { ...userAnswers, [questionIndex]: answer };
    setUserAnswers(updatedAnswers);
    localStorage.setItem("userAnswers", JSON.stringify(updatedAnswers)); // Persist answers
  };

  const handleTimerEnd = () => {
    // Save the test result and navigate to the result page
    localStorage.setItem("testResult", JSON.stringify({ questions, userAnswers }));
    router.push("/result");
  };

  const renderQuestions = () => {
    if (!config || questions.length === 0) return null;

    const paginationMode = config.pagination;
    let displayedQuestions: Question[] = [];

    if (paginationMode === "1/question") {
      displayedQuestions = [questions[currentPage]];
    } else if (paginationMode === "5/group") {
      displayedQuestions = questions.slice(currentPage * 5, currentPage * 5 + 5);
    } else if (paginationMode === "10/group") {
      displayedQuestions = questions.slice(currentPage * 10, currentPage * 10 + 10);
    } else if (paginationMode === "section-wise") {
      const sections = Array.from(new Set(questions.map((q) => q.section)));
      const sectionQuestions = questions.filter(
        (q) => q.section === sections[currentPage]
      );
      displayedQuestions = sectionQuestions;
    }

    return displayedQuestions.map((question, index) => (
      <QuestionCard
        key={index}
        question={question}
        currentQuestion={currentPage + index}
        totalQuestions={questions.length}
        onAnswer={(answer) => handleAnswer(currentPage + index, answer)}
      />
    ));
  };

  const handleNext = () => {
    const isLastQuestion =
      config?.pagination === "1/question" && currentPage >= questions.length - 1;

    const isLastGroup =
      (config?.pagination === "5/group" &&
        currentPage >= Math.ceil(questions.length / 5) - 1) ||
      (config?.pagination === "10/group" &&
        currentPage >= Math.ceil(questions.length / 10) - 1);

    const isLastSection =
      config?.pagination === "section-wise" &&
      currentPage >= new Set(questions.map((q) => q.section)).size - 1;

    if (isLastQuestion || isLastGroup || isLastSection) {
      // Navigate to the result page after the last question or group
      localStorage.setItem("testResult", JSON.stringify({ questions, userAnswers }));
      router.push("/result");
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="min-h-screen flex flex-col">
      {config?.timer && (
        <div className="sticky top-0 bg-white shadow-md z-10">
          <Timer duration={config.timerDuration} onTimerEnd={handleTimerEnd} /> {/* Use timerDuration from config */}
        </div>
      )}
      <div className="flex-1 p-8">{renderQuestions()}</div>
      <div className="flex justify-between p-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded-md"
          onClick={handlePrevious}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}
