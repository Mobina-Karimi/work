import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Main from "components/templates/Main";
import Sidebar from "components/templates/Sidebar";
import { getAllPosts } from "services/user";
import Loader from "components/modules/Loader";
import { getCategory } from "services/admin";
import styles from "./HomePage.module.css"; 
const categoryKeywords = {
  "املاک": ["خانه", "ملک", "مسکن"],
  "خودرو": ["ماشین", "خودرو", "موتور"],
  "کالای دیجیتال": ["ساعت", "موبایل", "تلفن همراه", "گوشی", "تلویزیون", "tv", "laptop", "لپتاپ", "کامپیوتر", "رایانه", "هوشمند", "لپ تاپ", "لبتاب", "لب تاب"],
  "وسایل شخصی": ["ساعت", "لباس", "پیراهن", "شلوار", "کفش", "کیف", "مانتو", "ارابشی", "انگشتر", "گردنبند", "گوشواره"],
  "سرگرمی": ["تور", "دوچرخه", "موسیقی", "ورزش", "اسباب بازی", "بلیط"],
  "خدمات": ["شرکت", "اموزش", "تعمیرات", "تعمیر", "نصب", "سرویس", "مدل", "نظافت", "کار", "استخدام"],
};

function HomePage({ searchQuery, setSearchQuery }) {
  const [selectedCategory, setSelectedCategory] = useState("همه");

  const { data: posts, isLoading: postLoading } = useQuery(["post-list"], getAllPosts);
  const { data: categories, isLoading: categoryLoading } = useQuery(["get-categories"], getCategory);

  const categoryList = categories ? [...categories.data] : [];

  if (!categoryList.some(category => category.name === "همه")) {
    categoryList.unshift({ name: "همه", slug: "all" });
  }

  const filteredPosts = posts?.data?.posts.filter(post => {
    const title = post?.options?.title?.toLowerCase() || "";
    const description = post?.options?.description?.toLowerCase() || "";

    const matchesKeywords = Object.entries(categoryKeywords).some(([category, keywords]) => {
      return selectedCategory === category &&
             keywords.some(keyword => title.includes(keyword) || description.includes(keyword));
    });

    const matchesSearch = title.includes(searchQuery.toLowerCase()) ||
                          description.includes(searchQuery.toLowerCase());

    return (selectedCategory === "همه" || matchesKeywords) && matchesSearch;
  });

  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  return (
    <div className={styles.homePage}>
      {(postLoading || categoryLoading) ? (
        <Loader />
      ) : (
        <div className={styles.pageContent}>
          <Sidebar
            categories={categoryList}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategoryChange}
          />
          <Main posts={{ data: { posts: filteredPosts } }} />
        </div>
      )}
    </div>
  );
}

export default HomePage;
