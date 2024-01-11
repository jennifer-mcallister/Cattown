import { styled } from "styled-components";
import { devices } from "./style_variables/devices";

export const HeaderContent = styled.div`
  position: relative;
  z-index: 5;
  width: 100vw;
  height: 10vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const MainContent = styled.div`
  width: 100vw;
  min-height: 90vh;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  padding-top: 2rem;

  @media (${devices.tablet}) {
    padding-top: 0;
  }
`;

export const MainContentSignUp = styled(MainContent)`
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  @media (${devices.tablet}) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

export const CatsContent = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr;
  grid-gap: 3rem;

  @media (${devices.tablet}) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const HomeContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  gap: 1rem;
  width: 60%;

  @media (${devices.desktop}) {
    gap: 3rem;
  }
`;

export const MapContent = styled(HomeContent)`
  height: 80vh;
`;

export const ShopContent = styled(CatsContent)`
  grid-template-columns: 1fr;

  @media (${devices.tablet}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (${devices.desktop}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
