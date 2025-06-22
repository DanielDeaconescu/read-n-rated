import { useEffect, useState } from "react";
import Loader from "./Loader";
import StarRating from "./StarRating";
import AddComment from "./AddComment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  color: var(--clr-1);
`;

const StyledButton = styled.button`
  position: absolute;
  top: 0.6rem;
  left: 0.6rem;
  height: 4.2rem;
  aspect-ratio: 1;
  border-radius: 50%;
  border: none;
  background-color: #fff;
  color: #000;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.8);
  font-family: sans-serif;
  font-size: 2.4rem;
  font-weight: bold;
  cursor: pointer;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 576px) {
    height: 3.2rem;
  }
`;

const StyledHeader = styled.header`
  display: flex;
  padding: 1rem;
  @media (max-width: 576px) {
    flex-direction: column;
    padding: 0;
  }
`;

const StyledImg = styled.img`
  @media (max-width: 576px) {
    width: 60px;
  }
`;

const StyledDetailsOverview = styled.div`
  width: 100%;
  padding: 2.4rem 3rem;
  background-color: var(--color-background-100);
  display: flex;
  flex-direction: column;
  gap: 1.4rem;

  @media (max-width: 576px) {
    padding: 0;
    gap: 0;
  }
`;

const DetailsOverviewH2 = styled.h2`
  font-size: 2.4rem;
  margin-bottom: 0.4rem;
  line-height: 1.1;

  @media (max-width: 576px) {
    font-size: 1.4rem;
  }
`;

const StyledBy = styled.div``;

const StyledSubjects = styled.div``;

const StyledDetails = styled.div`
  line-height: 1.4;
  font-size: 1.4rem;
  padding: 2rem;

  @media (max-width: 576px) {
    padding: 0.5rem;
  }
`;

const StyledButtonAdd = styled.button`
  background-color: var(--clr-2);
  color: var(--color-text);
  border: none;
  border-radius: 10rem;
  font-size: 1.4rem;
  padding: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;

  @media (min-width: 576px) {
    &:hover {
      background-color: var(--clr-2-darker);
    }
  }
`;

function BookDetails({
  book,
  onCloseBook,
  onAddRead,
  read,
  currentComment,
  onAddComment,
}) {
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const isRead = read.map((b) => b.key).includes(book.key);
  const readUserRating = read.find((b) => b.key === book.key)?.userRating;

  const { title, key: bookKey } = book;

  function handleAdd() {
    const newReadBook = {
      key: book.key,
      title,
      coverImage: `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`,
      userRating,
    };

    onAddRead(newReadBook);
    onCloseBook();
  }

  // fetch a single book based on an ID
  useEffect(
    function () {
      async function getBookDetails() {
        setIsLoading(true);
        const olid = book.key.split("/").pop();
        const res = await fetch(`https://openlibrary.org/works/${olid}.json`);
        const data = await res.json();
        setDetails(data);
        setIsLoading(false);
      }
      getBookDetails();
    },
    [book]
  );

  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") {
          onCloseBook();
        }
      }

      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [onCloseBook]
  );

  return (
    <StyledDetails className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <StyledHeader>
            <StyledButton className="btn-back" onClick={onCloseBook}>
              <StyledFontAwesomeIcon icon={faArrowLeft} />
            </StyledButton>
            <StyledImg
              className="book-details-image"
              src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
              alt={`Cover of ${title} book`}
            />
            <StyledDetailsOverview className="details-overview">
              <DetailsOverviewH2>{title}</DetailsOverviewH2>
              <StyledBy>
                <strong>By:</strong> {book.author_name?.join(", ")}
              </StyledBy>
              <StyledSubjects>
                <strong>Subjects:</strong>{" "}
                {details.subjects?.slice(0, 3).join(", ")}
              </StyledSubjects>
            </StyledDetailsOverview>
          </StyledHeader>

          <section>
            <div className="rating">
              {!isRead ? (
                <>
                  <AddComment
                    onAddComment={onAddComment}
                    currentComment={currentComment}
                    bookKey={bookKey}
                  />
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  <StyledButtonAdd className="btn-add" onClick={handleAdd}>
                    + Add to list
                  </StyledButtonAdd>
                </>
              ) : (
                <p>
                  {readUserRating ? (
                    <div>You rated this book {readUserRating}⭐ </div>
                  ) : (
                    <div>You didn't rate this book</div>
                  )}
                  {currentComment ? (
                    <div>
                      You added the comment: <b>{currentComment}</b>.
                    </div>
                  ) : (
                    <div>You didn't add any comments.</div>
                  )}
                </p>
              )}
            </div>
          </section>
        </>
      )}
    </StyledDetails>
  );
}

export default BookDetails;
