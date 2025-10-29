import { render, screen, fireEvent } from '@testing-library/react';
import { FluidContext } from '../../context/fluid-context';
import { QuestionView } from './index';

describe('QuestionView', () => {
    const onSubmit = jest.fn();
    const updateSharedStory = jest.fn();

    const renderComponent = (sharedStory) => {
        return render(
            <FluidContext.Provider value={{ sharedStory, updateSharedStory, containerId: 'test-container' } as any}>
                <QuestionView onSubmit={onSubmit} />
            </FluidContext.Provider>
        );
    };

    it('should render correctly', () => {
        renderComponent({ currentStep: 0, currentAnswer: '' });

        expect(screen.getByText('Question 1')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('questionPlaceholder')).toBeInTheDocument();
        expect(screen.getByText('questionNext')).toBeInTheDocument();
        expect(screen.getByText('Tip 1')).toBeInTheDocument();
    });

    it('should prevent submitting empty answer', () => {
        renderComponent({ currentStep: 0, currentAnswer: '' });

        const nextButton = screen.getByText('questionNext');
        fireEvent.click(nextButton);
        expect(onSubmit).not.toHaveBeenCalled();
        expect(window.alert).toHaveBeenCalledWith('questionEmptyAnswer');
    });

    it('should pass the step when submitted valid answer', () => {
        renderComponent({ currentStep: 0, currentAnswer: 'My answer' });

        const nextButton = screen.getByText('questionNext');
        fireEvent.click(nextButton);
        expect(onSubmit).toHaveBeenCalledWith({ id: '1', value: 'Question 1', nullable: false, tips: ['Tip 1'], answer: 'My answer' });
    });
    
    it('should copy share URL to clipboard', () => {
        const writeText = jest.fn();
        Object.assign(navigator, {
            clipboard: {
                writeText,
            },
        });
        renderComponent({ currentStep: 0, currentAnswer: '' });

        const shareButton = screen.getByTitle('sessionShare');
        fireEvent.click(shareButton);

        expect(writeText).toHaveBeenCalledWith('http://localhost/?session=test-container');
        expect(window.alert).toHaveBeenCalledWith('sessionCopy');
    });
});