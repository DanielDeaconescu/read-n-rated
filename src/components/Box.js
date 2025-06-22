import styled from "styled-components";

const StyledBox = styled.div`
  @media (max-width: 576px) {
    width: 150px;
  }
`;

function Box({ children }) {
  return <StyledBox className="box col-sm-4 col-md-4">{children}</StyledBox>;
}

export default Box;
