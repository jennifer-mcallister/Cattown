import { styled } from "styled-components";

interface IGameMenuStyledProps {
  show: string;
}

export const GameMenuContainer = styled.div<IGameMenuStyledProps>`
  width: 20rem;
  height: 100vh;
  position: absolute;
  z-index: 10;
  right: 0;

  display: ${({ show }) => (show === "true" ? "flex" : "none")};
  flex-direction: column;
  background-color: grey;
`;

export const GameMenuHeader = styled.div`
  width: 100%;
  height: 100px;

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

export const GameMenuContent = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding-top: 2rem;
`;

export const GameMenuButton = styled.button`
  width: 3rem;
  height: 3rem;
  background-color: lightgrey;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
`;

export const GameMenuGold = styled.div`
  width: 5rem;
  height: 3rem;
  background-color: lightgrey;

  display: flex;
  align-items: center;
`;
