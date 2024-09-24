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
  TableFooter,
  Link,
} from "@mui/material";
import { DataItem, SortableColumn } from "../filters/filterOptions";

interface JsonTableProps {
  tableData: DataItem[];
  selectedRows: number[];
  onSelectRow: (rowIndex: number) => void;
  onSelectAll: (select: boolean) => void;
  onDeleteSelected: () => void;
  handleSort: (column: SortableColumn) => void;
  sort: {
    column: SortableColumn;
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
    <TableContainer
      component={Paper}
      sx={{ maxWidth: "100%", width: "1400px", maxHeight: "80vh" }}
    >
      <Table size="small" stickyHeader>
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
            </TableRow>
          ))}
        </TableBody>
        <TableFooter sx={{ position: "sticky", bottom: 0 }}>
          <TableRow>
            <TableCell colSpan={10}>
              <Button
                variant="contained"
                color="secondary"
                onClick={onDeleteSelected}
                disabled={selectedRows.length === 0}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export { JsonTable };
