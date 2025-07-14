import { Translation } from '../translation';
import { StepperProps } from './types';
import './styles.scss';

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