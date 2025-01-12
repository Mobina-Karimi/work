// import axios from "axios";
import api from "configs/api"

const addCategory = (data) => api.post("category",data)

const getCategory = () => api.get("category")

const deleteCategory = (id) => api.delete(`category/${id}`)

const deleteAllPosts = async () => {
    const response = await api.delete('post/delete-all');
    return response.data;
};

//اضافه شد
// const updatePost = async (postId, postData) => {
//     const response = await axios.put(`/api/posts/edit/${postId}`, postData);
//     return response.data;
// };

// const updatePost = async (postId, postData) => {
//     try {
//         const response = await axios.put(`/api/posts/edit/${postId}`, postData);
//         return response.data;
//     } catch (error) {
//         console.error("خطا در به‌روزرسانی پست:", error);
//         throw new Error('خطا در به‌روزرسانی پست'); // مدیریت خطا
//     }
// };

export {addCategory, getCategory, deleteCategory, deleteAllPosts}