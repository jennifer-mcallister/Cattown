import { styled } from "styled-components";

export const HomeNavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 10rem;
  height: 10rem;
`;
export const HomeNavImg = styled.img`
  width: 5rem;
  cursor: pointer;

  &:hover {
    width: 5.5rem;
  }
`;
