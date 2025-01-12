import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCategory, deleteAllPosts } from 'services/admin';
import styles from "./CategoryForm.module.css";

function CategoryForm() {
    const queryClient = useQueryClient();
    const [form, setForm] = useState({ name: '', slug: '', icon: '' });
    const [successMessage, setSuccessMessage] = useState('');

    // Mutation for adding category
    const { mutate: addCategoryMutate, isLoading: isAddingCategory, error: addError } = useMutation(
        addCategory,
        {
            onSuccess: () => {
                queryClient.invalidateQueries('get-categories');
                setForm({ name: '', slug: '', icon: '' }); // Reset form fields
                setSuccessMessage('دسته بندی با موفقیت اضافه شد.');
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000); // Clear success message after 3 seconds
            },
            onError: (error) => {
                console.error('Error adding category:', error);
            },
        }
    );

    // Mutation for deleting all posts
    const { mutate: deleteAllPostsMutate, isLoading: isDeletingPosts, error: deleteError } = useMutation(
        deleteAllPosts,
        {
            onSuccess: () => {
                queryClient.invalidateQueries('post-list'); // Invalidate the post list cache to update UI
                setSuccessMessage('همه آگهی‌ها با موفقیت حذف شدند.');
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            },
            onError: (error) => {
                console.error('Error deleting all posts:', error);
            },
        }
    );

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (!form.name || !form.slug || !form.icon) {
            alert('لطفاً تمام فیلدها را پر کنید.');
            return;
        }
        addCategoryMutate(form);
    };

    const handleDeleteAllPosts = () => {
        // if (window.confirm('آیا مطمئن هستید که می‌خواهید همه آگهی‌ها را حذف کنید؟')) {
        //     deleteAllPostsMutate();
        // }
        deleteAllPostsMutate();
    };

    return (
        <>
            <form onSubmit={submitHandler} className={styles.form}>
                <h3>دسته بندی جدید</h3>
                {!!addError && <p>مشکلی پیش آمده است: {addError.message}</p>}
                {successMessage && <p>{successMessage}</p>}
                <label htmlFor="name">اسم دسته بندی</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={form.name}
                    onChange={changeHandler}
                />
                <label htmlFor="slug">اسلاگ</label>
                <input
                    type="text"
                    name="slug"
                    id="slug"
                    value={form.slug}
                    onChange={changeHandler}
                />
                <label htmlFor="icon">آیکون</label>
                <input
                    type="text"
                    name="icon"
                    id="icon"
                    value={form.icon}
                    onChange={changeHandler}
                />
                <button type="submit" disabled={isAddingCategory}>
                    {isAddingCategory ? 'در حال ایجاد...' : 'ایجاد'}
                </button>
            </form>

            {/* دکمه حذف همه آگهی‌ها */}
            <div className={styles.adminPanel}>
                <h3>حذف همه آگهی ها</h3>
                {!!deleteError && <p>مشکلی پیش آمده است: {deleteError.message}</p>}
                <button onClick={handleDeleteAllPosts} disabled={isDeletingPosts}>
                    {isDeletingPosts ? 'در حال حذف...' : 'حذف همه آگهی‌ها'}
                </button>
            </div>
        </>
    );
}

export default CategoryForm;
