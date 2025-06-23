import ReadBookItem from "./ReadBookItem";

function ReadBooksList({ read, onDeleteRead, comments }) {
  console.log(read);
  return (
    <ul className="list">
      {read?.map((book) => (
        <ReadBookItem
          book={book}
          key={book.key}
          onDeleteRead={onDeleteRead}
          comments={comments}
        />
      ))}
    </ul>
  );
}

export default ReadBooksList;
