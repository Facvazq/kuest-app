export interface Form {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
  theme: 'light' | 'dark' | 'default' | 'electric' | 'warm' | 'royal';
  accentColor: string;
  backgroundStyle: 'solid' | 'gradient' | 'pattern';
  backgroundColor?: string;
  mode: 'standard' | 'questionnaire';
  passingMark?: number; // Percentage required to pass (e.g., 70 for 70%)
}

export interface Question {
  id: string;
  type: 'text' | 'paragraph' | 'multiple-choice' | 'checkbox' | 'rating';
  title: string;
  emoji?: string;
  required: boolean;
  helpText?: string;
  accentColor?: string;
  options?: string[]; // For multiple choice and checkbox questions
  ratingScale?: number; // For rating questions (1-10)
  correctAnswer?: string | string[]; // For questionnaire mode - can be single or multiple correct answers
  points?: number; // Points for this question in questionnaire mode
}

export interface FormResponse {
  id: string;
  formId: string;
  responses: Record<string, string | string[]>;
  submittedAt: string;
  studentName?: string; // For questionnaire mode
  preliminaryScore?: number; // Auto-calculated score
  finalScore?: number; // Teacher-adjusted score
  maxScore?: number; // Total possible points
}

export interface QuestionComponentProps {
  question: Question;
  value?: string | string[];
  onChange: (value: string | string[]) => void;
  disabled?: boolean;
  themeStyles?: {
    text: string;
    textSecondary: string;
    input: string;
    accent: string;
    button: string;
    border: string;
  };
}
