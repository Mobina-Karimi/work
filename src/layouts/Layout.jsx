import Header from "./Header";
import Footer from "./Footer";
import styles from "./Layout.module.css";

function Layout({ children, searchQuery, setSearchQuery }) {
  return (
    <>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className={styles.main}>{children}</div>
      <Footer />
    </>
  );
}

export default Layout;

