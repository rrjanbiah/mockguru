export type Question = {
  exam: string;
  section: string;
  subject: string;
  question: string;
  options: string[];
  correctOptions: string[];
  explanation: string;
  isMultipleChoice: boolean;
};
