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
import BookDetails from "./components/BookDetails";

import { useEffect, useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [read, setRead] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [selectedBook, setSelectedBook] = useState(null);
  const [comments, setComments] = useState({});

  function handleAddComment(key, comment) {
    setComments((prev) => ({ ...prev, [key]: comment }));
  }

  function handleSelectedBook(book) {
    setSelectedBook((selected) => (selected?.key === book.key ? null : book));
  }

  function handleCloseBook() {
    setSelectedBook(null);
  }

  function handleAddRead(book) {
    setRead((prevRead) => [...prevRead, book]);

    let items = JSON.parse(localStorage.getItem("myArray")) || [];

    items.push(book);

    localStorage.setItem("myArray", JSON.stringify(items));
  }

  useEffect(function () {
    const myArray = localStorage.getItem("myArray");
    // setRead(myArray);
  }, []);

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
              onAddComment={handleAddComment}
              currentComment={comments[selectedBook.key] || ""}
            />
          ) : (
            <>
              <ReadSummary read={read} />
              <ReadBooksList
                read={read}
                onDeleteRead={handleDeleteRead}
                comments={comments}
              />
            </>
          )}
        </BoxDetails>
      </Main>
    </>
  );
}
