import { FillableAnswerGroup } from '../../@types';

export interface SharedStory {
    currentAnswer: string;
    currentStep: number;
    story: string;
    answers?: FillableAnswerGroup;
}