import { useState } from "react";
import "./createPost.css";
const CreatePostForm = ({ refetch }) => {
  const [formState, setFormState] = useState({ title: "" });

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, title: e?.target?.value }));
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();

    let postData = {
      title: formState?.title,
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
        refetch();
      })
      .catch((err) => {
        console.log("Something bad happened", err);
      });
  };

  return (
    <>
      <form onSubmit={onHandleSubmit}>
        <div className="form-item">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formState?.title}
            onChange={handleChange}
            placeholder="Please write the name of your post"
          />
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};

export default CreatePostForm;
