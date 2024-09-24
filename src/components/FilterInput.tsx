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
import { NUM_EMPLOYEES, REV_OPTIONS } from "../filters/filterOptions";

interface FilterInputProps {
  updateFilters: (
    nameFilter: string,
    numEmployeesFilter: string[],
    categoryGroupsFilter: string[],
    locationFilter: string[],
    rankOrgCompanyFilter: number | null,
    revenueRangeFilter: string[]
  ) => void;
  locationFilter: string[];
  categoryGroups: string[];
}

export const FilterInput: FC<FilterInputProps> = ({
  updateFilters,
  locationFilter,
  categoryGroups,
}) => {
  const { control, watch } = useForm<{
    name: string;
    numEmployees: string[];
    categoryGroups: string[];
    locationIdentifiers: string[];
    rankOrgCompany: number | "";
    revenueRange: string[];
  }>({
    defaultValues: {
      name: "",
      numEmployees: [],
      categoryGroups: [],
      locationIdentifiers: [],
      rankOrgCompany: "",
      revenueRange: [],
    },
  });

  const watchName = watch("name");
  const watchNumEmployees = watch("numEmployees");
  const watchCategoryGroups = watch("categoryGroups");
  const watchLocationIdentifiers = watch("locationIdentifiers");
  const watchRankOrgCompany = watch("rankOrgCompany");
  const watchRevenueRange = watch("revenueRange");

  useEffect(() => {
    const rankValue = watchRankOrgCompany ? Number(watchRankOrgCompany) : null;

    updateFilters(
      watchName,
      watchNumEmployees,
      watchCategoryGroups,
      watchLocationIdentifiers,
      rankValue,
      watchRevenueRange
    );
  }, [
    watchName,
    watchNumEmployees,
    watchCategoryGroups,
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
          <TextField {...field} label="Name" variant="outlined" />
        )}
      />

      <FormControl style={{ minWidth: 200 }}>
        <InputLabel>Num</InputLabel>
        <Controller
          name="numEmployees"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              multiple
              renderValue={(selected) => selected.join(", ")}
            >
              {NUM_EMPLOYEES.map((option) => (
                <MenuItem key={option} value={option}>
                  <Checkbox checked={field.value.includes(option)} />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>

      <FormControl style={{ minWidth: 200 }}>
        <InputLabel>Category Groups</InputLabel>
        <Controller
          name="categoryGroups"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              multiple
              renderValue={(selected) => selected.join(", ")}
            >
              {categoryGroups.map((option) => (
                <MenuItem key={option} value={option}>
                  <Checkbox checked={field.value.includes(option)} />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>

      <FormControl style={{ minWidth: 200 }}>
        <InputLabel>Location</InputLabel>
        <Controller
          name="locationIdentifiers"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              multiple
              renderValue={(selected) => selected.join(", ")}
            >
              {locationFilter.map((location) => (
                <MenuItem key={location} value={location}>
                  <Checkbox checked={field.value.indexOf(location) > -1} />
                  <ListItemText primary={location} />
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>

      <Controller
        name="rankOrgCompany"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Max Rank"
            type="number"
            variant="outlined"
          />
        )}
      />

      <FormControl style={{ minWidth: 200 }}>
        <InputLabel>Revenue Range</InputLabel>
        <Controller
          name="revenueRange"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              multiple
              renderValue={(selected) => selected.join(", ")}
            >
              {REV_OPTIONS.map((option) => (
                <MenuItem key={option} value={option}>
                  <Checkbox checked={field.value.indexOf(option) > -1} />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
    </div>
  );
};
