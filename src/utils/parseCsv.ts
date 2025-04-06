import Papa from "papaparse";
import { Question } from "@/utils/types";

// Define a type for the CSV row structure
type CsvRow = {
  exam: string;
  section: string;
  subject: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  explanation: string;
};

export function parseCsv(input: string): Question[] {
  const parsed = Papa.parse<CsvRow>(input, { header: true, skipEmptyLines: true });

  if (parsed.errors.length > 0) {
    throw new Error("Error parsing CSV: " + parsed.errors[0].message);
  }

  return parsed.data.map((row) => {
    const options = [
      row.option_a?.trim(),
      row.option_b?.trim(),
      row.option_c?.trim(),
      row.option_d?.trim(),
    ].filter(Boolean); // Ensure no undefined or empty options

    return {
      exam: row.exam?.trim() || "General",
      question: row.question?.trim() || "",
      options,
      correctOptions: [row.correct_option?.trim()],
      explanation: row.explanation?.trim() || "",
      section: row.section?.trim() || "General",
      subject: row.subject?.trim() || "General",
      isMultipleChoice: false, // Default to false; update logic if needed
    };
  });
}
