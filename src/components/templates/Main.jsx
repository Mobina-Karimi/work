import { sp } from "utils/numbers";
import styles from "./Main.module.css";
import { useNavigate } from "react-router-dom";

function Main({ posts }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();

  const ShowDetailsHandler = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div className={styles.container}>
      {posts.data.posts.length > 0 ? (
        posts.data.posts.map(post => (
          <div key={post._id} className={styles.card}>
            <div className={styles.info}>
              <div>
                <p>{post.options.title}</p>
                <span>قیمت: {sp(post.amount)} تومان</span>
              </div>
              <button onClick={() => ShowDetailsHandler(post._id)}>نمایش جزییات</button>
            </div>
            <img src={`${baseUrl}${post.images[0]}`} alt={post.options.title} />
          </div>
        ))
      ) : (
        <p>هیچ آگهی‌ای مطابق با جستجوی شما پیدا نشد.</p>
      )}
    </div>
  );
}

export default Main;
