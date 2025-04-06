import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import QuestionCard from "@/components/QuestionCard";
import Timer from "@/components/Timer";
import { Question } from "@/utils/types";

type Config = {
  pagination: string;
  timer: boolean;
  showAnswers: string;
  shuffle: boolean;
};

export default function TestPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [config, setConfig] = useState<Config | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const queryData = router.query.data;
    if (queryData) {
      const decodedData = JSON.parse(decodeURIComponent(queryData as string));
      setQuestions(decodedData.questions);
      setConfig(decodedData.config);
    } else {
      const localData = localStorage.getItem("testData");
      if (localData) {
        const parsedData = JSON.parse(localData);
        setQuestions(parsedData.questions);
        setConfig(parsedData.config);
      } else {
        alert("No test data found. Redirecting to home.");
        router.push("/");
      }
    }
  }, [router]);

  const handleAnswer = (questionIndex: number, answer: string[]) => {
    setUserAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
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
        onAnswer={(answer) => handleAnswer(currentPage + index, answer)}
      />
    ));
  };

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="min-h-screen flex flex-col">
      {config?.timer && (
        <div className="sticky top-0 bg-white shadow-md z-10">
          <Timer />
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
          disabled={
            config?.pagination === "1/question" && currentPage >= questions.length - 1
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}
