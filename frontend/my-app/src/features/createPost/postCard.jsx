import { useEffect, useState } from "react";
import "./createPost.css";
import GenericForm from "./genericForm";
import CreateCommentList from "../createComment/createCommentList";
const PostCard = ({ data }) => {
  const [commentsForPost, setCommentsForPost] = useState([]);

  const onHandleSubmit = (e, formState) => {
    e.preventDefault();

    let commentData = {
      content: formState?.content,
    };

    fetch(`http://localhost:4001/posts/${data?.id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    })
      .then((e) => {
        console.log("comment is created", e);
      })
      .catch((err) => {
        console.log("Something bad happened", err);
      });
  };

  let getCommentsForPost = (data) => {
    fetch(`http://localhost:4001/posts/${data?.id}/comments`)
      .then((response) => response.json())
      .then((e) => {
        setCommentsForPost(e);
      })
      .catch((error) => {
        console.log("Error occurred while getting posts", error);
      })
      .finally(() => {});
  };

  useEffect(() => {
    getCommentsForPost(data);
  }, [data]);

  return (
    <div className="card">
      <h2>{data?.title}</h2>
      <CreateCommentList commentList={commentsForPost} />
      <GenericForm onHandleSubmit={onHandleSubmit} />
    </div>
  );
};

export default PostCard;
