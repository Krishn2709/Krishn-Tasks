import styles from "../styles/special-search.module.scss";
import React from "react";

const SearchSpecial = ({ searchText, onSearchChange, placeholder }) => {
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className={styles.searchInput}
      />
    </div>
  );
};

export { SearchSpecial };
