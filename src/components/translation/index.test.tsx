import { render, screen } from '@testing-library/react';
import { Translation } from './index';

jest.unmock('./index');

jest.mock('react-i18next', () => ({
    ...jest.requireActual('react-i18next'),
    useTranslation: () => ({
        t: (key: string) => key, // returns the key for predictable tests
    }),
    Trans: ({ i18nKey }) => <>{i18nKey}</>
}));

describe('Translation', () => {
    it('should render the id', () => {
        const id = 'test-id';
        render(<Translation id={id} />);
        expect(screen.getByText(id)).toBeInTheDocument();
    });
});
