import { styled } from "styled-components";

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
  flex-direction: row;
  width: 35rem;
  height: 10rem;
  border-radius: 0.5rem;

  background-color: black;
  color: white;
  padding: 1rem;
`;

export const CatInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const CatInfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 9rem;
  height: 80%;
`;

export const CatImg = styled.img`
  width: 5rem;
  position: absolute;
  z-index: 1;
`;
