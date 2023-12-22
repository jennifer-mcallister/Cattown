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
  // training: {
  //   onTraining: boolean;
  //   date: string;
  //   durration: string;
  //   type: string;
  // };
  // mission: {
  //   onMission: boolean;
  //   date: string;
  //   durration: string;
  //   type: string;
  // };
}

export interface IRelic {
  cost: 50;
  name: string;
  stats: {
    fireDamage: number;
    waterDamage: number;
    shadowDamage: number;
    natureDamage: number;
  };
}

export interface IStats {
  luck: number;
  health: number;
  strength: number;
  fireDamage: number;
  waterDamage: number;
  shadowDamage: number;
  natureDamage: number;
}
