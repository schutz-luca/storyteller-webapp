import { StepperProps } from "./types";

export const Stepper = ({ currentStep, totalSteps }: StepperProps) => (
    <div className="stepper">
      <span>{`${currentStep + 1}/${totalSteps}`}</span>
    </div>
  );