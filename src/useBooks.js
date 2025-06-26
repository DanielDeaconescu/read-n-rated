import { useEffect, useState } from "react";

export function useBooks(query) {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

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

      //   handleCloseBook();
      fetchBooks();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { books, isLoading, error };
}
