import { useState, useMemo, useCallback, useEffect } from "react";
import {
  DataItem,
  NUM_EMPLOYEES,
  SortableColumn,
} from "../filters/filterOptions";

export const useFilter = () => {
  const [originalData, setOriginalData] = useState<DataItem[]>([]);
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);
  const [activeSort, setActiveSort] = useState<{
    column: SortableColumn;
    order: "asc" | "desc";
  }>({
    column: "rankOrgCompany",
    order: "desc",
  });

  const [currentFilters, setCurrentFilters] = useState<{
    nameFilter: string;
    numEmployeesFilter: string[];
    categoriesFilter: string[];
    locationFilter: string[];
    rankOrgCompanyFilter: number | null;
    revenueRangeFilter: string[];
  }>({
    nameFilter: "",
    numEmployeesFilter: [],
    categoriesFilter: [],
    locationFilter: [],
    rankOrgCompanyFilter: null,
    revenueRangeFilter: [],
  });

  const updateFilters = useCallback(
    (
      nameFilter: string,
      numEmployeesFilter: string[],
      categoriesFilter: string[],
      locationFilter: string[],
      rankOrgCompanyFilter: number | null,
      revenueRangeFilter: string[]
    ) => {
      setCurrentFilters({
        nameFilter,
        numEmployeesFilter,
        categoriesFilter,
        locationFilter,
        rankOrgCompanyFilter,
        revenueRangeFilter,
      });

      const filtered = originalData.filter((item) => {
        const nameMatches =
          item.name === "" ||
          item.name.toLowerCase().includes(nameFilter.toLowerCase());

        const numEmployeesMatches =
          numEmployeesFilter.length === 0 ||
          numEmployeesFilter.includes(item.numEmployeesEnum);

        const categoriesMatch =
          categoriesFilter.length === 0 ||
          categoriesFilter.some((cat) => item.categoryGroups.includes(cat));

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
    },
    [originalData]
  );

  const sortedData = useMemo(() => {
    let sorted = [...filteredData];

    if (activeSort.column === "numEmployeesEnum") {
      sorted.sort((a, b) => {
        const aIndex = NUM_EMPLOYEES.indexOf(a.numEmployeesEnum);
        const bIndex = NUM_EMPLOYEES.indexOf(b.numEmployeesEnum);
        if (aIndex === -1) {
          console.error(`unknown filter value [${a.numEmployeesEnum}]`);

          return 1;
        }
        if (bIndex === -1) {
          console.error(`unknown filter value [${b.numEmployeesEnum}]`);

          return -1;
        }

        return activeSort.order === "asc" ? aIndex - bIndex : bIndex - aIndex;
      });
    } else {
      sorted.sort((a, b) => {
        const aValue = parseInt(a[activeSort.column] as string);
        const bValue = parseInt(b[activeSort.column] as string);

        if (aValue < bValue) return activeSort.order === "asc" ? -1 : 1;
        if (aValue > bValue) return activeSort.order === "asc" ? 1 : -1;

        return 0;
      });
    }

    return sorted;
  }, [filteredData, activeSort]);

  useEffect(() => {
    updateFilters(
      currentFilters.nameFilter,
      currentFilters.numEmployeesFilter,
      currentFilters.categoriesFilter,
      currentFilters.locationFilter,
      currentFilters.rankOrgCompanyFilter,
      currentFilters.revenueRangeFilter
    );
  }, [
    currentFilters.categoriesFilter,
    currentFilters.locationFilter,
    currentFilters.nameFilter,
    currentFilters.numEmployeesFilter,
    currentFilters.rankOrgCompanyFilter,
    currentFilters.revenueRangeFilter,
    originalData,
    // updateFilters,
  ]);

  const handleSort = useCallback((column: SortableColumn) => {
    setActiveSort((prev) => ({
      column,
      order: prev.column === column && prev.order === "asc" ? "desc" : "asc",
    }));
  }, []);

  return {
    setOriginalData,
    sortedData,
    updateFilters,
    handleSort,
    activeSort,
  };
};
