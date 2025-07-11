import 'react-i18next';
import translationEN from './assets/translations/en.json';

declare module 'react-i18next' {
    interface Resources {
        translation: typeof translationEN;
    }
}
