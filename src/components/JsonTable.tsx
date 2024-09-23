import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TableFooter,
} from "@mui/material";
import { DataItem } from "../App";

interface JsonTableProps {
  tableData: DataItem[];
  selectedRows: number[];
  onSelectRow: (rowIndex: number) => void;
  onSelectAll: (select: boolean) => void;
  onDeleteSelected: () => void;
}
type SortableColumn = "rankOrgCompany";

const JsonTable: React.FC<JsonTableProps> = ({
  tableData,
  selectedRows,
  onSelectRow,
  onSelectAll,
  onDeleteSelected,
}) => {
  const [sort, setSort] = useState<{
    column: SortableColumn;
    order: "asc" | "desc";
  }>({
    column: "rankOrgCompany",
    order: "desc",
  });

  const handleSort = (column: SortableColumn) => {
    if (column === sort.column) {
      setSort((prev) => ({
        ...prev,
        order: prev.order === "asc" ? "desc" : "asc",
      }));
    } else {
      setSort({ column, order: "asc" });
    }
  };

  const sortedData = tableData.sort((a, b) => {
    if (sort.order === "asc") {
      return a[sort.column] - b[sort.column];
    } else {
      return b[sort.column] - a[sort.column];
    }
  });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox
                checked={selectedRows.length === tableData.length}
                onChange={(event) => onSelectAll(event.target.checked)}
              />
            </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Num Employees</TableCell>
            <TableCell>Categories</TableCell>
            <TableCell>Locations</TableCell>
            <TableCell
              onClick={() => handleSort("rankOrgCompany")}
              style={{ cursor: "pointer" }}
            >
              Rank {sort.order === "asc" ? "↑" : "↓"}
            </TableCell>
            <TableCell>Revenue Range</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {sortedData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <Checkbox
                  checked={selectedRows.includes(index)}
                  onChange={() => onSelectRow(index)}
                />
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.numEmployeesEnum}</TableCell>
              <TableCell>
                {item.categories ? item.categories.join(", ") : ""}
              </TableCell>
              <TableCell>
                {item.locationIdentifiers
                  ? item.locationIdentifiers.join(", ")
                  : ""}
              </TableCell>
              <TableCell>{item.rankOrgCompany}</TableCell>
              <TableCell>{item.revenueRange}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={7}>
              <button onClick={onDeleteSelected}>Delete Selected</button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default JsonTable;
