import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./en.json";
import translationFR from "./fr.json";
import translationNL from "./nl.json";

const options = {
  fallbackLng: "fr",
  supportedLngs: ["en", "fr", "nl"],
  resources: {
    en: {
      translation: translationEN,
    },
    fr: {
      translation: translationFR,
    },
    nl: {
      translation: translationNL,
    },
  },
  keySeparator: ".",
};

// Initialisez i18n
i18n.use(initReactI18next).init(options);

export default i18n;
