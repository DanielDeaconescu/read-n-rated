import ReadBookItem from "./ReadBookItem";

function ReadBooksList({ read, onDeleteRead }) {
  return (
    <ul className="list">
      {read.map((book) => (
        <ReadBookItem book={book} key={book.key} onDeleteRead={onDeleteRead} />
      ))}
    </ul>
  );
}

export default ReadBooksList;
