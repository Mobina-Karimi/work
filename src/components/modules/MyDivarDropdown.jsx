import React from "react";
import styles from "./MyDivarDropdown.module.css";
import { getCookie } from "utils/cookie";

function MyDivarDropdown({ onLogout }) {
  
  const handleLoginClick = () => {
    window.location.href = "/dashboard"

    const accessToken = getCookie("accessToken"); // بررسی وجود کوکی
    if (accessToken) {
      // اگر کوکی وجود داشت به داشبورد برو
      window.location.href = "/dashboard";
    } else {
      // اگر کوکی وجود نداشت به صفحه ورود برو
      window.location.href = "/auth";
    }
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.option} onClick={handleLoginClick}>
        ورود به حساب کاربری
      </div>
      <div className={styles.option} onClick={onLogout}>
        خروج از حساب کاربری
      </div>
    </div>
  );
}

export default MyDivarDropdown;
