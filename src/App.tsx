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
  const { setOriginalData, sortedData, updateFilters, handleSort, activeSort } =
    useFilter();
  const [locationFilter, setLocationFilter] = useState<string[]>([]);
  const [categoryGroups, setCategoryGroups] = useState<string[]>([]);

  const handleDeleteSelected = (name: string) => {
    setOriginalData((prev) => prev.filter((item) => item.name !== name));
  };

  const handleToggleChecked = (name: string, isChecked: boolean) => {
    setOriginalData((prev) =>
      prev.map((item) => (item.name === name ? { ...item, isChecked } : item))
    );
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
          onDeleteSelected={handleDeleteSelected}
          handleSort={handleSort}
          sort={activeSort}
          onToggleChecked={handleToggleChecked}
        />
      </Container>
    </ThemeProvider>
  );
};
