import { styled } from "styled-components";

export const ButtonMedium = styled.button`
  min-width: 3rem;
  height: 3rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin: 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.8em;
  cursor: pointer;
`;

export const ButtonLarge = styled.button`
  width: 20rem;
  height: 3rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin: 0.5rem;
  border-radius: 0.5rem;
  font-size: 1em;
  cursor: pointer;
`;

export const ButtonLargeSelect = styled(ButtonLarge)`
  &:focus {
    background-color: lightgreen;
  }
`;
