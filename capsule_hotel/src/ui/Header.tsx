import styled from "styled-components";

const StyledHeader = styled.header`
  border-bottom: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
`;

function Header() {
  return <StyledHeader>헤더</StyledHeader>;
}

export default Header;
