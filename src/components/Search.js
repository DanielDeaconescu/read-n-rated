import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useEffect, useRef } from "react";

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
  const input = useRef(null);

  useEffect(
    function () {
      function callback(e) {
        if (document.activeElement === input.current) return;

        if (e.code === "Enter") {
          input.current.focus();
          setQuery("");
        }
      }

      document.addEventListener("keydown", callback);

      return () => document.addEventListener("keydown", callback);
    },
    [setQuery]
  );

  return (
    <StyledSearch>
      <StyledFontAwesomeIcon icon={faMagnifyingGlass} />
      <StyledInput
        className="search"
        id="search-books"
        name="search-books"
        type="text"
        placeholder="Search books..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={input}
      />
    </StyledSearch>
  );
}

export default Search;
