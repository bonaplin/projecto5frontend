import React from "react";
import Modal from "./Modal";
import { useTranslation } from "react-i18next";
function ModalYesNo({ open, onClose, title, message, onYes, onNo }) {
  const { t } = useTranslation();
  return (
    <Modal open={open} onClose={onClose} title={title} center>
      <p>{message}</p>
      <div className="button-container">
        <button className="yes-no yes" onClick={onYes}>
          {t("Yes")}
        </button>
        <button className="yes-no no" onClick={onNo}>
          {t("No")}
        </button>
      </div>
    </Modal>
  );
}
export default ModalYesNo;
