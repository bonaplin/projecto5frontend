import React from "react";
import Modal from "./Modal";

// import moment from "moment"; // Import moment.js for date calculations

const TaskViewModal = ({ open, onClose, task }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 100:
        return "green";
      case 200:
        return "yellow";
      case 300:
        return "red";
      default:
        return "gray";
    }
  };

  // const timeLeft = moment(task.finalDate).fromNow();

  return (
    <Modal open={open} onClose={onClose} title={task.title}>
      <div className="task-card">
        <div
          className="priority-line"
          style={{ backgroundColor: getPriorityColor(task.priority) }}
        ></div>
        <div className="task-detail">
          <div className="task-detail-label">Description:</div>
          <div className="text-content">{task.description}</div>
        </div>
        <div className="task-detail">
          <div className="task-detail-label">Category:</div>
          <div className="text-content">{task.category}</div>
        </div>
        <div className="task-detail">
          <div className="task-detail-label">Owner:</div>
          <div className="">{task.owner}</div>
        </div>
        <div className="task-detail">
          <div className="task-detail-label">Start Date:</div>
          <div className="date">{task.initialDate}</div>
        </div>
        <div className="task-detail">
          <div className="task-detail-label">End Date:</div>
          <div className="date">{task.finalDate}</div>
        </div>
      </div>
    </Modal>
  );
};

export default TaskViewModal;
