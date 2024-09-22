// src/App.tsx
import React, { useState } from "react";
import FilterInput from "./components/FilterInput";
import JsonTable from "./components/JsonTable";
import FileActions from "./components/FileActions";
import { Container } from "@mui/material";
import useFilter from "./hooks/useFilter";

export interface DataItem {
  name: string;
  numEmployeesEnum: string[];
  categories: string[];
  locationIdentifiers: string[];
  rankOrgCompany: number;
  revenueRange: string[];
}

const App: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const { filteredData, filterData } = useFilter(data);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const handleSelectRow = (rowIndex: number) => {
    setSelectedRows((prev) =>
      prev.includes(rowIndex)
        ? prev.filter((index) => index !== rowIndex)
        : [...prev, rowIndex]
    );
  };

  const handleSelectAll = (select: boolean) => {
    if (select) {
      setSelectedRows(filteredData.map((_, index) => index));
    } else {
      setSelectedRows([]);
    }
  };

  const handleDeleteSelected = () => {
    setData((prev) => prev.filter((_, index) => !selectedRows.includes(index)));
    setSelectedRows([]); // Clear selection after deletion
  };

  return (
    <Container>
      <h1>JSON File Table with Filters</h1>
      <FileActions setData={setData} filteredData={filteredData} />
      <FilterInput onFilterChange={filterData} />
      <JsonTable
        data={filteredData}
        selectedRows={selectedRows}
        onSelectRow={handleSelectRow}
        onSelectAll={handleSelectAll}
        onDeleteSelected={handleDeleteSelected}
      />
    </Container>
  );
};

export default App;
