import { styled } from "styled-components";

export const HeaderContent = styled.div`
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
`;

export const MainContentSignUp = styled(MainContent)`
  flex-direction: row;
  align-items: flex-start;
  gap: 5rem;
`;
