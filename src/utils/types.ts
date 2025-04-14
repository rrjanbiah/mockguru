export type Question = {
  exam: string;
  section: string;
  subject: string;
  question: string;
  options: string[];
  correctOptions: string[]; // Array to support multi-choice answers
  explanation?: string;
  isMultipleChoice: boolean; // Add this property to indicate multi-choice questions
};
