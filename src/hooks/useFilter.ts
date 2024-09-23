import { useState } from "react";

export interface DataItem {
  name: string;
  numEmployeesEnum: string;
  categories: string[];
  locationIdentifiers: string[];
  rankOrgCompany: number;
  revenueRange: string[];
}

const useFilter = () => {
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);

  const updateFilters = (
    nameFilter: string,
    numEmployeesFilter: string[],
    categoriesFilter: string[],
    locationFilter: string[],
    rankOrgCompanyFilter: number | null,
    revenueRangeFilter: string[]
  ) => {
    const filtered = filteredData.filter((item) => {
      const nameMatches =
        item.name === "" ||
        item.name.toLowerCase().includes(nameFilter.toLowerCase());

      const numEmployeesMatches =
        numEmployeesFilter.length === 0 ||
        numEmployeesFilter.includes(item.numEmployeesEnum);

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

  return { filteredData, updateFilters, setFilteredData };
};

export default useFilter;
