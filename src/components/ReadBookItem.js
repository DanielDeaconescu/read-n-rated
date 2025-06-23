import styled from "styled-components";

const StyledImg = styled.img`
  max-width: 120px;
`;

const StyledLi = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1rem;
`;

const TitleInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledUserRating = styled.div`
  font-size: 1.6rem;
`;

const StyledComment = styled.div`
  font-size: 1.6rem;
`;

const StyledStar = styled.div`
  font-size: 1.6rem;
`;

const StyledButton = styled.button`
  position: absolute;
  right: 2.4rem;
  height: 1.8rem;
  aspect-ratio: 1;
  border-radius: 50%;
  border: none;
  background-color: #ee2400;
  color: var(--color-background-900);
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #900000;
  }
`;

function ReadBookItem({ book, onDeleteRead, comments }) {
  return (
    <StyledLi>
      <div>
        <StyledImg src={book.coverImage} alt={`${book.title} poster`} />
      </div>
      <TitleInfo>
        <div>
          <h3>{book.title}</h3>
        </div>
        <div>
          <StyledStar>⭐️</StyledStar>
          <StyledUserRating>{book.userRating}</StyledUserRating>
        </div>
        <div>
          <StyledComment>{comments[book.key]}</StyledComment>
        </div>
      </TitleInfo>
      <div>
        <StyledButton
          className="btn-delete"
          onClick={() => onDeleteRead(book.key)}
        >
          X
        </StyledButton>
      </div>
    </StyledLi>
  );
}

export default ReadBookItem;
