import React from "react";
import { useTable, usePagination, useSortBy, useGlobalFilter } from "react-table";
import UserRow from "../table/rowelement/UserRow";
import Row from "./rowelement/Row";
import "./Table.css";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import FormInput from "../formInput/FormInput";
function Table({ data, columns, handleEdit, handleDelete, handleDeleteTasks, handleActiveChange, handleUserClick, type }) {
  // react - table acessores (obrigatorio em react-table)
  const tableConfig = React.useMemo(
    () => ({
      columns: columns.map((column) => ({
        Header: column,
        accessor: column,
      })),
      data,
    }),
    [data, columns]
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setGlobalFilter,
    state: { pageIndex, globalFilter },
  } = useTable(tableConfig, useGlobalFilter, useSortBy, usePagination);
  // ract - table
  if (data.length === 0) {
    return (
      <div className="main-board">
        <div className="table-board">
          <p>No data available</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="main-board">
        <div className="center">
          <FormInput value={globalFilter || ""} onChange={(e) => setGlobalFilter(e.target.value || undefined)} placeholder={`Search`} name="search" />
        </div>

        <div className="table-board">
          <div className="table-container">
            <table {...getTableProps()} className="table">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {column.render("Header")}
                        <span>{column.isSorted ? column.isSortedDesc ? <ArrowDropDownRoundedIcon /> : <ArrowDropUpRoundedIcon /> : ""}</span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                  prepareRow(row);
                  return type === "user" ? (
                    <UserRow
                      key={i}
                      item={row.original}
                      columns={columns}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                      handleDeleteTasks={handleDeleteTasks}
                      handleActiveChange={handleActiveChange}
                      handleUserClick={handleUserClick}
                    />
                  ) : (
                    <Row type={type} key={i} item={row.original} columns={columns} handleEdit={handleEdit} handleDelete={handleDelete} />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="page-bar">
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {<ChevronLeftRoundedIcon />}
          </button>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {<ChevronRightRoundedIcon />}
          </button>
          <span>
            Page <strong className="page-number">{pageIndex + 1}</strong>{" "}
          </span>
        </div>
      </div>
    </>
  );
}

export default Table;
