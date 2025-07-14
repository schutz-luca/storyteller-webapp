import { useTranslation } from 'react-i18next';
import brLogo from '../../assets/flags/br.svg';
import usFlag from '../../assets/flags/us.svg';
import { Translation } from '../translation';
import './styles.scss';

export const LangButton = () => {
    const { i18n: { language, changeLanguage } } = useTranslation();

    const languageIcons = {
        pt: brLogo,
        'pt-BR': brLogo,
        en: usFlag,
        'en-US': usFlag,
        default: usFlag
    };

    return (
        <div className="lang-button">
            <button className="current-lang"><img src={languageIcons[language] || languageIcons.default} /></button>
            <div className="lang-options">
                <span onClick={() => changeLanguage('pt')}>
                    <Translation id="portuguese" />
                </span>
                <span onClick={() => changeLanguage('en')}>
                    <Translation id="english" />
                </span>
            </div>

        </div>
    );
};