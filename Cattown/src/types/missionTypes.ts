export interface IMission {
  zone: missionZone;
  type: missionType;
  timeInSec: number;
  xpReceived: number;
  goldReceived: number;
}

export interface IBoss {
  zone: missionZone;
  name: string;
  mcguffinId: number;
  health: number;
  strength: number;
  fireDamage: number;
  waterDamage: number;
  shadowDamage: number;
  natureDamage: number;
}

export enum missionType {
  SCAVANGE = "scavenge",
  EXPLORE = "explore",
}

export enum missionZone {
  SWAMP = "swamp",
  CAVE = "cave",
  THE_CITY = "theCity",
  WOODS = "woods",
}
