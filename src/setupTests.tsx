import '@testing-library/jest-dom';
import { createContext } from 'react';
import { useQuestions } from './hooks/useQuestions';

const mockChangeLanguage = jest.fn();

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key, // returns the key for predictable tests
        i18n: {
            changeLanguage: mockChangeLanguage,
        },
    }),
}));

jest.mock('./components/translation', () => ({
    Translation: ({ id }: { id: string }) => <>{id}</>,
}));

jest.mock('./hooks/useQuestions');

const mockedQuestions = [
    { id: '1', value: 'Question 1', nullable: false, tips: ['Tip 1'] },
    { id: '2', value: 'Question 2', nullable: true, tips: ['Tip 2'] },
];
(useQuestions as jest.Mock).mockReturnValue(mockedQuestions);

const mockedFluidContext = createContext({});

jest.mock('./context/fluid-context', () => ({
    FluidContext: mockedFluidContext
}));

beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn();
});

export default {};