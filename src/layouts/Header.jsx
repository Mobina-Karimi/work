import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import MyDivarDropdown from "components/modules/MyDivarDropdown";

function Header({ searchQuery, setSearchQuery }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null); // رفرنس به دراپ‌داون
  const profileButtonRef = useRef(null); // رفرنس به دکمه پروفایل

  const handleLogout = () => {
    document.cookie = "accessToken=; max-age=0; path=/";
    document.cookie = "refreshToken=; max-age=0; path=/";
    window.location.href = "/";
  };

  const handleClickOutside = (e) => {
    // بررسی اینکه آیا کلیک خارج از دراپ‌داون و دکمه پروفایل است
    if (
      dropdownRef.current && 
      !dropdownRef.current.contains(e.target) && 
      !profileButtonRef.current.contains(e.target)
    ) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    // افزودن رویداد کلیک به window
    window.addEventListener("click", handleClickOutside);

    return () => {
      // حذف رویداد هنگام پاک کردن کامپوننت
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.rightSection}>
        <Link to="/">
          <img src="divar.svg" className={styles.logo} />
        </Link>
        <span className={styles.location}>
          <img src="location.svg" />
          <p>تهران</p>
        </span>
      </div>
      <div>
        <input
          type="text"
          placeholder="جستجو در همه آگهی ها"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchBox}
        />
      </div>
      <div className={styles.leftSection}>
        <span
          ref={profileButtonRef}
          onClick={(e) => {
            e.stopPropagation(); // جلوگیری از بسته شدن دراپ‌داون هنگام کلیک روی دکمه پروفایل
            setDropdownVisible(!dropdownVisible); // تغییر وضعیت دراپ‌داون
          }}
          className={styles.profileButton}
        >
          <img src="profile.svg" />
          <p>دیوار من</p>
        </span>
        {dropdownVisible && (
          <div ref={dropdownRef} className="dropdown">
            <MyDivarDropdown onLogout={handleLogout} />
          </div>
        )}
        <Link to="/dashboard" className={styles.button}>ثبت آگهی</Link>
      </div>
    </header>
  );
}

export default Header;
