import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledTextarea = styled.textarea`
  @media (max-width: 576px) {
    width: 100%;
    height: 50px;
  }
`;

const StyledText = styled.div`
  @media (max-width: 576px) {
    font-size: 1.2rem;
  }
`;

function AddComment({ onAddComment, bookKey, currentComment }) {
  const [comment, setComment] = useState("");

  // whenever the comment changes, we want to change the "currentComment" as well
  useEffect(() => {
    setComment(currentComment);
    // localStorage.setItem(`${bookKey}`, currentComment);
  }, [currentComment, bookKey]);

  function handleCommentChange(newComment) {
    setComment(newComment);
    // set the external rating
    onAddComment(bookKey, newComment);
  }

  return (
    <>
      <StyledText>You can write a note regarding this book: </StyledText>
      <StyledTextarea
        name="book-comment"
        id="book-comment"
        rows="5"
        cols="33"
        value={comment}
        onChange={(e) => handleCommentChange(e.target.value)}
      ></StyledTextarea>
    </>
  );
}

export default AddComment;
