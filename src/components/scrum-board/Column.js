import React from "react";
import { Droppable } from "react-beautiful-dnd";
import "./Column.css";
import Task from "./Task";

export default function Column({ title, tasks = [], id, handleDelete, handleEdit, handleView }) {
  return (
    <div className="task-column">
      <div className="title-column">
        <h4>{title}</h4>
        <div className="tasks-number">{tasks.length}</div>
      </div>
      <Droppable droppableId={id} transitionDuration={100}>
        {(provided, snapshot) => (
          <div className={`container-tasks ${snapshot.isDraggingOver ? "dragging-over" : ""}`} ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} handleDelete={handleDelete} handleEdit={handleEdit} handleView={handleView} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
