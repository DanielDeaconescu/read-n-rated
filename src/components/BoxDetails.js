import styled from "styled-components";

const StyledBoxDetails = styled.div`
  @media (max-width: 576px) {
    width: 200px;
  }
`;

function BoxDetails({ children }) {
  return (
    <StyledBoxDetails className="box-details col-sm-6 col-md-6">
      {children}
    </StyledBoxDetails>
  );
}

export default BoxDetails;
