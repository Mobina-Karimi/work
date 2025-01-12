import api from "configs/api"

const getProfile = () => api.get("user/whoami").then(res => res || false)


// const getProfile = () => 
//   api.get("user/whoami")
//       .then(res => {
//           return res || false; // برگرداندن کل پاسخ
//       })
//       .catch(error => {
//           console.error("Error fetching profile:", error);
//           throw error;
//       }
// );


const getPosts = () => api.get("post/my")

const getAllPosts = () => api.get("")

const deletePost = (id) => api.delete(`post/delete/${id}`);

// const getPost = (query) => api.get(`post/search?query=${query}`);

const getTitlePosts = (title = "") => {
    console.log(`Fetching posts with title: ${title}`); // برای اشکال‌زدایی
    return api.get("post/search", { params: { title } });
  };

export {getProfile, getPosts, getAllPosts , deletePost, getTitlePosts}
