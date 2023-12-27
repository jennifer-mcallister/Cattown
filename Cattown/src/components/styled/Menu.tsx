import { styled } from "styled-components";

interface IMenuProps {
  show: string;
}

export const MenuBackground = styled.div<IMenuProps>`
  display: ${({ show }) => (show === "true" ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;

  background-color: rgba(0, 0, 0, 0.3);
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 20rem;
  min-height: 25rem;
  padding: 2rem;
  background-color: grey;
  border-radius: 10px;
  border: 6px solid black;
`;

export const MenuHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 5rem;
  padding-bottom: 1rem;
`;

export const MenuHeaderItems = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const MenuBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70%;
`;

export const MenuBodySignUp = styled(MenuBody)`
  flex-direction: row;
`;

export const MenuSmallContainer = styled.div`
  width: 80%;
  height: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  min-height: 3rem;
`;

export const MenuFooter = styled(MenuHeader)`
  padding-top: 1rem;
  padding-bottom: 0rem;
`;
