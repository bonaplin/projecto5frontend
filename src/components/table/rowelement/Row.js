import React from "react";
import { userStore } from "../../../stores/UserStore.js";
import Delete from "../../icon-buttons/delete.js";
import Edit from "../../icon-buttons/edit.js";
import Restore from "../../icon-buttons/restore.js";
const Row = ({ item, columns, handleEdit, handleDelete, type }) => {
  const role = userStore.getState().role; // Get the role from the store
  return (
    <tr>
      {columns.map((column) => (
        <td
          key={column}
          style={column === "actions" ? { textAlign: "center" } : {}}
        >
          {column === "actions" ? (
            <>
              {type === "category" && role !== "sm" && (
                <Edit onClick={() => handleEdit(item)}>Edit</Edit>
              )}
              {type === "deleted_tasks" && (role === "sm" || role === "po") && (
                <Restore onClick={() => handleEdit(item)}>Restore</Restore>
              )}
              {role !== "sm" && (
                <Delete onClick={() => handleDelete(item)}>Delete</Delete>
              )}
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
