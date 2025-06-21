function ReadBookItem({ book, onDeleteRead, comments }) {
  return (
    <li>
      <img src={book.coverImage} alt={`${book.title} poster`} />
      <h3>{book.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{book.userRating}</span>
        </p>
        <p>{comments[book.key]}</p>
        <button className="btn-delete" onClick={() => onDeleteRead(book.key)}>
          X
        </button>
      </div>
    </li>
  );
}

export default ReadBookItem;
