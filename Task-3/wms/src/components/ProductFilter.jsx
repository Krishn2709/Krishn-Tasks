import styles from "../styles/search-filter-sort.module.scss";
import React, { useState, useRef, useEffect } from "react";

const SearchField = ({
  searchText,
  searchField,
  onSearchChange,
  onFieldChange,
}) => {
  const searchFields = [
    { value: "product_code", label: "Product Code" },
    { value: "ws_code", label: "Wondersoft Code" },
    { value: "name", label: "Product Name" },
    { value: "manufacturer", label: "Manufacturer" },
  ];

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchDiv}>
        <img
          alt="Masters Icon"
          width="24"
          height="24"
          className="navbar_navSvg__dKsEM"
          src="https://stage.mkwms.dev/assets/navbar-menu/Search-icon.svg"
        />
        <input
          type="text"
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search..."
          className={styles.searchInput}
        />
      </div>

      <select
        value={searchField}
        onChange={(e) => onFieldChange(e.target.value)}
        className={styles.searchSelect}
      >
        {searchFields.map((field) => (
          <option key={field.value} value={field.value}>
            {field.label}
          </option>
        ))}
      </select>
    </div>
  );
};

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
        <label>IsAssured</label>
        <select
          value={filters.isAssured}
          onChange={(e) => onFilterChange("isAssured", e.target.value)}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label>IsRefrigerated</label>
        <select
          value={filters.isRefrigerated}
          onChange={(e) => onFilterChange("isRefrigerated", e.target.value)}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label>Status</label>
        <select
          value={filters.status}
          onChange={(e) => onFilterChange("status", e.target.value)}
        >
          <option value="">Select</option>
          <option value="Published">Published</option>
          <option value="Unpublished">Unpublished</option>
          <option value="Draft">Draft</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label>Manufacturer</label>
        <select
          value={filters.manufacturer}
          onChange={(e) => onFilterChange("manufacturer", e.target.value)}
          onClick={onManufacturerClick}
        >
          <option value="">Select</option>
          {manufacturers.map((mfr) => (
            <option key={mfr.id} value={mfr.id}>
              {mfr.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label>Combination</label>
        <select
          value={filters.combination}
          onChange={(e) => onFilterChange("combination", e.target.value)}
          onClick={onMoleculeClick}
        >
          <option value="">Select</option>
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

const SortByDropdown = ({ sorting, onSortChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: "product_code", label: "Product Code" },
    { value: "ws_code", label: "Wondersoft Code" },
    { value: "name", label: "Product Name" },
    { value: "created", label: "Created at" },
    { value: "modified", label: "Updated at" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSortClick = (direction) => {
    if (selectedField) {
      onSortChange({ field: selectedField, direction });
      setShowDropdown(false);
    }
  };

  const handleFieldSelect = (field) => {
    setSelectedField(field);
  };

  return (
    <div className={styles.sortContainer} ref={dropdownRef}>
      <button
        className={styles.sortButton}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <img
          src="https://stage.mkwms.dev/assets/table/sortIcon.svg"
          alt="Masters Icon"
          width="20"
          height="20"
          className={styles.navSvg}
        />
        Sort By
      </button>
      {showDropdown && (
        <div className={styles.sortDropdown}>
          {sortOptions.map((option) => (
            <div key={option.value}>
              <label key={option.value} className={styles.sortOption}>
                <input
                  type="checkbox"
                  checked={selectedField === option.value}
                  onChange={() => handleFieldSelect(option.value)}
                />
                {option.label}
              </label>
            </div>
          ))}

          <div className={styles.sortDirections}>
            <button
              className={styles.directionButton}
              disabled={!selectedField}
              onClick={() => handleSortClick("a")}
            >
              ↑ Ascending
            </button>
            <button
              className={styles.directionButton}
              disabled={!selectedField}
              onClick={() => handleSortClick("d")}
            >
              ↓ Descending
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export { SearchField, FilterDropdowns, SortByDropdown };
