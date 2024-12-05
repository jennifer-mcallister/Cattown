import { IRelic } from "../types/savefileTypes";

export const relics: IRelic[] = [
  {
    cost: 50,
    name: "catnip",
    stats: {
      fireRes: 0,
      waterRes: 0,
      shadowRes: 0,
      natureRes: 10,
    },
  },
  {
    cost: 50,
    name: "yarn_of_fire",
    stats: {
      fireRes: 10,
      waterRes: 0,
      shadowRes: 0,
      natureRes: 0,
    },
  },
  {
    cost: 50,
    name: "skull_of_human",
    stats: {
      fireRes: 0,
      waterRes: 0,
      shadowRes: 10,
      natureRes: 0,
    },
  },
  {
    cost: 50,
    name: "fish_head",
    stats: {
      fireRes: 0,
      waterRes: 10,
      shadowRes: 0,
      natureRes: 0,
    },
  },
];
