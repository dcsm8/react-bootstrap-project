// src/SimpleTable.tsx
import React from "react";
import { useTable, usePagination } from "react-table"; // Import usePagination
import { Table, Button, Pagination } from "react-bootstrap"; // Import Button for pagination controls
import { Person } from "./makeData";

interface SimpleTableProps {
  columns: any[];
  data: Person[];
}

export const SimpleTable: React.FC<SimpleTableProps> = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // Use 'page' array to render rows for the current page
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    prepareRow,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable<Person>(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }, // Initialize pageIndex to 0
    },
    usePagination // Use the usePagination hook
  );

  return (
    <>
      <Table {...getTableProps()} striped bordered hover responsive>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            // Render rows for the current page
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="pagination">
        <Pagination>
          <Pagination.First
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          />
          <Pagination.Prev
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          />
          {pageOptions.map((number) => (
            <Pagination.Item
              key={number}
              active={number === pageIndex}
              onClick={() => gotoPage(number)}
            >
              {number + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => nextPage()} disabled={!canNextPage} />
          <Pagination.Last
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          />
        </Pagination>
        <div className="d-flex justify-content-between mt-2">
          <span>
            Page <strong>{pageIndex + 1}</strong> of{" "}
            <strong>{pageOptions.length}</strong>
          </span>
          <select
            className="form-select"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
            style={{ width: "auto" }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};
