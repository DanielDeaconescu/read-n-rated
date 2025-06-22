import styled from "styled-components";

const StyledNavbar = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #213448;
  padding: 1.5rem;
  color: #fff;

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 1rem;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0.8rem;
  }
`;

function Navbar({ children }) {
  return <StyledNavbar className="nav-bar">{children}</StyledNavbar>;
}

export default Navbar;
