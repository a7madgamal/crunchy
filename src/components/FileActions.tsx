import React from "react";
import { DataItem } from "../filters/filterOptions";

interface FileActionsProps {
  setOriginalData: React.Dispatch<React.SetStateAction<DataItem[]>>;
  filteredData: DataItem[];
  setLocationFilter: React.Dispatch<React.SetStateAction<string[]>>;
  updateFilters: (
    nameFilter: string,
    numEmployeesFilter: string[],
    categoryGroupsFilter: string[],
    locationFilter: string[],
    rankOrgCompanyFilter: number | null,
    revenueRangeFilter: string[]
  ) => void;
}

export const FileActions: React.FC<FileActionsProps> = ({
  setOriginalData,
  filteredData,
  setLocationFilter,
  updateFilters,
}) => {
  const handleLoadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const text = await file.text();
      const jsonData = JSON.parse(text);

      const uniqueLocations = new Set<string>();

      jsonData.forEach((item: DataItem) => {
        item.locationIdentifiers.forEach((location: string) => {
          uniqueLocations.add(location);
        });
      });

      setLocationFilter(Array.from(uniqueLocations).sort());
      setOriginalData(jsonData);

      updateFilters("", [], [], [], null, []);
    }
  };

  const handleSaveFile = () => {
    const blob = new Blob([JSON.stringify(filteredData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <input type="file" accept=".json" onChange={handleLoadFile} />
      <button onClick={handleSaveFile}>Save as JSON</button>
    </div>
  );
};
