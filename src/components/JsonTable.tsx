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
  onToggleChecked: (name: string, isChecked: boolean) => void;
}

const JsonTable: React.FC<JsonTableProps> = ({
  tableData,
  onDeleteSelected,
  handleSort,
  sort,
  onToggleChecked,
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
            <TableCell>checked</TableCell>
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
                <Checkbox
                  checked={item.isChecked}
                  onChange={(e) => onToggleChecked(item.name, e.target.checked)}
                />
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => onDeleteSelected(item.name)}
                  size="small"
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
