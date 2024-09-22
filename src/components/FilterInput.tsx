// src/components/FilterInput.tsx
import React from "react";
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
import { numEmployeesOptions, revenueOptions } from "../filters/filterOptions";

interface FilterInputProps {
  onFilterChange: (
    nameFilter: string,
    numEmployeesFilter: string[],
    categoriesFilter: string[],
    locationFilter: string[],
    rankOrgCompanyFilter: number | null,
    revenueRangeFilter: string[]
  ) => void;
}

const FilterInput: React.FC<FilterInputProps> = ({ onFilterChange }) => {
  const { control, watch } = useForm({
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

  React.useEffect(() => {
    const rankValue = watchRankOrgCompany ? Number(watchRankOrgCompany) : null;
    onFilterChange(
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
            <InputLabel>Filter by Employees</InputLabel>
            <Select
              {...field}
              multiple
              renderValue={(selected) => (selected as string[]).join(", ")}
            >
              {numEmployeesOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  <Checkbox checked={field.value.includes(option as any)} />
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
              {/* Add your category options here */}
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
              {/* Add your location options here */}
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
            label="Rank (≤)"
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
              {revenueOptions.map((option) => (
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
