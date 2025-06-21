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

function Search({ query, setQuery }) {
  return (
    <StyledSearch>
      <StyledFontAwesomeIcon icon={faMagnifyingGlass} />
      <input
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
