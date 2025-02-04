"use client";

import React from "react";
import { logout } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import styles from "../styles/navbar.module.scss";

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout());
    router.push("/login");
  };

  const handleClick = () => {
    router.push("/product-master");
  };

  return (
    <div className={styles.header}>
      <div className={styles.headerTop}>
        <div className={styles.headerTopLeft}>
          <div className={styles.logo}>
            <img
              src="https://stage.mkwms.dev/assets/medcart-logo.svg"
              alt="Masters Icon"
              width="150"
              height="150"
              className={styles.navLogo}
            />
          </div>
          <div className={styles.searchDiv}>
            <img
              src="https://stage.mkwms.dev/assets/navbar-menu/Search-icon.svg"
              alt="Masters Icon"
              width="24"
              height="24"
              className={styles.navSvg}
            />
            <input
              type="text"
              className={styles.searchBar}
              placeholder="Search here..."
            />
          </div>
          <button className={styles.createButton}>Create</button>
        </div>
        <div className={styles.headerTopRight}>
          <div className={styles.HOicon}>
            HO
            <img
              src="https://stage.mkwms.dev/assets/navbar-menu/dropdown-arrow.svg"
              alt="Masters Icon"
              width="12"
              height="12"
              className={styles.HoSvg}
            />
          </div>
          <img
            src="https://stage.mkwms.dev/assets/navbar-menu/notification-bell.svg"
            alt="Masters Icon"
            width="24"
            height="24"
          />
          <button className={styles.logoutButton} onClick={handleLogout}>
            kP
          </button>
        </div>
      </div>

      <div className={styles.headerBottom}>
        <button className={styles.navButton}>
          <img
            src="https://stage.mkwms.dev/assets/navbar-menu/Dashboard.svg"
            alt="Masters Icon"
            width="25"
            height="25"
            className={`${styles.navSvg} ${styles.navDashboard}`}
          />
          Dashboard
        </button>
        <button className={styles.navButton} onClick={handleClick}>
          <img
            src="https://stage.mkwms.dev/assets/navbar-menu/Masters.svg"
            alt="Masters Icon"
            width="25"
            height="25"
            className={styles.navSvg}
          />
          Product Masters
        </button>
        <button className={styles.navButton}>
          <img
            src="https://stage.mkwms.dev/assets/navbar-menu/Settings.svg"
            alt="Masters Icon"
            width="25"
            height="25"
            className={styles.navSvg}
          />
          Settings
        </button>
      </div>
    </div>
  );
};

export default Header;
