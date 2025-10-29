import { render, screen } from '@testing-library/react';
import * as useTranslationModule from 'react-i18next';
import { FluidContext } from '../../context/fluid-context';
import * as useQuestionsModule from '../../hooks/useQuestions';
import { MainPage } from './index';

describe('MainPage', () => {
    const mockUpdateSharedStory = jest.fn();
    const mockUpdateSharedLoading = jest.fn();

    beforeEach(() => {
        jest.spyOn(useTranslationModule, 'useTranslation').mockReturnValue({
            t: (key) => key,
            i18n: { language: 'en' },
        } as any);
        jest.spyOn(useQuestionsModule, 'useQuestions').mockReturnValue([
            { id: '1', value: 'Question 1', nullable: false, tips: ['Tip 1'] },
        ] as any);
    });

    it('should render Loading component when sharedStory.currentStep is undefined', () => {
        render(
            <FluidContext.Provider value={{
                sharedStory: { currentStep: undefined },
                updateSharedStory: mockUpdateSharedStory,
                sharedLoading: '',
                updateSharedLoading: mockUpdateSharedLoading,
            } as any}>
                <MainPage />
            </FluidContext.Provider>
        );
        expect(screen.getByText('Conectando à sessão...')).toBeInTheDocument();
    });

    it('should render Loading component when sharedLoading is true', () => {
        render(
            <FluidContext.Provider value={{
                sharedStory: { currentStep: 0 },
                updateSharedStory: mockUpdateSharedStory,
                sharedLoading: 'Loading story...',
                updateSharedLoading: mockUpdateSharedLoading,
            } as any}>
                <MainPage />
            </FluidContext.Provider>
        );
        expect(screen.getByText('Loading story...')).toBeInTheDocument();
    });

    it('should render QuestionView when no story is present', () => {
        render(
            <FluidContext.Provider value={{
                sharedStory: { currentStep: 0, story: '' },
                updateSharedStory: mockUpdateSharedStory,
                sharedLoading: '',
                updateSharedLoading: mockUpdateSharedLoading,
            } as any}>
                <MainPage />
            </FluidContext.Provider>
        );
        expect(screen.getByText('Question 1')).toBeInTheDocument(); // Assuming QuestionView renders the current question
    });

    it('should render StoryView when a story is present', () => {
        render(
            <FluidContext.Provider value={{
                sharedStory: { currentStep: 0, story: 'Once upon a time...' },
                updateSharedStory: mockUpdateSharedStory,
                sharedLoading: '',
                updateSharedLoading: mockUpdateSharedLoading,
            } as any}>
                <MainPage />
            </FluidContext.Provider>
        );
        expect(screen.getByText('Once upon a time...')).toBeInTheDocument();
    });
});