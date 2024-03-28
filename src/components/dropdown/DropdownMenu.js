// DropdownMenu.js
import React from "react";
import "./DropdownMenu.css";

const DropdownMenu = ({ isOpen, children, side }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={side}>
      <ul>{children}</ul>
    </div>
  );
};

export default DropdownMenu;
