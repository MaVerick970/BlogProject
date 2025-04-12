const CreateCommentList = ({ commentList }) => {
  return (
    <ul>
      {Object.keys(commentList)?.map((key) => (
        <li>{commentList[key]?.comment}</li>
      ))}
    </ul>
  );
};

export default CreateCommentList;
