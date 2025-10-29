import '@testing-library/jest-dom';
import { createContext } from 'react';
import { useQuestions } from './hooks/useQuestions';

const mockChangeLanguage = jest.fn();

jest.mock('@vercel/analytics/react', () => ({
    Analytics: () => null,
}));

jest.mock('@vercel/speed-insights/react', () => ({
    SpeedInsights: () => null,
}));

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

jest.mock('./utils/envVars', () => ({
    envVars: {
        API_URL: 'http://localhost:3000/api',
        FLUID_TENANT_ID: 'test-tenant-id',
        FLUID_TOKEN: 'test-token',
        FLUID_ENDPOINT: 'https://test-fluid-endpoint',
    },
}));

const mockQuestions = [
    { id: '1', value: 'Question 1', nullable: false, tips: ['Tip 1'] },
    { id: '2', value: 'Question 2', nullable: true, tips: ['Tip 2'] },
];
(useQuestions as jest.Mock).mockReturnValue(mockQuestions);

const mockFluidContext = createContext({});

jest.mock('./context/fluid-context', () => ({
    FluidContext: mockFluidContext
}));

jest.mock('lottie-react', () => ({
    __esModule: true,
    default: () => <div data-testid="lottie-mock" />,
}));

jest.mock('react-markdown', () => ({
    __esModule: true,
    default: ({ children }) => <div>{children}</div>,
}));

jest.mock('rehype-sanitize', () => ({}));

jest.mock('remark-gfm', () => ({}));

beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn();
});

export default {};