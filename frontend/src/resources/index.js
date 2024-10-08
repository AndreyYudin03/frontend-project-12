import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ru from './languages/ru.js';

const resources = {
  ru,
};

const initializeI18n = () => {
  i18n.use(initReactI18next).init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });
};

export default initializeI18n;
