import { Question } from "../../@types";

export interface QuestionViewProps {
    onSubmit: (question: Question) => void;
}