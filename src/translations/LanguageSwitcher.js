import React from "react";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { userStore } from "../stores/UserStore";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const { locale, updateLocale } = userStore();

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "pt", label: "Português" },
    { value: "es", label: "Español" },
    { value: "fr", label: "Français" },
  ];

  const changeLanguage = (option) => {
    i18n.changeLanguage(option.value);
    updateLocale(option.value);
  };

  return <Select defaultValue={languageOptions.find((opt) => opt.value === locale)} options={languageOptions} onChange={changeLanguage} />;
}

export default LanguageSwitcher;
