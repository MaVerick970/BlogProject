import "./createPost.css";
const PostCard = ({ data }) => {
  return (
    <div className="card">
      <h2>{data?.title}</h2>
    </div>
  );
};

export default PostCard;
