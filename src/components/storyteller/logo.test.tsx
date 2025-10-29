import { render, screen } from '@testing-library/react';
import { Logo } from './logo';

describe('Logo', () => {
    it('should render the logo with the correct text and icon', () => {
        render(<Logo />);
        expect(screen.getByTestId('fa-feather-alt-icon')).toBeInTheDocument();
    });
});
