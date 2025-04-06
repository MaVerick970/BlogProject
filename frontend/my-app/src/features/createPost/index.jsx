import { useEffect, useState } from "react";
import "./createPost.css";
import CreatePostForm from "./createPostForm";
import PostCard from "./postCard";

const CreatePost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPosts = () => {
    setLoading(true);
    fetch("http://localhost:4000/posts")
      .then((response) => response.json())
      .then((e) => {
        setPosts(e);
      })
      .catch((error) => {
        console.log("Error occurred while getting posts", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <h1 className="heading">Create Post</h1>
      <CreatePostForm refetch={getPosts} />
      <hr />
      {loading ? (
        <p>...loading</p>
      ) : (
        <div className="grid-card">
          {Object.keys(posts).map((key) => (
            <PostCard data={posts[key]} />
          ))}
        </div>
      )}
    </>
  );
};

export default CreatePost;
