import { render, screen } from '@testing-library/react';
import { AnimatedBackground } from '.';

jest.mock('lottie-react', () => ({
    __esModule: true,
    default: () => <div data-testid="lottie-mock" />,
}));

describe('AnimatedBackground', () => {
    it('should render correctly', () => {
        render(<AnimatedBackground />);

        expect(screen.getByTestId('lottie-mock')).toBeInTheDocument();
    });
});
