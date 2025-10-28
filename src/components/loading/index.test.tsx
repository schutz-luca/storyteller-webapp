import { render, screen } from '@testing-library/react';
import { Loading } from '.';

jest.mock('lottie-react', () => ({
    __esModule: true,
    default: () => <div data-testid="lottie-mock" />,
}));

describe('Loading', () => {
    it('should render correctly with the given text', () => {
        const text = 'Loading...';
        render(<Loading text={text} />);

        expect(screen.getByTestId('lottie-mock')).toBeInTheDocument();
        expect(screen.getByText(text)).toBeInTheDocument();
    });
});
