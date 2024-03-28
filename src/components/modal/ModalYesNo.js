import React from "react";
import Modal from "./Modal";

function ModalYesNo({ open, onClose, title, message, onYes, onNo }) {
  return (
    <Modal open={open} onClose={onClose} title={title} center>
      <p>{message}</p>
      <div className="button-container">
        <button className="yes-no yes" onClick={onYes}>
          Yes
        </button>
        <button className="yes-no no" onClick={onNo}>
          No
        </button>
      </div>
    </Modal>
  );
}
export default ModalYesNo;
