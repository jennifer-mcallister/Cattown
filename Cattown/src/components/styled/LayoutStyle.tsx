import { styled } from "styled-components";

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
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`;

export const MainContentSignUp = styled(MainContent)`
  flex-direction: row;
  align-items: flex-start;
  gap: 5rem;
`;

export const CatsContent = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3rem;
  height: 43rem;
`;

export const ShopContent = styled(CatsContent)`
  grid-template-columns: 1fr 1fr 1fr;
`;
