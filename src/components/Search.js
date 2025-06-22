import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const StyledSearch = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: 2rem;
`;

const StyledInput = styled.input`
  justify-self: center;
  border: none;
  padding: 1.1rem 1.6rem;
  font-size: 1.8rem;
  border-radius: 0.7rem;
  transition: all 0.3s;
  color: var(--color-text);
  background-color: #547792;

  @media (min-width: 992px) {
    width: 42rem;
  }
`;

function Search({ query, setQuery }) {
  return (
    <StyledSearch>
      <StyledFontAwesomeIcon icon={faMagnifyingGlass} />
      <StyledInput
        className="search"
        type="text"
        placeholder="Search books..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </StyledSearch>
  );
}

export default Search;
