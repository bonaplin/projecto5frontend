import React from "react";
import CloseIcon from "@mui/icons-material/Close";
const DeleteTasks = ({ onClick }) => (
  <button
    className="icon-delete-tasks tasks-button"
    onClick={onClick}
    title="Delete tasks"
  >
    <CloseIcon />
  </button>
);

export default DeleteTasks;
