import React, { useState } from "react";
import { Container, Link, Typography } from "@mui/material";
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
  const [categoryGroupsFilter, setCategoryGroupsFilter] = useState<string[]>(
    []
  );

  const [numEmployeesFilter, setNumEmployeesFilter] = useState<string[]>([]);
  const [revenueRangeFilter, setRevenueRangeFilter] = useState<string[]>([]);

  const handleDeleteSelected = (name: string) => {
    setOriginalData((prev) => prev.filter((item) => item.name !== name));
  };

  const handleToggleChecked = (name: string, isChecked: boolean) => {
    setOriginalData((prev) =>
      prev.map((item) => (item.name === name ? { ...item, isChecked } : item))
    );
  };

  const handleToggleFav = (name: string, isFav: boolean) => {
    setOriginalData((prev) =>
      prev.map((item) => (item.name === name ? { ...item, isFav } : item))
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth={false}>
        <Typography variant="h6" gutterBottom>
          Save file locally, then click load file and select it to save updates
          locally
          <Link
            href={`${process.env.PUBLIC_URL}/db/berlin_halal.json`}
            variant="body1"
            display="inline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Berlin
          </Link>
          ,
          <Link
            href={`${process.env.PUBLIC_URL}/db/ksa.json`}
            variant="body1"
            display="inline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ksa
          </Link>
          ,
          <Link
            href={`${process.env.PUBLIC_URL}/db/malaysia.json`}
            variant="body1"
            display="inline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Malaysia
          </Link>
          ,
          <Link
            href={`${process.env.PUBLIC_URL}/db/qatar.json`}
            variant="body1"
            display="inline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Qatar
          </Link>
        </Typography>
        <FileActions
          setOriginalData={setOriginalData}
          filteredData={sortedData}
          setLocationFilter={setLocationFilter}
          setCategoryGroupsFilter={setCategoryGroupsFilter}
          setNumEmployeesFilter={setNumEmployeesFilter}
          setRevenueRangeFilter={setRevenueRangeFilter}
          updateFilters={updateFilters}
        />
        <FilterInput
          updateFilters={updateFilters}
          locationFilter={locationFilter}
          categoryGroupsFilter={categoryGroupsFilter}
          numEmployeesFilter={numEmployeesFilter}
          revenueRangeFilter={revenueRangeFilter}
        />
        <JsonTable
          tableData={sortedData}
          onDeleteSelected={handleDeleteSelected}
          handleSort={handleSort}
          sort={activeSort}
          onToggleChecked={handleToggleChecked}
          onToggleFav={handleToggleFav}
        />
      </Container>
    </ThemeProvider>
  );
};
