import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
const Modals = ({ open, onClose, children, title }) => {
  const { t } = useTranslation();
  if (!open) return null;

  return (
    <>
      <Modal show={open} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
};

export default Modals;
