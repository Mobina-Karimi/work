import { useMutation, useQuery } from "@tanstack/react-query"
import { getPosts } from "services/user"
import Loader from "../modules/Loader"
import { sp } from "utils/numbers"
import { deletePost } from "services/user"
import toast from "react-hot-toast"

import styles from "./PostList.module.css"



function PostList() {
    const baseUrl = import.meta.env.VITE_BASE_URL
    const {data,isLoading,refetch} = useQuery(["my-post-list"],getPosts)

    const { mutate: deletePostMutation, isLoading: isDeleting } = useMutation(
        (id) => deletePost(id),
        {
            onSuccess: (deletedPostId) => {
            toast.success("آگهی با موفقیت حذف شد.");

            const updatedPosts = data.data.posts.filter(post => post._id !== deletedPostId);
            data.data.posts = updatedPosts;
    
            refetch();
          },
          onError: () => {
            toast.error("مشکلی در حذف آگهی پیش آمد.");
          },
        }
      );
    

    const deleteHandler = (id) => {
        deletePostMutation(id);
    };
    
  return (
    <div className={styles.list}>
        {
            isLoading ? (<Loader/>) : (
                <>
                <h3>آگهی های شما</h3>
                {
                    data.data.posts.map(post => (
                        <div key={post._id} className={styles.post}>
                            <img src={`${baseUrl}${post.images[0]}`}/>
                            <div>
                                <p>{post.options.title}</p>
                                <span>{post.options.content}</span>
                            </div>
                            <div className={styles.price}>
                                <p>{new Date(post.createdAt).toLocaleDateString("fa-IR")} </p>
                                <span>{sp(post.amount)} تومان</span>
                            </div>
                            <button onClick={() => deleteHandler(post._id)} disabled={isDeleting}>
                                حذف
                            </button>
                        </div>
                    ))
                }
                </>
            )
        }
    </div>
  )
}

export default PostList
