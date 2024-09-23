import { useState } from "react";
import { DataItem } from "../App";

const useFilter = (data: DataItem[]) => {
  console.log("usefilter");
  const [filteredData, setFilteredData] = useState<DataItem[]>(data);

  const updateFilters = (
    nameFilter: string,
    numEmployeesFilter: string[],
    categoriesFilter: string[],
    locationFilter: string[],
    rankOrgCompanyFilter: number | null,
    revenueRangeFilter: string[]
  ) => {
    const filtered = data.filter((item) => {
      const nameMatches = item.name
        .toLowerCase()
        .includes(nameFilter.toLowerCase());
      const numEmployeesMatches =
        numEmployeesFilter.length === 0 ||
        numEmployeesFilter.includes(item.numEmployeesEnum[0]);

      const categoriesMatch =
        categoriesFilter.length === 0 ||
        categoriesFilter.some((cat) => item.categories.includes(cat));

      const locationsMatch =
        locationFilter.length === 0 ||
        locationFilter.some((loc) => item.locationIdentifiers.includes(loc));

      const rankMatches =
        rankOrgCompanyFilter === null ||
        item.rankOrgCompany <= rankOrgCompanyFilter;

      const revenueMatches =
        revenueRangeFilter.length === 0 ||
        revenueRangeFilter.some((rev) => item.revenueRange.includes(rev));

      return (
        nameMatches &&
        numEmployeesMatches &&
        categoriesMatch &&
        locationsMatch &&
        rankMatches &&
        revenueMatches
      );
    });

    setFilteredData(filtered);
  };

  return { filteredData, updateFilters };
};

export default useFilter;
