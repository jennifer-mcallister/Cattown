import { styled } from "styled-components";

interface ICatStatusProps {
  color: string;
}

export const CatsContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  width: 80%;
  height: 80%;
  gap: 3rem;
`;

export const CatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 30rem;
  height: 8rem;
  border-radius: 0.5rem;
  border: 3px solid black;
  position: relative;

  background: grey;
`;

export const CatInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 80%;
  height: 100%;
`;

export const CatInfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 33%;
  height: 80%;
`;

export const CatImg = styled.img`
  width: 3.7rem;
  position: absolute;
  left: 0;
  z-index: 1;
`;

export const CatFooter = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  height: 20%;
`;

export const CatStatus = styled.p<ICatStatusProps>`
  font-size: em;
  font-weight: bold;
  color: ${({ color }) => (`${color}` ? color : "black")};
`;
