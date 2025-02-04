"use client";

import Navbar from "../../components/Navbar";
import styles from "../../styles/product-master.module.scss";
import ProductList from "@/components/ProductList";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsRequest,
  setCurrentPage,
  setSearchFilter,
  setFilter,
  toggleFilters,
  clearFilters,
  setSorting,
  fetchManufacturersRequest,
  fetchMoleculesRequest,
} from "../../redux/slices/productSlice";
import {
  SearchField,
  FilterDropdowns,
  SortByDropdown,
} from "../../components/ProductFilter";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = localStorage.getItem("token");

  const {
    products,
    loading,
    error,
    pagination,
    filters,
    sorting,
    manufacturers,
    molecules,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProductsRequest());
    } else {
      router.push("/login");
    }
  }, [dispatch, pagination.currentPage, isAuthenticated, filters, sorting]);

  const handleSearchChange = (text) => {
    dispatch(
      setSearchFilter({ searchText: text, searchField: filters.searchField })
    );
  };

  const handleSearchFieldChange = (field) => {
    dispatch(
      setSearchFilter({ searchText: filters.searchText, searchField: field })
    );
  };

  const handleFilterChange = (key, value) => {
    dispatch(setFilter({ key, value }));
  };

  const handleManufacturerClick = () => {
    if (manufacturers.length === 0) {
      dispatch(fetchManufacturersRequest());
    }
  };

  const handleMoleculeClick = () => {
    if (molecules.length === 0) {
      dispatch(fetchMoleculesRequest());
    }
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) {
    console.log(error);
  }

  const productsPerPage = pagination.perPage || 10;
  const startProduct = (pagination.currentPage - 1) * productsPerPage + 1;
  const endProduct = startProduct + productsPerPage - 1;
  const totalProducts = pagination.total;
  const pageNumbers = [];
  const pageRange = 2;
  const totalPages = pagination.lastPage || 1;

  for (
    let i = Math.max(1, pagination.currentPage - pageRange);
    i <= Math.min(totalPages, pagination.currentPage + pageRange);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Navbar />
      <div className={styles.add}>
        <div className={styles.navigator}>
          <img
            src="https://stage.mkwms.dev/assets/home_breadcrumb.svg"
            alt="Masters Icon"
            width="22"
            height="22"
            className={styles.HoSvg}
          />
          <img
            src="https://stage.mkwms.dev/assets/breadcrumb_arrow.svg"
            alt="Masters Icon"
            width="8"
            height="8"
            className={styles.arrow}
          />
          <div className={styles.productMaster}>Product Master</div>
        </div>
        <div>
          <button className={styles.addButton}>+ Add</button>
        </div>
      </div>
      <div className={styles.parentContainer}>
        <div className={styles.mainContainer}>
          <div className={styles.productHeader}>
            <div className={styles.leftControls}>
              <SearchField
                searchText={filters.searchText}
                searchField={filters.searchField}
                onSearchChange={handleSearchChange}
                onFieldChange={handleSearchFieldChange}
              />
            </div>
            <div className={styles.rightControls}>
              <div>
                <button
                  className={styles.filterButton}
                  onClick={() => dispatch(toggleFilters())}
                >
                  <img
                    src="https://stage.mkwms.dev/assets/table/filterIcon.svg"
                    alt="Masters Icon"
                    width="20"
                    height="20"
                    className={styles.navSvg}
                  />
                  {filters.showFilters ? "Hide Filters" : "Filter"}
                </button>
              </div>

              <SortByDropdown
                sorting={sorting}
                onSortChange={(sort) => dispatch(setSorting(sort))}
              />
            </div>

            {filters.showFilters && (
              <div className={styles.filterSection}>
                <FilterDropdowns
                  filters={filters}
                  manufacturers={manufacturers}
                  molecules={molecules}
                  onFilterChange={handleFilterChange}
                  onManufacturerClick={handleManufacturerClick}
                  onMoleculeClick={handleMoleculeClick}
                />
                <button
                  className={styles.clearFiltersButton}
                  onClick={handleClearFilters}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          <div className={styles.productContainer}>
            <ProductList products={products} />

            <div className={styles.pagination}>
              <div className={styles.paginationLeft}>
                Showing {startProduct} to {Math.min(endProduct, totalProducts)}{" "}
                of {totalProducts}
              </div>

              <div className={styles.paginationRight}>
                <button
                  disabled={pagination.currentPage === 1}
                  onClick={() =>
                    dispatch(setCurrentPage(pagination.currentPage - 1))
                  }
                >
                  Previous
                </button>

                {pagination.currentPage > pageRange + 1 && (
                  <>
                    <span
                      className={styles.pageNumber}
                      onClick={() => dispatch(setCurrentPage(1))}
                    >
                      1
                    </span>
                    <span>...</span>
                  </>
                )}

                {pageNumbers.map((page) => (
                  <span
                    key={page}
                    className={`${styles.pageNumber} ${
                      page === pagination.currentPage ? styles.active : ""
                    }`}
                    onClick={() => dispatch(setCurrentPage(page))}
                  >
                    {page}
                  </span>
                ))}

                {pagination.currentPage < totalPages - pageRange && (
                  <>
                    <span>...</span>
                    <span
                      className={styles.pageNumber}
                      onClick={() => dispatch(setCurrentPage(totalPages))}
                    >
                      {totalPages}
                    </span>
                  </>
                )}

                <button
                  disabled={pagination.currentPage === totalPages}
                  onClick={() =>
                    dispatch(setCurrentPage(pagination.currentPage + 1))
                  }
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
