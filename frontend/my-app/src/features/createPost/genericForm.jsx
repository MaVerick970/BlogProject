import { useState } from "react";
import "./createPost.css";
const GenericForm = ({ onHandleSubmit }) => {
  const [formState, setFormState] = useState({ content: "" });

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, content: e?.target?.value }));
  };

  return (
    <>
      <form onSubmit={(e) => onHandleSubmit(e, formState)}>
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

export default GenericForm;
