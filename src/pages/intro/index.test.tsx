import { render, screen } from '@testing-library/react';
import { IntroPage } from './index';

describe('Intro Page', () => {
    it('should render correctly', () => {
        render(<IntroPage />);
        expect(screen.getByText('Storyteller')).toBeInTheDocument();
        expect(screen.getByText('BETA')).toBeInTheDocument();
        expect(screen.getByText('introReadyButton')).toBeInTheDocument();
    });
});
