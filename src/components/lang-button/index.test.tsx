import { render, screen, fireEvent } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import { LangButton } from './index';

describe('LangButton', () => {

    it('should render correctly', () => {
        render(<LangButton />);

        expect(screen.getByText('portuguese')).toBeInTheDocument();
        expect(screen.getByText('english')).toBeInTheDocument();
    });

    it('should call changeLanguage with "pt" when portuguese is clicked', () => {
        const { i18n: { changeLanguage } } = useTranslation();
        render(<LangButton />);
        
        fireEvent.click(screen.getByText('portuguese'));

        expect(changeLanguage).toHaveBeenCalledWith('pt');
    });

    it('should call changeLanguage with "en" when english is clicked', () => {
        const { i18n: { changeLanguage } } = useTranslation();
        render(<LangButton />);
        
        fireEvent.click(screen.getByText('english'));

        expect(changeLanguage).toHaveBeenCalledWith('en');
    });
});
