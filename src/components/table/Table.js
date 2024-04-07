import React, { useState } from "react";
import "./Table.css";
import UserRow from "../table/rowelement/UserRow";
import Row from "./rowelement/Row";
const Table = ({
  data,
  columns,
  handleEdit,
  handleDelete,
  handleDeleteTasks,
  handleActiveChange,
  handleUserClick,
  type,
}) => {
  if (data.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                style={
                  column === "role" ||
                  column === "active" ||
                  column === "actions"
                    ? { textAlign: "center" }
                    : {}
                }
              >
                {column === "actions-category"
                  ? "Actions"
                  : column.charAt(0).toUpperCase() + column.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) =>
            type === "user" ? (
              <UserRow
                key={index}
                item={item}
                columns={columns}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleDeleteTasks={handleDeleteTasks}
                handleActiveChange={handleActiveChange}
                handleUserClick={handleUserClick}
              />
            ) : (
              <Row
                type={type}
                key={index}
                item={item}
                columns={columns}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
