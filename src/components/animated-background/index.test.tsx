import { render, screen } from '@testing-library/react';
import { AnimatedBackground } from '.';

describe('AnimatedBackground', () => {
    it('should render correctly', () => {
        render(<AnimatedBackground />);

        expect(screen.getByTestId('lottie-mock')).toBeInTheDocument();
    });
});
