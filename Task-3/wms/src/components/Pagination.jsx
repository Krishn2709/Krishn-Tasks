"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import styles from "../styles/pagination.module.scss";

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader2 className={styles.spinner} />
      </div>
    );
  }

  const pageRange = 2;
  const pageNumbers = [];
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(startItem + itemsPerPage - 1, totalItems);

  for (
    let i = Math.max(1, currentPage - pageRange);
    i <= Math.min(totalPages, currentPage + pageRange);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.pagination}>
      <div className={styles.paginationLeft}>
        Showing {startItem} to {endItem} of {totalItems}
      </div>

      <div className={styles.paginationRight}>
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>

        {currentPage > pageRange + 1 && (
          <>
            <span className={styles.pageNumber} onClick={() => onPageChange(1)}>
              1
            </span>
            <span>...</span>
          </>
        )}

        {pageNumbers.map((page) => (
          <span
            key={page}
            className={`${styles.pageNumber} ${
              page === currentPage ? styles.active : ""
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </span>
        ))}

        {currentPage < totalPages - pageRange && (
          <>
            <span>...</span>
            <span
              className={styles.pageNumber}
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </span>
          </>
        )}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export { Pagination };
