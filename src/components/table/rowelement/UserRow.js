import React from "react";
import Delete from "../../icon-buttons/delete.js";
import Edit from "../../icon-buttons/edit.js";
import DeleteTask from "../../icon-buttons/delete-tasks.js";
import "./Slider.css";
const UserRow = ({
  item,
  columns,
  handleEdit,
  handleDelete,
  handleDeleteTasks,
  handleActiveChange,
  handleUserClick,
}) => {
  let color = "";
  let fontcolor = "";

  if (!item.confirmed) {
    color = "#FFFF99"; // soft yellow
  } else if (!item.active) {
    color = "#595959";
    fontcolor = "white";
  } else {
    color = ""; // default color
  }

  //Stop propagation to prevent the row click event from being triggered.
  return (
    <tr
      style={{ backgroundColor: color, color: fontcolor }}
      onClick={() => handleUserClick(item.id, item.username)}
    >
      {columns.map((column) => (
        <td
          key={column}
          style={
            column === "role" ||
            column === "active" ||
            column === "actions" ||
            column === "confirmed" ||
            column === "photoURL"
              ? { textAlign: "center" }
              : {}
          }
        >
          {column === "photoURL" ? (
            <img
              src={item[column]}
              alt="User"
              style={{ width: "50px", height: "50px" }}
            />
          ) : column === "active" ? (
            <label className="switch" onClick={(e) => e.stopPropagation()}>
              <input
                type="checkbox"
                className="my-checkbox"
                checked={item[column]}
                onChange={(e) => {
                  e.stopPropagation();
                  handleActiveChange(item);
                }}
              />
              <span className="slider round"></span>
            </label>
          ) : column === "actions" ? (
            <>
              <Edit
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(item);
                }}
              >
                Edit
              </Edit>
              <Delete
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(item);
                }}
              >
                Delete
              </Delete>
              <DeleteTask
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTasks(item);
                }}
              >
                DTasks
              </DeleteTask>
            </>
          ) : (
            item[column]
          )}
        </td>
      ))}
    </tr>
  );
};

export default UserRow;
