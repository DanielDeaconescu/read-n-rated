import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ReadSummary({ read }) {
  return (
    <div className="summary">
      <h2>Books you've read</h2>
      <div>
        <p>
          <FontAwesomeIcon icon={faBook} />
          <span>
            {read.length === 1 ? `${read.length} book` : `${read.length} books`}
          </span>
        </p>
      </div>
    </div>
  );
}

export default ReadSummary;
