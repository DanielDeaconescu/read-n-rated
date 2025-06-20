function ReadSummary({ read }) {
  return (
    <div className="summary">
      <h2>Books you've read</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{read.length} books</span>
        </p>
      </div>
    </div>
  );
}

export default ReadSummary;
