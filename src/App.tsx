import React, { useState } from "react";
import { Container } from "@mui/material";
import { FilterInput } from "./components/FilterInput";
import { JsonTable } from "./components/JsonTable";
import { FileActions } from "./components/FileActions";
import { useFilter } from "./hooks/useFilter";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const App: React.FC = () => {
  const {
    setOriginalData,
    sortedData,
    updateFilters,
    // setFilteredData,
    handleSort,
    activeSort,
  } = useFilter();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [locationFilter, setLocationFilter] = useState<string[]>([]);
  const [categoryGroups, setCategoryGroups] = useState<string[]>([]);

  const handleSelectRow = (rowName: string) => {
    setSelectedRows((prev) => {
      return prev.includes(rowName)
        ? prev.filter((name) => name !== rowName)
        : [...prev, rowName];
    });
  };

  const handleSelectAll = (select: boolean) => {
    if (select) {
      setSelectedRows(sortedData.map((item) => item.name));
    } else {
      setSelectedRows([]);
    }
  };

  const handleDeleteSelected = () => {
    setOriginalData((prev) =>
      prev.filter((item) => !selectedRows.includes(item.name))
    );
    setSelectedRows([]);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="xl">
        <h1>JSON File Table with Filters</h1>
        <FileActions
          setOriginalData={setOriginalData}
          filteredData={sortedData}
          setLocationFilter={setLocationFilter}
          setCategoryGroups={setCategoryGroups}
          updateFilters={updateFilters}
        />
        <FilterInput
          updateFilters={updateFilters}
          locationFilter={locationFilter}
          categoryGroups={categoryGroups}
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
    </ThemeProvider>
  );
};
