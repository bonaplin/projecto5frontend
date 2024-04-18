import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "./Task.css";
import { userStore } from "../../stores/UserStore";
import Delete from "../icon-buttons/delete";
import Edit from "../icon-buttons/edit";
import View from "../icon-buttons/view";

export default function Task({ task, index, handleDelete, handleEdit, handleView }) {
  const role = userStore.getState().role;
  const username = userStore.getState().username;

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

  return (
    <Draggable draggableId={`${task.id}`} key={`${task.id}`} index={index}>
      {(provided, snapshot) => (
        <div
          className={`task ${snapshot.isDragging ? "dragging" : ""}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="owner text">{task.owner && task.owner.length > 12 ? task.owner.substring(0, 12) + "..." : task.owner}</div>
          <div className="task-buttons" style={{ display: "block" }}>
            {role === "po" || username === task.owner || role === "sm" ? (
              <>
                <Edit onClick={() => handleEdit(task)} />
                <Delete onClick={() => handleDelete(task)} />
              </>
            ) : null}
            <View
              onClick={() => {
                handleView(task);
              }}
            />
          </div>
          <div className="category text">{task.category && task.category.length > 12 ? task.category.substring(0, 12) + "..." : task.category}</div>
          <div className="title">{task.title && task.title.length > 12 ? task.title.substring(0, 12) + "..." : task.title}</div>{" "}
          <div className="priority">
            <div className="circle" style={{ backgroundColor: getPriorityColor(task.priority) }}></div>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
}
