import React from "react";
import { Modal, Button } from "react-bootstrap";

const Modals = ({ open, onClose, children, title }) => {
  if (!open) return null;

  return (
    <>
      <Modal show={open} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
      {/* <div className="modal-overlay" />
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
      </div> */}
    </>
  );
};

export default Modals;
