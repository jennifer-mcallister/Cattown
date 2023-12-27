import { ITimeLeft } from "../helpers/gameCalculationHelpers";

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
  name: string;
  xp: number;
  level: number;
  health: number;
  strength: number;
  status: string; // "training", "on misson", "in camp"
  trainingEndTime: number;
  trainingTimeLeft: ITimeLeft;
  trainingXp: number;
  // mission: {
  //   date: string;
  //   durration: string;
  //   type: string;
  // };
}

export interface IRelic {
  cost: 50;
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
  health: number;
  strength: number;
  fireRes: number;
  waterRes: number;
  shadowRes: number;
  natureRes: number;
}
