import i18next from "i18next";
import BrowserLanguageDetector from "i18next-browser-languagedetector";

import { en } from "./en";
import { ja } from "./ja";

i18next.use(BrowserLanguageDetector).init({
  fallbackLng: "en",
  debug: true,
  resources: {
    en: {
      translation: en,
    },
    ja: {
      translation: ja,
    },
  },
  function(err, t) {
    // init set Content
    if (err) {
      console.log(err);
    }
    updateContent();
  },
});

function updateContent() {
  console.log(`detected user language: "${i18next.language}"`);
}

i18next.on("languageChanged", () => {
  updateContent();
});

export function changeLng(lng) {
  i18next.changeLanguage(lng);
}
