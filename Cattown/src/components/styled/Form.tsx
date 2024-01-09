import { styled } from "styled-components";
import { borderRadiusSmall, smallBorder } from "./theme_variables/borders";

export const Form = styled.form`
  width: 18rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
  gap: 1rem;
`;

export const FormInput = styled.input`
  width: 15rem;
  height: 3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: ${borderRadiusSmall};
  border: ${smallBorder};
  font-family: "Comic Neue", cursive;
  font-size: 1rem;
`;

export const FormLabel = styled.label`
  padding: 0;
  margin: 0;
  font-size: 1rem;
  font-family: "Comic Neue", cursive;
`;
