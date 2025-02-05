"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "../styles/navigator.module.scss";

const Navigator = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = "/" + pathSegments.slice(0, index + 1).join("/");
    const displayName = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return {
      path,
      displayName,
    };
  });

  return (
    <div className={styles.navigator}>
      <Link href="/">
        <img
          src="https://stage.mkwms.dev/assets/home_breadcrumb.svg"
          alt="Home"
          width="22"
          height="22"
          className={styles.homeIcon}
        />
      </Link>

      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.path}>
          <img
            src="https://stage.mkwms.dev/assets/breadcrumb_arrow.svg"
            alt="arrow"
            width="8"
            height="8"
            className={styles.arrow}
          />
          <Link
            href={breadcrumb.path}
            className={`${styles.breadcrumbLink} ${
              index === breadcrumbs.length - 1 ? styles.active : ""
            }`}
          >
            {breadcrumb.displayName}
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Navigator;
