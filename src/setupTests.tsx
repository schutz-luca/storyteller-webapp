import '@testing-library/jest-dom';
import { createContext } from 'react';
import { FluidContextData } from './context/fluid-context/types';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key, // returns the key for predictable tests
        i18n: {
            changeLanguage: jest.fn(),
        },
    }),
}));

jest.mock('./components/translation', () => ({
    Translation: ({ id }: { id: string }) => <>{id}</>,
}));

const mockedFluidContext = createContext({
    containerId: 'test-container-id',
    sharedStory: {
        currentStep: 0,
        currentAnswer: '',
        story: '',
    },
    updateSharedStory: jest.fn(),
    sharedLoading: '',
    updateSharedLoading: jest.fn(),
    isNewSession: false,
    setIsNewSession: jest.fn(),
} as FluidContextData);

jest.mock('./context/fluid-context', () => ({
    FluidContext: mockedFluidContext
}));

export default {};