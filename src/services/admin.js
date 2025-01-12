import api from "configs/api"

const addCategory = (data) => api.post("category",data)

const getCategory = () => api.get("category")

const deleteCategory = (id) => api.delete(`category/${id}`)

const deleteAllPosts = async () => {
    const response = await api.delete('post/delete-all');
    return response.data;
};

export {addCategory, getCategory, deleteCategory, deleteAllPosts}