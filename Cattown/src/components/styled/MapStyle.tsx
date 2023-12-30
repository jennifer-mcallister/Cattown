import { styled } from "styled-components";

export const MapOverviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 3rem;
  width: 50rem;
  height: 40rem;
`;

export const MapOverviewLocation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 15rem;
  height: 15rem;

  cursor: pointer;
`;

export const MapOverviewImg = styled.img`
  width: 10rem;

  &:hover {
    width: 10.5rem;
  }
`;
