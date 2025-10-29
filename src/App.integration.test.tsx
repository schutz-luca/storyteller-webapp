
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import App from './App';
import { FluidContext } from './context/fluid-context';
import { FluidContextData } from './context/fluid-context/types';
import { StateSetter } from './@types/common';

describe('App Integration', () => {
    it('should allow a user to start the process, answer a question, and move to the next step', async () => {
        let mockContext: FluidContextData = {
            sharedLoading: '',
            updateSharedLoading: (value: string) => {
                mockContext.sharedLoading = value;
            },
            sharedStory: { currentStep: 0, story: '', currentAnswer: '' },
            updateSharedStory: (newStoryState) => mockContext.sharedStory = { ...mockContext.sharedStory, ...newStoryState },
            containerId: 'test-container',
            isNewSession: true,
            setIsNewSession: ((value: boolean) => {
                mockContext.isNewSession = value;
            }) as StateSetter<boolean>,
        };

        const { rerender } = render(
            <FluidContext.Provider value={mockContext}>
                <App />
            </FluidContext.Provider>
        );

        // 1. User is on the Intro Page and clicks "Ready"
        const readyButton = screen.getByText('introReadyButton');
        fireEvent.click(readyButton);

        rerender(
            <FluidContext.Provider value={mockContext}>
                <App />
            </FluidContext.Provider>
        );

        // 2. User sees the first question
        expect(screen.getByText('Question 1')).toBeInTheDocument();
        const answerInput = screen.getByPlaceholderText('questionPlaceholder');
        const nextButton = screen.getByText('questionNext');

        // 3. User types an answer
        fireEvent.change(answerInput, { target: { value: 'A brave knight' } });

        rerender(
            <FluidContext.Provider value={mockContext}>
                <App />
            </FluidContext.Provider>
        );

        // 4. User clicks "Next" to go to the next question
        await act(async () => {
            fireEvent.click(nextButton);
        });

        // 5. User sees the second question
        await waitFor(() => expect(screen.getByText('Question 2')).toBeInTheDocument());
    });
});
