import { NavLink } from "react-router-dom";
import styled from "styled-components";

import {
  RiHome4Line,
  RiCapsuleFill,
  RiCalendar2Fill,
  RiUserAddLine,
  RiSettings4Line,
} from "react-icons/ri";
const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-red-700);
  }
`;

function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <RiHome4Line />
            <span>홈</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/capsules">
            <RiCapsuleFill />
            <span>캡슐</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/reservations">
            <RiCalendar2Fill />
            <span>예약</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/users">
            <RiUserAddLine />
            <span>관리자 추가</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/settings">
            <RiSettings4Line />
            <span>설정</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
