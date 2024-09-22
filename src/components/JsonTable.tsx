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
  TableFooter,
} from "@mui/material";

interface DataItem {
  name: string;
  numEmployeesEnum: string[];
  categories: string[];
  locationIdentifiers: string[];
  rankOrgCompany: number;
  revenueRange: string[];
}

interface JsonTableProps {
  data: DataItem[];
  selectedRows: number[];
  onSelectRow: (rowIndex: number) => void;
  onSelectAll: (select: boolean) => void;
  onDeleteSelected: () => void;
}

const JsonTable: React.FC<JsonTableProps> = ({
  data,
  selectedRows,
  onSelectRow,
  onSelectAll,
  onDeleteSelected,
}) => {
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectAll = event.target.checked;
    onSelectAll(selectAll);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox
                checked={selectedRows.length === data.length}
                onChange={handleSelectAll}
              />
            </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Num Employees</TableCell>
            <TableCell>Categories</TableCell>
            <TableCell>Locations</TableCell>
            <TableCell>Rank</TableCell>
            <TableCell>Revenue Range</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <Checkbox
                  checked={selectedRows.includes(index)}
                  onChange={() => onSelectRow(index)}
                />
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.numEmployeesEnum.join(", ")}</TableCell>
              <TableCell>{item.categories.join(", ")}</TableCell>
              <TableCell>{item.locationIdentifiers.join(", ")}</TableCell>
              <TableCell>{item.rankOrgCompany}</TableCell>
              <TableCell>{item.revenueRange.join(", ")}</TableCell>
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
