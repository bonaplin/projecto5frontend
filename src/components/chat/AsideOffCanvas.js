import React from "react";
import { Offcanvas } from "react-bootstrap";
import ChatSideBar from "./ChatSideBar";

const AsideOffcanvas = ({ show, handleClose, user }) => {
  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton className="offcanvas-title">
        <Offcanvas.Title>
          Chat - <span className="user-span">{user}</span>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ChatSideBar onClose={handleClose} />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default AsideOffcanvas;
