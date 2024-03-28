import React from "react";
import Delete from "../../icon-buttons/delete.js";
import Edit from "../../icon-buttons/edit.js";
import Restore from "../../icon-buttons/restore.js";
import DeleteTask from "../../icon-buttons/delete-tasks.js";
import CloseIcon from "@mui/icons-material/Close";
import "./Slider.css";
const UserRow = ({
  item,
  columns,
  handleEdit,
  handleDelete,
  handleDeleteTasks,
  handleActiveChange,
}) => {
  // Define the keys in the order you want them to be displayed

  return (
    <tr>
      {columns.map((column) => (
        <td
          key={column}
          style={
            column === "role" ||
            column === "active" ||
            column === "actions" ||
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
            <label className="switch">
              <input
                type="checkbox"
                className="my-checkbox"
                checked={item[column]}
                onChange={() => handleActiveChange(item)}
              />
              <span className="slider round"></span>
            </label>
          ) : column === "actions" ? (
            <>
              <Edit onClick={() => handleEdit(item)}>Edit</Edit>
              <Delete onClick={() => handleDelete(item)}>Delete</Delete>
              <DeleteTask onClick={() => handleDeleteTasks(item)}>
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
