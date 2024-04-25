import React from "react";
import { userStore } from "../../../stores/UserStore.js";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { Dropdown } from "react-bootstrap";
const Row = ({ item, columns, handleEdit, handleDelete, type }) => {
  const role = userStore.getState().role; // Get the role from the store
  return (
    <tr>
      {columns.map((column) => (
        <td key={column} style={column === "actions" ? { textAlign: "center" } : {}}>
          {column === "actions" ? (
            <>
              <Dropdown>
                <Dropdown.Toggle className="dots" id="dots-icon-task">
                  <MoreVertIcon />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {type === "category" && role !== "sm" && <Dropdown.Item onClick={() => handleEdit(item)}>Edit</Dropdown.Item>}
                  {type === "deleted_tasks" && (role === "sm" || role === "po") && <Dropdown.Item onClick={() => handleEdit(item)}>Restore</Dropdown.Item>}
                  {role !== "sm" && <Dropdown.Item onClick={() => handleDelete(item)}>Delete</Dropdown.Item>}
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : (
            item[column]
          )}
        </td>
      ))}
    </tr>
  );
};

export default Row;
