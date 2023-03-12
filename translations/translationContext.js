import React, { createContext, useState } from "react";
import { locale } from "expo-localization";
import { I18n } from "i18n-js";
import { IT } from "./italian";
import { EN } from "./english";
import { DE } from "./german";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState("en");

  const changeLocale = (newLocale) => {
    setLocale(newLocale);
  };

  const lang = {
    en: EN,
    it: IT,
    de: DE,
  };

  const i18n = new I18n(lang);

  i18n.locale = locale;

  i18n.enableFallback = true;

  return (
    <LanguageContext.Provider value={{ locale, changeLocale, i18n }}>
      {children}
    </LanguageContext.Provider>
  );
};
