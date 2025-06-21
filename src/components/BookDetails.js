import { useEffect, useState } from "react";
import Loader from "./Loader";
import StarRating from "../StarRating";

function BookDetails({ book, onCloseBook, onAddRead, read }) {
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const isRead = read.map((b) => b.key).includes(book.key);
  const readUserRating = read.find((b) => b.key === book.key)?.userRating;

  const { title } = book;

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
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseBook}>
              &larr;
            </button>
            <img
              className="book-details-image"
              src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
              alt={`Cover of ${title} book`}
            />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                <strong>By:</strong> {book.author_name?.join(", ")}
              </p>
              <p>
                <strong>Subjects:</strong>{" "}
                {details.subjects?.slice(0, 3).join(", ")}
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isRead ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated this book {readUserRating}
                  <span>⭐</span>
                </p>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default BookDetails;
