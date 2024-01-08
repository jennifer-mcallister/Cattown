import { styled } from "styled-components";
import { borderRadiusMedium, smallBorder } from "./theme_variables/borders";
import { primaryWhite, secondaryWhite } from "./theme_variables/colors";
import { bounceAnimation, buyRelicAnimation } from "./Animations";
import { HeaderBig, HeaderSmall } from "./Text";

export const ShopMenuContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  width: 40rem;
  height: 30rem;
  border-radius: 0.5rem;
  padding: 5rem;
  cursor: default;

  gap: 3rem;
  background: lightgrey;
  border: 6px solid black;
`;

export const ShopMenuItemsContainer = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  width: 40rem;
  height: auto;
`;

export const ShopItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 18rem;
  height: 17.5rem;
  padding: 0.5rem;
  border-radius: ${borderRadiusMedium};
  border: ${smallBorder};
  background: ${secondaryWhite};

  opacity: 0;
  transform: scale(0.5);
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;

  &.loaded {
    opacity: 1;
    transform: translateY(0) scale(1);
    animation: ${bounceAnimation} 1s ease-in-out;
  }

  &.bought-item {
    opacity: 1;
    transform: translatyY(0) scale(1);
    animation: ${buyRelicAnimation} 1s ease-in-out;
  }
`;

export const ShopItemContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  height: 75%;
`;

export const ShopItemLeftBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 100%;
  gap: 1rem;
`;

export const ShopItemRightBox = styled(ShopItemLeftBox)`
  width: 40%;
  justify-content: center;
  align-items: center;
`;

export const ShopItemFooter = styled.div`
  display: flex;
  width: 100%;
  height: 25%;
`;

export const ShopItemInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 75%;
`;

export const ShopItemRelicImg = styled.img`
  width: 7rem;
`;

export const RevealCatContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  width: auto;
  height: auto;

  opacity: 0;
  transform: scale(0.5);
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;

  &.loaded {
    opacity: 1;
    transform: translateY(0) scale(1);
    animation: ${bounceAnimation} 1s ease-in-out;
  }
`;

export const RevealCatTitle = styled(HeaderBig)`
  color: ${primaryWhite};
`;

export const RevealCatSubTitle = styled(HeaderSmall)`
  color: ${primaryWhite};
`;

export const RevealCatStats = styled(HeaderSmall)`
  color: ${primaryWhite};
`;

export const RevealCatImg = styled.img`
  width: 15rem;
`;
