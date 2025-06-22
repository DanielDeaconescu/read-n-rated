import styled from "styled-components";
import LogoImg from "../assets/images/read-n-rated-logo-white.png";

const StyledImg = styled.img`
  max-width: 60px;
`;

function Logo() {
  return (
    <div className="logo">
      <StyledImg src={LogoImg} alt="Read'n Rated logo" />
      <h1>Read'n Rated</h1>
    </div>
  );
}

export default Logo;
