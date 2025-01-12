import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategory } from "services/admin";
import Loader from "../modules/Loader";
import { deleteCategory } from "services/admin";
import styles from "./CategoryList.module.css";
import { useState } from "react";

function CategoryList() {
    const queryClient = useQueryClient();
    const [deletedCategory, setDeletedCategory] = useState(null);
    const { data, isLoading } = useQuery(["get-categories"], getCategory);

    const { mutate: deleteCat, isLoading: isDeleting } = useMutation(
        (id) => deleteCategory(id),
        {
            onSuccess: (_, variables) => {
                queryClient.invalidateQueries(["get-categories"]);
                const category = data.data.find((i) => i._id === variables);
                setDeletedCategory(category.name);
                
                // Reset deletedCategory after 3 seconds
                setTimeout(() => {
                    setDeletedCategory(null);
                }, 3000);
            },
        }
    );

    const handleDelete = (id) => {
        deleteCat(id);
    };

    // فیلتر کردن دسته‌بندی‌ها تا تنها یک نمونه از "همه" وجود داشته باشد
    const uniqueCategories = data?.data.filter((category, index, self) =>
        index === self.findIndex((c) => c.name === category.name)
    );

    return (
        <div className={styles.list}>
            {deletedCategory && (
                <p className={styles.deleteMessage}>
                    دسته‌بندی "{deletedCategory}" با موفقیت حذف شد.
                </p>
            )}
            {isLoading ? <Loader /> : uniqueCategories.map((i) => (
                <div key={i._id}>
                    <img src={`${i.icon}.svg`} alt={i.name} />
                    <h5>{i.name}</h5>
                    <p>slug: {i.slug}</p>
                    <button onClick={() => handleDelete(i._id)} disabled={isDeleting}>
                        حذف
                    </button>
                </div>
            ))}
        </div>
    );
}

export default CategoryList;

