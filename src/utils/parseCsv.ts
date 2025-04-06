import Papa from "papaparse";
import { Question } from "@/utils/types";

export function parseCsv(csvString: string): Question[] {
  const { data } = Papa.parse<Record<string, string>>(csvString, {
    header: true,
    skipEmptyLines: true,
  });

  return data
    .filter((row) => row.question && row.correct_option) // Ensure required fields are present
    .map((row) => ({
      exam: row.exam || "",
      section: row.section || "",
      subject: row.subject || "",
      question: row.question || "",
      options: [
        row.option_a || "",
        row.option_b || "",
        row.option_c || "",
        row.option_d || "",
      ].filter(Boolean),
      correctOptions: row.correct_option
        ? row.correct_option.split(",").map((opt) => opt.trim())
        : [],
      explanation: row.explanation || "",
      isMultipleChoice: row.correct_option?.includes(",") || false,
    }));
}
