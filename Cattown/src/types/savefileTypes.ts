import { ITimeLeft } from "../helpers/timeManagement";

export interface ISavefile {
  cats: ICat[];
  gold: number;
  relics: IRelic[];
  stats: IStats;
  uniqueItems: number[];
  username: string;
}

export interface ICat {
  id: string;
  img?: string;
  rarity?: string;
  name: string;
  xp: number;
  level: number;
  health: number;
  strength: number;
  status: string; // "training", "on misson", "in camp", "downed"
  trainingEndTime: number;
  trainingTimeLeft: ITimeLeft;
  trainingXp: number;
  missionEndTime: number;
  missionTimeLeft: ITimeLeft;
  downedEndTime: number;
  downedTimeLeft: ITimeLeft;
  missionGold: number;
  missionXp: number;
}

export interface IRelic {
  cost: number;
  name: string;
  stats: {
    fireRes: number;
    waterRes: number;
    shadowRes: number;
    natureRes: number;
  };
}

export interface IStats {
  luck: number;
  critChance: number;
  health: number;
  strength: number;
  fireRes: number;
  waterRes: number;
  shadowRes: number;
  natureRes: number;
}
