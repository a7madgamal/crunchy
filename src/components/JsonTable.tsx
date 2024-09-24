// src/components/JsonTable.tsx
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
  Button,
  Link,
} from "@mui/material";
import { DataItem, SortableColumn } from "../filters/filterOptions";

interface JsonTableProps {
  tableData: DataItem[];
  onDeleteSelected: (rowName: string) => void;
  handleSort: (column: SortableColumn) => void;
  sort: { column: SortableColumn; order: "asc" | "desc" };
}

const JsonTable: React.FC<JsonTableProps> = ({
  tableData,
  onDeleteSelected,
  handleSort,
  sort,
}) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: "100%", width: "1400px", maxHeight: "80vh" }}
    >
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Website</TableCell>
            <TableCell>LI</TableCell>
            <TableCell>Desc</TableCell>
            <TableCell
              onClick={() => handleSort("numEmployeesEnum")}
              style={{ cursor: "pointer" }}
            >
              Num
              {sort.column === "numEmployeesEnum" &&
                (sort.order === "asc" ? "▲" : "▼")}
            </TableCell>
            <TableCell>Cat</TableCell>
            <TableCell>Locations</TableCell>
            <TableCell
              onClick={() => handleSort("rankOrgCompany")}
              style={{ cursor: "pointer" }}
            >
              Ranking
              {sort.column === "rankOrgCompany" &&
                (sort.order === "asc" ? "▲" : "▼")}
            </TableCell>
            <TableCell>Revenue Range</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((item) => (
            <TableRow key={item.name}>
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
                  website
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  href={item.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LI
                </Link>
              </TableCell>
              <TableCell>{item.shortDescription}</TableCell>
              <TableCell>{item.numEmployeesEnum}</TableCell>
              <TableCell>{item.categoryGroups.join(", ")}</TableCell>
              <TableCell>{item.locationIdentifiers.join(", ")}</TableCell>
              <TableCell>{item.rankOrgCompany}</TableCell>
              <TableCell>{item.revenueRange}</TableCell>
              <TableCell>
                <Button
                  size="small"
                  style={{ backgroundColor: "red", color: "white" }}
                  onClick={() => {
                    console.log("delete", item.name);
                    onDeleteSelected(item.name);
                  }}
                >
                  x
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { JsonTable };
