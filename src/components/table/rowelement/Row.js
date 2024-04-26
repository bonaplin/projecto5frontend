import React from "react";
import { userStore } from "../../../stores/UserStore.js";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useTranslation } from "react-i18next";
import { Dropdown } from "react-bootstrap";
const Row = ({ item, columns, handleEdit, handleDelete, type }) => {
  const { t } = useTranslation();

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
                  {type === "category" && role !== "sm" && <Dropdown.Item onClick={() => handleEdit(item)}>{t("Edit")}</Dropdown.Item>}
                  {type === "deleted_tasks" && (role === "sm" || role === "po") && (
                    <Dropdown.Item onClick={() => handleEdit(item)}>{t("Restore")}</Dropdown.Item>
                  )}
                  {role !== "sm" && <Dropdown.Item onClick={() => handleDelete(item)}>{t("Delete")}</Dropdown.Item>}
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
