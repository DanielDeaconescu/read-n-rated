function BookItem({ book, onSelectedBook }) {
  return (
    <li key={book.cover_i} onClick={() => onSelectedBook(book)}>
      <img
        src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
        alt={`${book.title} poster`}
      />
      <h3>{book.title}</h3>
      <div>
        <p>
          <span>{book.first_publish_year}</span>
        </p>
      </div>
    </li>
  );
}

export default BookItem;
