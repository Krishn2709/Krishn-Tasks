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
import Dropdown from "@/components/DropDown";
import tableConfig from "../../data/tableConfig";

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

  const queryParamsString = useMemo(
    () =>
      JSON.stringify({
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
  }, [dispatch, isAuthenticated, queryParamsString]);

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
    router.push("/login");
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

  const handleOnClick = (action, data) => {
    if (action == "edit") {
      router.push("/product-master/edit-product/" + data?.product_id);
    }
    if (action == "copy") {
      router.push("/product-master/copy-product/" + data?.product_id);
    }
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
                placeholder={"Search by..."}
              />
              <Dropdown
                options={searchFields}
                selectedValue={filters.searchField}
                onChange={handleSearchFieldChange}
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
            <ProductList
              products={products}
              tableConfig={tableConfig}
              handleOnClick={handleOnClick}
            />

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
