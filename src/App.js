import Navbar from "./components/Navbar";
import Logo from "./components/Logo";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import Main from "./components/Main";
import Box from "./components/Box";
import BoxDetails from "./components/BoxDetails";
import BookList from "./components/BookList";
import ReadSummary from "./components/ReadSummary";
import ReadBooksList from "./components/ReadBooksList";

import { useEffect, useState } from "react";
import StarRating from "./StarRating";

export default function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [read, setRead] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [selectedBook, setSelectedBook] = useState(null);

  function handleSelectedBook(book) {
    setSelectedBook((selected) => (selected?.key === book.key ? null : book));
  }

  function handleCloseBook() {
    setSelectedBook(null);
  }

  function handleAddRead(book) {
    setRead((prevRead) => [...prevRead, book]);
  }

  function handleDeleteRead(id) {
    setRead((prevRead) => prevRead.filter((book) => book.key !== id));
  }

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchBooks() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `https://openlibrary.org/search.json?q=${query}&limit=20`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching books");

          const data = await res.json();

          setBooks(data.docs);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setBooks([]);
        setError("");
        return;
      }

      handleCloseBook();
      fetchBooks();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults books={books} />
      </Navbar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <BookList books={books} onSelectedBook={handleSelectedBook} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <BoxDetails>
          {selectedBook ? (
            <BookDetails
              book={selectedBook}
              onCloseBook={handleCloseBook}
              onAddRead={handleAddRead}
              read={read}
            />
          ) : (
            <>
              <ReadSummary read={read} />
              <ReadBooksList read={read} onDeleteRead={handleDeleteRead} />
            </>
          )}
        </BoxDetails>
      </Main>
    </>
  );
}

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
                  You rated this book <span>⭐</span> {readUserRating}
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
