import { StepperProps } from "./types";
import "./styles.scss";

export const Stepper = ({ currentStep, totalSteps }: StepperProps) => (
  <div className="stepper">
    <span>Questão {`${currentStep + 1} de ${totalSteps}`}</span>
  </div>
);