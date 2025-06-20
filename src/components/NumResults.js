function NumResults({ books }) {
  return (
    <p className="num-results">
      Found <strong>{books.length}</strong> results
    </p>
  );
}

export default NumResults;
