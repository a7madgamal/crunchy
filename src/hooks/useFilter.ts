import { useState, useMemo, useCallback, useEffect } from "react";
import {
  DataItem,
  NUM_EMPLOYEES,
  REV_OPTIONS,
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
    order: "asc",
  });

  const [currentFilters, setCurrentFilters] = useState<{
    nameFilter: string;
    numEmployeesFilter: string[];
    categoriesFilter: string[];
    locationFilter: string[];
    rankOrgCompanyFilter: number | null;
    revenueRangeFilter: string[];
    isCheckedFilter: string[];
  }>({
    nameFilter: "",
    numEmployeesFilter: [],
    categoriesFilter: [],
    locationFilter: [],
    rankOrgCompanyFilter: null,
    revenueRangeFilter: [],
    isCheckedFilter: [],
  });

  const updateFilters = useCallback(
    (
      nameFilter: string,
      numEmployeesFilter: string[],
      categoriesFilter: string[],
      locationFilter: string[],
      rankOrgCompanyFilter: number | null,
      revenueRangeFilter: string[],
      isCheckedFilter: string[]
    ) => {
      setCurrentFilters({
        nameFilter,
        numEmployeesFilter,
        categoriesFilter,
        locationFilter,
        rankOrgCompanyFilter,
        revenueRangeFilter,
        isCheckedFilter,
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

        if (typeof item.isChecked !== "boolean") {
          console.error(`isChecked is not a boolean for`, item);
        }
        const isCheckedMatches =
          isCheckedFilter.length === 0 ||
          isCheckedFilter.includes(item.isChecked.toString());

        return (
          nameMatches &&
          numEmployeesMatches &&
          categoriesMatch &&
          locationsMatch &&
          rankMatches &&
          revenueMatches &&
          isCheckedMatches
        );
      });

      setFilteredData(filtered);
    },
    [originalData]
  );

  const sortedData = useMemo(() => {
    let sorted = [...filteredData];
    const sortColumn = activeSort.column;

    if (sortColumn === "numEmployeesEnum") {
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
    } else if (sortColumn === "revenueRange") {
      sorted.sort((a, b) => {
        const aIndex = REV_OPTIONS.indexOf(a.revenueRange);
        const bIndex = REV_OPTIONS.indexOf(b.revenueRange);
        if (aIndex === -1) {
          console.error(
            `unknown revenueRange filter value [${a.revenueRange}]`
          );

          return 1;
        }
        if (bIndex === -1) {
          console.error(
            `unknown revenueRange filter value [${b.revenueRange[0]}]`
          );

          return -1;
        }

        return activeSort.order === "asc" ? aIndex - bIndex : bIndex - aIndex;
      });
    } else {
      sorted.sort((a, b) => {
        const aValue = parseInt(a[sortColumn] as any);
        const bValue = parseInt(b[sortColumn] as any);

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
      currentFilters.revenueRangeFilter,
      currentFilters.isCheckedFilter
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentFilters.categoriesFilter,
    currentFilters.locationFilter,
    currentFilters.nameFilter,
    currentFilters.numEmployeesFilter,
    currentFilters.rankOrgCompanyFilter,
    currentFilters.revenueRangeFilter,
    currentFilters.isCheckedFilter,
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
