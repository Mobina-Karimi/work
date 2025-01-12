import React from "react";
import { useNavigate } from "react-router-dom"; 
import Header from "layouts/Header";
import Footer from "layouts/Footer";
import styles from "./404.module.css";

function PageNoteFound() {

  const navigate = useNavigate(); 

  const handleNavigateHome = () => {
    navigate("/"); 
  };

  return (
    <>
    <Header/>
    <div className={styles.container}>

          <img className={styles.image} src="/404img.png" alt="" />
          <h3>این صفحه حذف شده یا وجود ندارد، برای دیدن  آگهی ها به صفحه اصلی دیوار برگردید.</h3>
          <button onClick={handleNavigateHome} className={styles.button}>صفحه اصلی دیوار</button>
    </div>
    <Footer/>
    </>
  )
}

export default PageNoteFound