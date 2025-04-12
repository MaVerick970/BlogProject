import { useEffect, useState } from "react";
import "./createPost.css";
import PostCard from "./postCard";
import GenericForm from "./genericForm";

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

  const onHandleSubmit = (e, formState) => {
    e.preventDefault();

    let postData = {
      title: formState?.content,
    };

    fetch(`http://localhost:4000/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((e) => {
        console.log("Post is created", e);
        getPosts();
      })
      .catch((err) => {
        console.log("Something bad happened", err);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <h1 className="heading">Create Post</h1>
      <GenericForm onHandleSubmit={onHandleSubmit} />
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
