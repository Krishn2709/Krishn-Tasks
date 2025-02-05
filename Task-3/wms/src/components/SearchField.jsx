import styles from "../styles/search-filter-sort.module.scss";
import React from "react";

const SearchField = ({ searchText, onSearchChange, placeholder }) => {
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
          placeholder={placeholder}
          className={styles.searchInput}
        />
      </div>
    </div>
  );
};

export { SearchField };
