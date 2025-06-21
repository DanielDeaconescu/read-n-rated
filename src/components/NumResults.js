function NumResults({ books }) {
  return (
    <p className="num-results">
      <strong>{books.length}</strong> results
    </p>
  );
}

export default NumResults;
