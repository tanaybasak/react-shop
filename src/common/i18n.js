import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: 'en',
		debug: true,
		// can have multiple namespaces, incase you want to define huge translations into smaller pieces
		// and load them on demand
		ns: ['common', 'home', 'profile'],
		interpolation: {
			escapeValue: false,
			formatSeparator: ',',
		},
		react: {
			wait: true,
		},
		backend: {
			// translation file path
			loadPath: '/assets/i18n/{{ns}}/{{lng}}.json',
		},
	});

export default i18n;
