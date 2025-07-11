import { StepperProps } from "./types";
import "./styles.scss";
import { Translation } from "../translation";

export const Stepper = ({ currentStep, totalSteps }: StepperProps) => (
  <div className="stepper">
    <span>
      <Translation
        id="questionCounter"
        values={{ count: currentStep + 1, totalCount: totalSteps }}
      />
    </span>
  </div>
);