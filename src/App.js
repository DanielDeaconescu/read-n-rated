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
import { useBooks } from "./useBooks";

export default function App() {
  const [query, setQuery] = useState("");

  const [read, setRead] = useState(function () {
    const readBooks = JSON.parse(localStorage.getItem("readBooksArray"));
    return readBooks;
  });

  const [selectedBook, setSelectedBook] = useState(null);
  const [comments, setComments] = useState({});

  const { books, isLoading, error } = useBooks(query, handleCloseBook);

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
  }

  function handleDeleteRead(id) {
    setRead((prevRead) => prevRead.filter((book) => book.key !== id));
  }

  useEffect(
    function () {
      localStorage.setItem("readBooksArray", JSON.stringify(read));
    },
    [read]
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
