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
} from "../../redux/slices/productSlice";

const page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  console.log("Component mounted");
  const isAuthenticated = localStorage.getItem("token");
  const { products, loading, error, pagination } = useSelector((state) => {
    console.log("Redux State:", state);
    return state.products;
  });

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProductsRequest(pagination.currentPage));
    } else {
      router.push("/login");
    }
  }, [dispatch, pagination.currentPage, isAuthenticated]);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) {
    router.push("/login");
  }

  // Check if pagination values are available, if not, set fallback values
  const totalProducts = pagination.totalProducts || 0;
  const productsPerPage = pagination.productsPerPage || 10; // Default to 10 if not provided

  const startProduct = (pagination.currentPage - 1) * productsPerPage + 1;
  const endProduct = Math.min(
    pagination.currentPage * productsPerPage,
    totalProducts
  );

  // Generate the range of pages to display
  const pageNumbers = [];
  const pageRange = 2; // Number of pages before and after the current page
  const totalPages = pagination.lastPage || 1; // Default to 1 page if not defined

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
      <div className={styles.productHeader}>
        <button> + Add</button>
      </div>
      <div className={styles.productContainer}>
        <ProductList products={products} />

        <div className={styles.pagination}>
          <div className={styles.paginationLeft}>
            Showing {startProduct} to {endProduct} of {totalProducts}
          </div>

          <div className={styles.paginationRight}>
            <button
              disabled={pagination.currentPage === 1}
              onClick={() => handlePageChange(pagination.currentPage - 1)}
            >
              Previous
            </button>

            {pagination.currentPage > pageRange + 1 && (
              <>
                <span
                  className={styles.pageNumber}
                  onClick={() => handlePageChange(1)}
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
                onClick={() => handlePageChange(page)}
              >
                {page}
              </span>
            ))}

            {pagination.currentPage < totalPages - pageRange && (
              <>
                <span>...</span>
                <span
                  className={styles.pageNumber}
                  onClick={() => handlePageChange(totalPages)}
                >
                  {totalPages}
                </span>
              </>
            )}

            <button
              disabled={pagination.currentPage === totalPages}
              onClick={() => handlePageChange(pagination.currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
