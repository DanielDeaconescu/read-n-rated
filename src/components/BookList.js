import BookItem from "./BookItem";

function BookList({ books, onSelectedBook }) {
  return (
    <ul className="list list-movies">
      {books?.map((book) => (
        <BookItem book={book} key={book.key} onSelectedBook={onSelectedBook} />
      ))}
    </ul>
  );
}

export default BookList;
