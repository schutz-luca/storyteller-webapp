
import { render, screen } from '@testing-library/react';
import { QuestionView } from '.';

describe('QuestionView', () => {
    const onSubmit = jest.fn();

    render(<QuestionView onSubmit={onSubmit} />);

    screen.debug();

    const textarea = screen.getByRole('textbox', { hidden: true });
    const nextButton = screen.getByRole('button', { name: /questionNext/i, hidden: true });

    it('should render correctly', () => {
        expect(textarea).toBeInTheDocument();
        expect(nextButton).toBeInTheDocument();
        expect(screen.getByText('questionCounter')).toBeInTheDocument();
        expect(screen.getByTestId('stepper')).toBeInTheDocument();
        expect(screen.getByTestId('carousel')).toBeInTheDocument();
        expect(screen.getByTitle('sessionShare')).toBeInTheDocument();
        expect(screen.getByText('questionExamplesLabel')).toBeInTheDocument();
        expect(screen.getByText('questionNext')).toBeInTheDocument();
    });


    it('should prevent submitting empty answer', () => {
        // To be implemented
    });

    it('should pass the step when submitted valid answer', () => {
        // To be implemented
    });

    it('should copy share URL to clipboard', () => {
        // To be implemented
    });
});