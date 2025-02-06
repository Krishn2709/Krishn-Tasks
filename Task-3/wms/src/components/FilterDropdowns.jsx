import styles from "../styles/search-filter-sort.module.scss";
import React, { useCallback } from "react";
import {
  searchManufacturers,
  searchMolecules,
} from "../redux/slices/productSlice";
import Dropdown from "./DropDown";
import { useDispatch } from "react-redux";

const FilterDropdowns = ({
  filters,
  manufacturers,
  molecules,
  onFilterChange,
}) => {
  const dispatch = useDispatch();

  const handleManufacturerClick = useCallback(() => {
    if (manufacturers.length === 0) {
      dispatch(searchManufacturers());
    }
  }, [dispatch, manufacturers.length]);

  const handleMoleculeClick = useCallback(() => {
    if (molecules.length === 0) {
      dispatch(searchMolecules());
    }
  }, [dispatch, molecules.length]);
  if (!filters.showFilters) return null;

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterGroup}>
        <Dropdown
          options={[
            { value: "", label: "IsAssured" },
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ]}
          selectedValue={filters.isAssured}
          onChange={(value) => onFilterChange("isAssured", value)}
        />
      </div>

      <div className={styles.filterGroup}>
        <Dropdown
          options={[
            { value: "", label: "IsRefrigerated" },
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ]}
          selectedValue={filters.isRefrigerated}
          onChange={(value) => onFilterChange("isRefrigerated", value)}
        />
      </div>

      <div className={styles.filterGroup}>
        <Dropdown
          options={[
            { value: "", label: "Status" },
            { value: "Published", label: "Published" },
            { value: "Unpublished", label: "Unpublished" },
            { value: "Draft", label: "Draft" },
          ]}
          selectedValue={filters.status}
          onChange={(value) => onFilterChange("status", value)}
        />
      </div>

      <div className={styles.filterGroup}>
        <select
          value={filters.manufacturer}
          onChange={(e) => onFilterChange("manufacturer", e.target.value)}
          onClick={handleManufacturerClick}
        >
          <option value="">Manufacturer</option>
          {manufacturers.map((mfr) => (
            <option key={mfr.id} value={mfr.id}>
              {mfr.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <select
          value={filters.combination}
          onChange={(e) => onFilterChange("combination", e.target.value)}
          onClick={handleMoleculeClick}
        >
          <option value="">Combination</option>
          {molecules.map((molecule) => (
            <option key={molecule.id} value={molecule.id}>
              {molecule.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export { FilterDropdowns };
