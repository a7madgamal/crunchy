import React, { useState } from "react";
import { DataItem } from "../filters/filterOptions";
import { Button } from "@mui/material";

interface FileActionsProps {
  setOriginalData: React.Dispatch<React.SetStateAction<DataItem[]>>;
  filteredData: DataItem[];
  setLocationFilter: React.Dispatch<React.SetStateAction<string[]>>;
  setCategoryGroupsFilter: React.Dispatch<React.SetStateAction<string[]>>;
  setNumEmployeesFilter: React.Dispatch<React.SetStateAction<string[]>>;
  setRevenueRangeFilter: React.Dispatch<React.SetStateAction<string[]>>;

  updateFilters: (
    nameFilter: string,
    numEmployeesFilter: string[],
    categoryGroupsFilter: string[],
    locationFilter: string[],
    rankOrgCompanyFilter: number | null,
    revenueRangeFilter: string[],
    isCheckedFilter: string[]
  ) => void;
}

export const FileActions: React.FC<FileActionsProps> = ({
  setOriginalData,
  filteredData,
  setLocationFilter,
  setCategoryGroupsFilter,
  setNumEmployeesFilter,
  setRevenueRangeFilter,
  updateFilters,
}) => {
  const [fileHandle, setFileHandle] = useState<FileSystemFileHandle | null>(
    null
  );

  const handleLoadFile = async () => {
    try {
      // @ts-expect-error
      const [handle] = await window.showOpenFilePicker({
        types: [
          {
            description: "JSON Files",
            accept: { "application/json": [".json"] },
          },
        ],
      });
      setFileHandle(handle);

      const file = await handle.getFile();
      const text = await file.text();
      const jsonData = JSON.parse(text);

      const uniqueLocations = new Set<string>();
      const uniqueCategoryGroups = new Set<string>();
      const uniqueNumEmployees = new Set<string>();
      const uniqueRevenuRanges = new Set<string>();

      jsonData.forEach((item: DataItem) => {
        item.locationIdentifiers.forEach((location: string) => {
          uniqueLocations.add(location);
        });
        item.categoryGroups.forEach((category: string) => {
          uniqueCategoryGroups.add(category);
        });

        uniqueNumEmployees.add(item.numEmployeesEnum);
      });

      setLocationFilter(Array.from(uniqueLocations).sort());
      setCategoryGroupsFilter(Array.from(uniqueCategoryGroups).sort());
      setNumEmployeesFilter(Array.from(uniqueNumEmployees).sort());
      setRevenueRangeFilter(Array.from(uniqueRevenuRanges).sort());
      setOriginalData(jsonData);

      updateFilters("", [], [], [], null, [], []);
    } catch (err) {
      console.error("Failed to open the file:", err);
    }
  };

  const handleSaveFile = async () => {
    if (fileHandle) {
      const jsonString = JSON.stringify(filteredData, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });

      try {
        const writable = await fileHandle.createWritable();
        await writable.write(blob);
        await writable.close();
        console.log("File saved successfully");
      } catch (err) {
        console.error("Failed to save the file:", err);
      }
    } else {
      console.error("No file selected");
    }
  };

  return (
    <div>
      <Button onClick={handleLoadFile}>Load File</Button>
      <Button onClick={handleSaveFile} disabled={!fileHandle}>
        Save
      </Button>
    </div>
  );
};
