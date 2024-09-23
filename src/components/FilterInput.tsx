// src/components/FilterInput.tsx
import React, { FC, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  InputLabel,
  FormControl,
} from "@mui/material";
import {
  CATEGORY_GROUPS_FILTER,
  LOCATION_FILTER,
  NUM_EMPLOYEES,
  REV_OPTIONS,
} from "../filters/filterOptions";

interface FilterInputProps {
  updateFilters: (
    nameFilter: string,
    numEmployeesFilter: string[],
    categoriesFilter: string[],
    locationFilter: string[],
    rankOrgCompanyFilter: number | null,
    revenueRangeFilter: string[]
  ) => void;
}

const FilterInput: FC<FilterInputProps> = ({ updateFilters }) => {
  const { control, watch } = useForm<{
    name: string;
    numEmployees: string[];
    categories: string[];
    locationIdentifiers: string[];
    rankOrgCompany: number | "";
    revenueRange: string[];
  }>({
    defaultValues: {
      name: "",
      numEmployees: [],
      categories: [],
      locationIdentifiers: [],
      rankOrgCompany: "",
      revenueRange: [],
    },
  });

  const watchName = watch("name");
  const watchNumEmployees = watch("numEmployees");
  const watchCategories = watch("categories");
  const watchLocationIdentifiers = watch("locationIdentifiers");
  const watchRankOrgCompany = watch("rankOrgCompany");
  const watchRevenueRange = watch("revenueRange");

  useEffect(() => {
    const rankValue = watchRankOrgCompany ? Number(watchRankOrgCompany) : null;

    updateFilters(
      watchName,
      watchNumEmployees,
      watchCategories,
      watchLocationIdentifiers,
      rankValue,
      watchRevenueRange
    );
  }, [
    watchName,
    watchNumEmployees,
    watchCategories,
    watchLocationIdentifiers,
    watchRankOrgCompany,
    watchRevenueRange,
    // updateFilters,
  ]);

  return (
    <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Filter by Name"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="numEmployees"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel>Num of Employees</InputLabel>
            <Select
              {...field}
              multiple
              renderValue={(selected) => (selected as string[]).join(", ")}
            >
              {NUM_EMPLOYEES.map((option) => (
                <MenuItem key={option} value={option}>
                  <Checkbox checked={field.value.includes(option)} />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />

      <Controller
        name="categories"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel>Filter by Categories</InputLabel>
            <Select
              {...field}
              multiple
              renderValue={(selected) => (selected as string[]).join(", ")}
            >
              {CATEGORY_GROUPS_FILTER.map((option) => (
                <MenuItem key={option} value={option}>
                  <Checkbox checked={field.value.includes(option)} />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />

      <Controller
        name="locationIdentifiers"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel>Filter by Locations</InputLabel>
            <Select
              {...field}
              multiple
              renderValue={(selected) => (selected as string[]).join(", ")}
            >
              {LOCATION_FILTER.map((option) => (
                <MenuItem key={option} value={option}>
                  <Checkbox checked={field.value.includes(option)} />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />

      <Controller
        name="rankOrgCompany"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Crunchbase rank (≤)"
            type="number"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="revenueRange"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel>Filter by Revenue</InputLabel>
            <Select
              {...field}
              multiple
              renderValue={(selected) => (selected as string[]).join(", ")}
            >
              {REV_OPTIONS.map((option) => (
                <MenuItem key={option} value={option}>
                  <Checkbox checked={field.value.includes(option)} />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
    </div>
  );
};

export default FilterInput;
