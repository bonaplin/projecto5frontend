import React from "react";

const Modal = ({ open, onClose, children, title }) => {
  if (!open) return null;

  return (
    <>
      <div className="modal-overlay" />
      <div className="modal-content">
        <div className="header-profile">
          <h3 className="long-text">{title}</h3>
        </div>
        {children}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "transparent",
            border: "none",
            fontSize: "1.5em",
          }}
        >
          &times;
        </button>
      </div>
    </>
  );
};

export default Modal;
