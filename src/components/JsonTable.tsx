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
  IconButton,
} from "@mui/material";
import { DataItem, SortableColumn } from "../filters/filterOptions";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";

interface JsonTableProps {
  tableData: DataItem[];
  onDeleteSelected: (rowName: string) => void;
  handleSort: (column: SortableColumn) => void;
  sort: { column: SortableColumn; order: "asc" | "desc" };
  onToggleChecked: (name: string, isChecked: boolean) => void;
  onToggleFav: (name: string, isFav: boolean) => void;
}

const JsonTable: React.FC<JsonTableProps> = ({
  tableData,
  onDeleteSelected,
  handleSort,
  sort,
  onToggleChecked,
  onToggleFav,
}) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: "100%", width: "100vw", maxHeight: "80vh" }}
    >
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
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
            <TableCell
              onClick={() => handleSort("revenueRange")}
              style={{ cursor: "pointer" }}
            >
              Revenue Range
              {sort.column === "revenueRange" &&
                (sort.order === "asc" ? "▲" : "▼")}
            </TableCell>
            <TableCell>Checked</TableCell>
            <TableCell>fav</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((item) => (
            <TableRow key={item.name}>
              <TableCell>
                <Button
                  onClick={() => onDeleteSelected(item.name)}
                  size="small"
                  sx={{ width: "10px", minWidth: "10px", color: "red" }}
                >
                  x
                </Button>
                <IconButton
                  size="small"
                  href={item.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  href={item.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LanguageIcon fontSize="small" />
                </IconButton>
                <Link
                  href={item.companyCBUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.name}
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
                <Checkbox
                  checked={item.isFav}
                  onChange={(e) => onToggleFav(item.name, e.target.checked)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { JsonTable };
