import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 6.8rem;
  width: auto;
`;

const Text = styled.p`
  font-weight: 700;
`;

function Logo({ admin = true }) {
  return (
    <StyledLogo>
      <Img src="/capsule.png" alt="Logo" />
      <p>Casule Hotel</p>
      {admin && <Text>관리자 페이지</Text>}
    </StyledLogo>
  );
}

export default Logo;
