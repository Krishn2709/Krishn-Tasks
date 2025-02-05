import styles from "../styles/search-filter-sort.module.scss";
import React from "react";

const FilterDropdowns = ({
  filters,
  manufacturers,
  molecules,
  onFilterChange,
  onManufacturerClick,
  onMoleculeClick,
}) => {
  if (!filters.showFilters) return null;

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterGroup}>
        <select
          value={filters.isAssured}
          onChange={(e) => onFilterChange("isAssured", e.target.value)}
        >
          <option value="">IsAssured</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <select
          value={filters.isRefrigerated}
          onChange={(e) => onFilterChange("isRefrigerated", e.target.value)}
        >
          <option value="">IsRefrigerated</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <select
          value={filters.status}
          onChange={(e) => onFilterChange("status", e.target.value)}
        >
          <option value="">Status</option>
          <option value="Published">Published</option>
          <option value="Unpublished">Unpublished</option>
          <option value="Draft">Draft</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <select
          value={filters.manufacturer}
          onChange={(e) => onFilterChange("manufacturer", e.target.value)}
          onClick={onManufacturerClick}
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
          onClick={onMoleculeClick}
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
