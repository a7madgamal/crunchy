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
  tableData: DataItem[];
  selectedRows: number[];
  onSelectRow: (rowIndex: number) => void;
  onSelectAll: (select: boolean) => void;
  onDeleteSelected: () => void;
}

const JsonTable: React.FC<JsonTableProps> = ({
  tableData,
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
                checked={selectedRows.length === tableData.length}
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
          {tableData.map((item, index) => {
            console.log({ numEmployeesEnum: item });

            return (
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
            );
          })}
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
