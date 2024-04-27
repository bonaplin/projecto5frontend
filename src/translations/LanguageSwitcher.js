import React from "react";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { userStore } from "../stores/UserStore";
import { Dropdown } from "react-bootstrap";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const { locale, updateLocale } = userStore();

  const languageOptions = [
    { value: "en", label: "en" },
    { value: "pt", label: "pt" },
    { value: "es", label: "es" },
    { value: "fr", label: "fr" },
  ];

  const changeLanguage = (option) => {
    i18n.changeLanguage(option.value);
    updateLocale(option.value);
  };

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          {locale}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {languageOptions.map((option) => (
            <Dropdown.Item key={option.value} onClick={() => changeLanguage(option)}>
              {option.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default LanguageSwitcher;
