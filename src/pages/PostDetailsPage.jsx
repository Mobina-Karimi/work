import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './PostDetailsPage.module.css';

function PostDetailsPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`${baseUrl}post/${id}`);
        console.log(response.data);
        setPost(response.data.post);
      } catch (error) {
        console.error('Failed to fetch post details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [id]);

  if (loading) return <p>در حال بارگذاری...</p>;
  
  if (!post) return <p>پستی پیدا نشد.</p>;

  return (
    <div className={styles.detailsContainer}>
        <div className={styles.imageSection}>
            <img src={`${baseUrl}${post.images[0]}`} alt={post.options.title} />
        </div>
        <div className={styles.infoSection}>
            <h1>{post.options.title}</h1>
            <p>
                <span>قیمت: </span>
                {post.amount.toLocaleString()} تومان
            </p>
            <p>
                <span>آدرس: </span>
                {post.options.city}
            </p>
            <p>
                <span className={styles.phoneNumber}>شماره تلفن:</span><br />
                {post.options.phoneNumber}
            </p>
            <p>
                <span className={styles.content}>توضیحات:</span><br />
                {post.options.content}
            </p>
        </div>
    </div>
  );
}

export default PostDetailsPage;
