import { Question } from "../../types";

export interface QuestionViewProps {
    question: Question;
    onSubmit: (question: Question) => void;
    answer: string;
    setAnswer: (value: string) => void;
}