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
  Tooltip,
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
      sx={{ maxWidth: "100%", width: "1400px" }}
    >
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
              <TableCell>
                <Tooltip title={item.shortDescription} arrow>
                  <div
                    style={{
                      maxWidth: "400px",
                    }}
                  >
                    {item.shortDescription}
                  </div>
                </Tooltip>
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
            <TableCell colSpan={10}>
              <button onClick={onDeleteSelected}>Delete Selected</button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export { JsonTable };
