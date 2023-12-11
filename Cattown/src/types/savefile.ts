export interface ISavefile {
  gold: number;
  stats: IStats;
  uniqueItems: number[];
  relics: number[];
  cats: ICat[];
}

export interface ICat {
  name: string;
  xp: number;
  level: number;
  health: number;
  strength: number;
  training: {
    onTraining: boolean;
    date: string;
    durration: string;
    type: string;
  };
  mission: {
    onMission: boolean;
    date: string;
    durration: string;
    type: string;
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
