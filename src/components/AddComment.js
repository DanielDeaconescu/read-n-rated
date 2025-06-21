import { useEffect, useState } from "react";

function AddComment({ onAddComment, bookKey, currentComment }) {
  const [comment, setComment] = useState("");

  // whenever the comment changes, we want to change the "currentComment" as well
  useEffect(() => {
    setComment(currentComment);
  }, [currentComment]);

  function handleCommentChange(newComment) {
    setComment(newComment);
    // set the external rating
    onAddComment(bookKey, newComment);
  }

  return (
    <>
      <p>You can leave a comment regarding this book: </p>
      <textarea
        name="book-comment"
        id="book-comment"
        rows="5"
        cols="33"
        value={comment}
        onChange={(e) => handleCommentChange(e.target.value)}
      ></textarea>
    </>
  );
}

export default AddComment;
