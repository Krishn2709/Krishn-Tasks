"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash/debounce";
import Navbar from "../../components/Navbar";
import styles from "../../styles/product-master.module.scss";
import ProductList from "@/components/ProductList";
import { FilterDropdowns } from "@/components/FilterDropdowns";
import { SearchField } from "@/components/SearchField";
import { SortByDropdown } from "@/components/SortByDropdown";
import { Pagination } from "@/components/Pagination";
import Navigator from "@/components/Navigator";
import Spinner from "@/components/Spinner";
import {
  fetchProductsRequest,
  setCurrentPage,
  setSearchFilter,
  setFilter,
  toggleFilters,
  clearFilters,
  setSorting,
  searchManufacturers,
  searchMolecules,
} from "../../redux/slices/productSlice";

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

  const queryParams = useMemo(
    () => ({
      page: pagination.currentPage,
      filters,
      sorting,
    }),
    [pagination.currentPage, filters, sorting]
  );

  const debouncedSearch = useCallback(
    debounce((text, field) => {
      dispatch(setSearchFilter({ searchText: text, searchField: field }));
    }, 100),
    [dispatch]
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    dispatch(fetchProductsRequest());
  }, [dispatch, isAuthenticated, queryParams]);

  const handleSearchChange = (text) => {
    debouncedSearch(text, filters.searchField);
  };

  const handleSearchFieldChange = (field) => {
    debouncedSearch(filters.searchText, field);
  };

  const handleFilterChange = useCallback(
    (key, value) => {
      dispatch(setFilter({ key, value }));
    },
    [dispatch]
  );

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

  const handleClearFilters = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  const handleSortChange = useCallback(
    (sort) => {
      dispatch(setSorting(sort));
    },
    [dispatch]
  );

  const handlePageChange = useCallback(
    (page) => {
      dispatch(setCurrentPage(page));
    },
    [dispatch]
  );

  if (loading && !products.length)
    return (
      <div className="loading">
        <Spinner size="medium" color="#5556a6" />
      </div>
    );
  if (error) {
    console.error(error);
  }
  const searchFields = [
    { value: "product_code", label: "Product Code" },
    { value: "ws_code", label: "Wondersoft Code" },
    { value: "name", label: "Product Name" },
    { value: "manufacturer", label: "Manufacturer" },
  ];

  const handleAddProduct = () => {
    router.push("/product-master/add-product");
  };

  return (
    <>
      <Navbar />
      <div className={styles.add}>
        <Navigator />
        <div>
          <button className={styles.addButton} onClick={handleAddProduct}>
            + Add
          </button>
        </div>
      </div>
      <div className={styles.parentContainer}>
        <div className={styles.mainContainer}>
          <div className={styles.productHeader}>
            <div className={styles.leftControls}>
              <SearchField
                searchText={filters.searchText}
                onSearchChange={handleSearchChange}
              />
              <select
                value={filters.searchField}
                onChange={(e) => handleSearchFieldChange(e.target.value)}
                className={styles.searchSelect}
              >
                {searchFields.map((field) => (
                  <option key={field.value} value={field.value}>
                    {field.label}
                  </option>
                ))}
              </select>
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
                  Filter
                </button>
              </div>

              <SortByDropdown
                sorting={sorting}
                onSortChange={handleSortChange}
              />
            </div>
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

          <div className={styles.productContainer}>
            <ProductList products={products} />

            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.lastPage || 1}
              totalItems={pagination.total}
              itemsPerPage={pagination.perPage || 10}
              onPageChange={handlePageChange}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
