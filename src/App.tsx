import React, { useState } from "react";
import { Container } from "@mui/material";

import { FilterInput } from "./components/FilterInput";
import { JsonTable } from "./components/JsonTable";
import { FileActions } from "./components/FileActions";
import { useFilter } from "./hooks/useFilter";

export const App: React.FC = () => {
  const { sortedData, updateFilters, setFilteredData, handleSort, activeSort } =
    useFilter();
  const [selectedRows, setSelectedRows] = React.useState<number[]>([]);
  const [locationFilter, setLocationFilter] = useState<string[]>([]);

  const handleSelectRow = (rowIndex: number) => {
    setSelectedRows((prev) => {
      return prev.includes(rowIndex)
        ? prev.filter((index) => index !== rowIndex)
        : [...prev, rowIndex];
    });
  };

  const handleSelectAll = (select: boolean) => {
    if (select) {
      setSelectedRows(sortedData.map((_, index) => index));
    } else {
      setSelectedRows([]);
    }
  };

  const handleDeleteSelected = () => {
    setFilteredData((prev) =>
      prev.filter((_, index) => !selectedRows.includes(index))
    );
    setSelectedRows([]);
  };

  return (
    <Container maxWidth="xl">
      <h1>JSON File Table with Filters</h1>
      <FileActions
        setData={setFilteredData}
        filteredData={sortedData}
        setLocationFilter={setLocationFilter}
      />
      <FilterInput
        updateFilters={updateFilters}
        locationFilter={locationFilter}
      />
      <JsonTable
        tableData={sortedData}
        selectedRows={selectedRows}
        onSelectRow={handleSelectRow}
        onSelectAll={handleSelectAll}
        onDeleteSelected={handleDeleteSelected}
        handleSort={handleSort}
        sort={activeSort}
      />
    </Container>
  );
};
