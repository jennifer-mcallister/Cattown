import { ISavefile } from "../types/savefileTypes";

export const defaultSavefile: ISavefile = {
  username: "",
  gold: 200,
  stats: {
    luck: 1,
    health: 1,
    strength: 1,
    fireRes: 0,
    waterRes: 0,
    shadowRes: 0,
    natureRes: 0,
  },
  uniqueItems: [],
  relics: [],
  cats: [
    {
      id: "1a",
      name: "Mjaui",
      xp: 0,
      level: 1,
      health: 10,
      strength: 1,
    },
  ],
};
