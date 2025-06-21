import { useEffect, useState } from "react";

function AddComment({ onAddComment, bookKey, currentComment }) {
  const [comment, setComment] = useState("");
  useEffect(() => {
    setComment(currentComment);
  }, [currentComment]);

  function handleCommentChange(newComment) {
    setComment(newComment);
    // set the external rating
    onAddComment(bookKey, newComment);
  }

  return (
    <textarea
      rows="5"
      cols="33"
      value={comment}
      onChange={(e) => handleCommentChange(e.target.value)}
    ></textarea>
  );
}

export default AddComment;
