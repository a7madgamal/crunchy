import React from "react";
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
  Link,
} from "@mui/material";
import { DataItem } from "../hooks/useFilter";

interface JsonTableProps {
  tableData: DataItem[];
  selectedRows: number[];
  onSelectRow: (rowIndex: number) => void;
  onSelectAll: (select: boolean) => void;
  onDeleteSelected: () => void;
  handleSort: (column: "rankOrgCompany") => void;
  sort: {
    column: "rankOrgCompany";
    order: "asc" | "desc";
  };
}

const JsonTable: React.FC<JsonTableProps> = ({
  tableData,
  selectedRows,
  onSelectRow,
  onSelectAll,
  onDeleteSelected,
  handleSort,
  sort,
}) => {
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
            <TableCell>Website</TableCell>
            <TableCell>Num Employees</TableCell>
            <TableCell>Categories</TableCell>
            <TableCell>Locations</TableCell>
            <TableCell
              onClick={() => handleSort("rankOrgCompany")}
              style={{ cursor: "pointer" }}
            >
              Rank Org Company{" "}
              {sort.column === "rankOrgCompany" &&
                (sort.order === "asc" ? "▲" : "▼")}
            </TableCell>
            <TableCell>Revenue Range</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <Checkbox
                  checked={selectedRows.includes(index)}
                  onChange={() => onSelectRow(index)}
                />
              </TableCell>
              <TableCell>
                <Link
                  href={item.companyCBUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.name}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  href={item.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.website}
                </Link>
              </TableCell>
              <TableCell>{item.numEmployeesEnum}</TableCell>
              <TableCell>{item.categories.join(", ")}</TableCell>
              <TableCell>{item.locationIdentifiers.join(", ")}</TableCell>
              <TableCell>{item.rankOrgCompany}</TableCell>
              <TableCell>{item.revenueRange}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={8}>
              <button onClick={onDeleteSelected}>Delete Selected</button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export { JsonTable };
