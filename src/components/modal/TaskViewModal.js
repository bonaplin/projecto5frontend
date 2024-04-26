import React from "react";
import Modal from "./Modal";
import { useTranslation } from "react-i18next";
// import moment from "moment"; // Import moment.js for date calculations

const TaskViewModal = ({ open, onClose, task }) => {
  const { t } = useTranslation();
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

  const description = t("Description");
  const category = t("Category");
  const owner = t("Owner");
  const startDate = t("Start Date");
  const endDate = t("End Date");

  return (
    <Modal open={open} onClose={onClose} title={task.title}>
      <div className="task-card">
        <div className="priority-line" style={{ backgroundColor: getPriorityColor(task.priority) }}></div>
        <div className="task-detail">
          <div className="task-detail-label">{description}:</div>
          <div className="text-content">{task.description}</div>
        </div>
        <div className="task-detail">
          <div className="task-detail-label">{category}:</div>
          <div className="text-content">{task.category}</div>
        </div>
        <div className="task-detail">
          <div className="task-detail-label">{owner}:</div>
          <div className="">{task.owner}</div>
        </div>
        <div className="task-detail">
          <div className="task-detail-label">{startDate}:</div>
          <div className="date">{task.initialDate}</div>
        </div>
        <div className="task-detail">
          <div className="task-detail-label">{endDate}:</div>
          <div className="date">{task.finalDate}</div>
        </div>
      </div>
    </Modal>
  );
};

export default TaskViewModal;
