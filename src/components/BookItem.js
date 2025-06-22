import styled from "styled-components";

const StyledBookItem = styled.li`
  position: relative;
  display: grid;
  grid-template-columns: 4rem 1fr;
  grid-template-rows: auto auto;
  column-gap: 2.4rem;
  font-size: 1.6rem;
  align-items: center;
  padding: 1.6rem 3.2rem;
  border-bottom: 1px solid var(--clr-2);

  @media (max-width: 576px) {
    font-size: 1.2rem;
    h3 {
      font-size: 1.2rem;
    }
    padding: 0;
  }
`;

function BookItem({ book, onSelectedBook }) {
  return (
    <StyledBookItem key={book.cover_i} onClick={() => onSelectedBook(book)}>
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
    </StyledBookItem>
  );
}

export default BookItem;
