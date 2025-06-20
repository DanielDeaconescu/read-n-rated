import BookItem from "./BookItem";

function BookList({ books, onSelectedBook }) {
  return (
    <ul className="list list-movies">
      {books?.map((book) => (
        <BookItem
          book={book}
          key={book.cover_i}
          onSelectedBook={onSelectedBook}
        />
      ))}
    </ul>
  );
}

export default BookList;
