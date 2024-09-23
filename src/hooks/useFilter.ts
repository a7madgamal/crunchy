import { useState } from "react";

export interface DataItem {
  name: string;
  numEmployeesEnum: string;
  categories: string[];
  locationIdentifiers: string[];
  rankOrgCompany: number;
  revenueRange: string[];
}

type SortableColumn = "rankOrgCompany";

export const useFilter = () => {
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);
  const [activeSort, setActiveSort] = useState<{
    column: SortableColumn;
    order: "asc" | "desc";
  }>({
    column: "rankOrgCompany",
    order: "desc",
  });

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

  const handleSort = (column: SortableColumn) => {
    setActiveSort((prev) => ({
      column,
      order: prev.column === column && prev.order === "asc" ? "desc" : "asc",
    }));
  };

  const sortedData = [...filteredData].sort((a, b) => {
    if (activeSort.order === "asc") {
      return a[activeSort.column] - b[activeSort.column];
    } else {
      return b[activeSort.column] - a[activeSort.column];
    }
  });

  return { sortedData, updateFilters, setFilteredData, handleSort, activeSort };
};
