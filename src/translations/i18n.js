import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import pt from "./pt.json";
import fr from "./fr.json";
import es from "./es.json";

i18n.use(initReactI18next).init({
  resources: {
    en,
    pt,
    fr,
    es,
  },
  lng: "en",
  fallbackLng: "en",
  ns: ["translations"],
  defaultNS: "translations",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ",",
  },
  react: {
    wait: true,
  },
});

export default i18n;
