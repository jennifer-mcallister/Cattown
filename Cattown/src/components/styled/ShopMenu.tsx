import { styled } from "styled-components";

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
  width: 18rem;
  height: 8rem;
  border-radius: 0.5rem;
  align-items: center;

  background: grey;
  border: 3px solid black;
`;

export const ShopItemHeader = styled.div`
  width: 8rem;
  height: 20%;
`;

export const ShopItemInfo = styled.div`
  display: flex;
  flex-direction: row;
  width: 18rem;
  height: 80%;
  border-radius: 0.5rem;
  align-items: center;
`;

export const ShopItemImg = styled.img`
  width: 5rem;
`;

export const ShopItemInfoContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  width: 33%;
  height: 80%;
`;
