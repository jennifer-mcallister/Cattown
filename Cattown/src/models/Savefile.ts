import { defaultCat } from "./Cat";

export const defaultSavefile = {
  gold: 0,
  stats: {
    luck: 0,
    critChance: 0,
    health: 0,
    strength: 0,
    fireRes: 0,
    waterRes: 0,
    shadowRes: 0,
    natureRes: 0,
  },
  uniqueItems: [],
  relics: [],
  cats: [],
};

export const defaultSavefileTest = {
  gold: 0,
  stats: {
    luck: 0,
    critChance: 5,
    health: 0,
    strength: 0,
    fireRes: 0,
    waterRes: 0,
    shadowRes: 0,
    natureRes: 0,
  },
  uniqueItems: [],
  relics: [],
  cats: [defaultCat],
  username: "",
};

export const newGameSavefile = {
  gold: 0,
  stats: {
    luck: 0,
    critChance: 5,
    health: 0,
    strength: 0,
    fireRes: 0,
    waterRes: 0,
    shadowRes: 0,
    natureRes: 0,
  },
  uniqueItems: [],
  relics: [],
  cats: [defaultCat],
};
