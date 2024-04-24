import React from "react";
import Delete from "../../icon-buttons/delete.js";
import Edit from "../../icon-buttons/edit.js";
import DeleteTask from "../../icon-buttons/delete-tasks.js";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { userStore } from "../../../stores/UserStore.js";
import { Dropdown } from "react-bootstrap";
import "./Slider.css";
const UserRow = ({ item, columns, handleEdit, handleDelete, handleDeleteTasks, handleActiveChange, handleUserClick }) => {
  let color = "";
  let fontcolor = "";
  const role = userStore((state) => state.role);
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
    <tr style={{ backgroundColor: color, color: fontcolor }} onClick={() => handleUserClick(item.id, item.username)}>
      {columns.map((column) => (
        <td
          key={column}
          style={
            column === "role" || column === "active" || column === "actions" || column === "confirmed" || column === "photoURL"
              ? { textAlign: "center", alignContent: "center" }
              : {}
          }
        >
          {column === "photoURL" ? (
            <img src={item[column]} alt="User" style={{ width: "50px", height: "50px" }} />
          ) : column === "actions" ? (
            <Dropdown
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Dropdown.Toggle className="dots" id="dots-icon-task">
                <MoreVertIcon />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(item);
                  }}
                >
                  Edit
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item);
                  }}
                >
                  Delete
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTasks(item);
                  }}
                >
                  Delete Tasks
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : column === "active" && role === "po" ? (
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
          ) : (
            item[column]
          )}
        </td>
      ))}
    </tr>
  );
};

export default UserRow;
