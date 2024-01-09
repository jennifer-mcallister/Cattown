import { styled } from "styled-components";
import { devices } from "./theme_variables/devices";

export const HeaderGold = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  min-width: 5rem;
  gap: 0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  height: 3rem;
`;

export const HeaderCoinImg = styled.img`
  width: 2rem;
`;

export const HeaderSmallContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-width: auto;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  gap: 1rem;
  height: 100%;

  @media (${devices.tablet}) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;
