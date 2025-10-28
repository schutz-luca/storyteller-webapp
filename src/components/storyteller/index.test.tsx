import { render, screen } from '@testing-library/react';
import { StorytellerBanner } from '.';

jest.mock('react-icons/fa', () => ({
    FaFeatherAlt: () => <i data-testid="fa-feather-alt" />,
}));

describe('StorytellerBanner', () => {
    it('should render the logo with beta span', () => {
        render(<StorytellerBanner />);

        expect(screen.getByText('Storyteller')).toBeInTheDocument();
        expect(screen.getByText('BETA')).toBeInTheDocument();
        expect(screen.getByTestId('fa-feather-alt')).toBeInTheDocument();
    });
});
