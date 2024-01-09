import { styled } from "styled-components";

export const TextSmall = styled.p`
  font-size: 1rem;
  font-family: "Comic Neue", cursive;
  padding-top: 0.4rem;
  font-weight: 400;
`;

export const TextSmallBold = styled(TextSmall)`
  font-weight: 700;
  text-transform: uppercase;
`;

export const TextMedium = styled.p`
  font-size: 1.5rem;
`;

export const TextMediumCenter = styled(TextMedium)`
  text-align: center;
`;

export const HeaderBig = styled.h1`
  font-size: 3rem;
`;

export const HeaderSmall = styled.h3`
  font-size: 2rem;
`;
