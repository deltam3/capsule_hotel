import {
  createContext,
  useContext,
  useState,
  FC,
  ReactNode,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

interface Position {
  x: number;
  y: number;
}

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<{ position: Position }>`
  position: fixed;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

interface MenusContextProps {
  openId: string;
  close: () => void;
  open: (id: string) => void;
  position: Position | null;
  setPosition: (position: Position) => void;
}

const MenusContext = createContext<MenusContextProps>({
  openId: "",
  close: () => {},
  open: () => {},
  position: null,
  setPosition: () => {},
});

interface MenusProps {
  children: ReactNode;
}

const Menus: FC<MenusProps> & {
  Menu: typeof Menu;
  Toggle: FC<{ id: string }>;
  List: FC<{ id: string }>;
  Button: FC<{ icon: ReactNode; onClick?: () => void; children?: ReactNode }>;
} = ({ children }) => {
  const [openId, setOpenId] = useState<string>("");
  const [position, setPosition] = useState<Position | null>(null);

  const close = () => setOpenId("");
  const open = (id: string) => setOpenId(id);

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
};

Menus.Menu = Menu;

const Toggle: FC<{ id: string }> = ({ id }) => {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === "" || openId !== id ? open(id) : close();
  };

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
};

Menus.Toggle = Toggle;

const List: FC<{ id: string }> = ({ id }) => {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useRef<HTMLUListElement>(null);

  useOutsideClick(ref, () => {
    if (openId === id) {
      close();
    }
  });

  if (openId !== id) return null;

  return createPortal(
    <StyledList position={position!} ref={ref}></StyledList>,
    document.body
  );
};

Menus.List = List;

const Button: FC<{
  icon: ReactNode;
  onClick?: () => void;
  children?: ReactNode;
}> = ({ children, icon, onClick }) => {
  const { close } = useContext(MenusContext);

  const handleClick = () => {
    onClick?.();
    close();
  };

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
};

Menus.Button = Button;

export default Menus;
