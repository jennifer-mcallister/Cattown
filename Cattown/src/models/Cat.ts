import { countOutCatLevel } from "../helpers/gameCalculationHelpers";
import { ICat } from "../types/savefileTypes";

export const defaultCat: ICat = {
  id: Date.now().toString(),
  img: "cat_white.webp",
  rarity: "common",
  name: "Nori",
  xp: 100,
  level: countOutCatLevel(100),
  health: 10,
  strength: 2,
  status: "in camp",
  trainingEndTime: 0,
  trainingTimeLeft: {
    h: 0,
    min: 0,
    sec: 0,
  },
  trainingXp: 0,
  missionEndTime: 0,
  missionTimeLeft: {
    h: 0,
    min: 0,
    sec: 0,
  },
  downedEndTime: 0,
  downedTimeLeft: {
    h: 0,
    min: 0,
    sec: 0,
  },
  missionGold: 0,
  missionXp: 0,
};

export const commonCat: ICat = defaultCat;

export const uncommonCat: ICat = {
  id: Date.now().toString(),
  img: "cat_forest.webp",
  rarity: "uncommon",
  name: "Toki",
  xp: 100,
  level: countOutCatLevel(100),
  health: 15,
  strength: 5,
  status: "in camp",
  trainingEndTime: 0,
  trainingTimeLeft: {
    h: 0,
    min: 0,
    sec: 0,
  },
  trainingXp: 0,
  missionEndTime: 0,
  missionTimeLeft: {
    h: 0,
    min: 0,
    sec: 0,
  },
  downedEndTime: 0,
  downedTimeLeft: {
    h: 0,
    min: 0,
    sec: 0,
  },
  missionGold: 0,
  missionXp: 0,
};

export const rareCat: ICat = {
  id: Date.now().toString(),
  img: "cat_fire.webp",
  rarity: "rare",
  name: "Bragi",
  xp: 100,
  level: countOutCatLevel(100),
  health: 20,
  strength: 10,
  status: "in camp",
  trainingEndTime: 0,
  trainingTimeLeft: {
    h: 0,
    min: 0,
    sec: 0,
  },
  trainingXp: 0,
  missionEndTime: 0,
  missionTimeLeft: {
    h: 0,
    min: 0,
    sec: 0,
  },
  downedEndTime: 0,
  downedTimeLeft: {
    h: 0,
    min: 0,
    sec: 0,
  },
  missionGold: 0,
  missionXp: 0,
};

export const legendaryCat: ICat = {
  id: Date.now().toString(),
  img: "cat_magic.webp",
  rarity: "legendary",
  name: "Astri",
  xp: 100,
  level: countOutCatLevel(100),
  health: 30,
  strength: 15,
  status: "in camp",
  trainingEndTime: 0,
  trainingTimeLeft: {
    h: 0,
    min: 0,
    sec: 0,
  },
  trainingXp: 0,
  missionEndTime: 0,
  missionTimeLeft: {
    h: 0,
    min: 0,
    sec: 0,
  },
  downedEndTime: 0,
  downedTimeLeft: {
    h: 0,
    min: 0,
    sec: 0,
  },
  missionGold: 0,
  missionXp: 0,
};
