import styles from "../styles/search-filter-sort.module.scss";
import React, { useCallback } from "react";
import {
  fetchManufacturers,
  fetchMolecules,
  searchManufacturers,
  searchMolecules,
} from "../redux/slices/productSlice";
import Dropdown from "./DropDown";
import { useDispatch, useSelector } from "react-redux";

const FilterDropdowns = ({ filters, onFilterChange }) => {
  const dispatch = useDispatch();

  const { manufacturers, molecules } = useSelector((state) => state.products);

  const handleManufacturerClick = useCallback(() => {
    if (manufacturers.length === 0) {
      dispatch(fetchManufacturers());
    }
  }, [dispatch]);

  const handleManufacturerSearch = (text) => {
    dispatch(searchManufacturers(text));
  };

  const handleMoleculeSearch = (text) => {
    dispatch(searchMolecules(text));
  };

  const handleMoleculeClick = useCallback(() => {
    if (molecules.length === 0) {
      dispatch(fetchMolecules());
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

      <div className={styles.filterGroup} onClick={handleManufacturerClick}>
        <Dropdown
          options={[
            { value: "", label: "Manufacturer" },
            ...manufacturers.map((mfr) => ({
              value: mfr.id,
              label: mfr.name,
            })),
          ]}
          selectedValue={filters.manufacturer}
          onChange={(value) => onFilterChange("manufacturer", value)}
          onSearch={handleManufacturerSearch}
        />
      </div>

      <div className={styles.filterGroup} onClick={handleMoleculeClick}>
        <Dropdown
          options={[
            { value: "", label: "Molecule" },
            ...molecules.map((molecule) => ({
              value: molecule.id,
              label: molecule.name,
            })),
          ]}
          selectedValue={filters.combination}
          onChange={(value) => onFilterChange("combination", value)}
          onSearch={handleMoleculeSearch}
        />
      </div>
    </div>
  );
};

export { FilterDropdowns };
