import { IBoss, missionZone } from "../types/missionTypes";

export const defaultBoss: IBoss = {
  zone: missionZone.WOODS,
  name: "",
  mcguffinId: 0,
  health: 0,
  strength: 0,
  fireDamage: 0,
  waterDamage: 0,
  shadowDamage: 0,
  natureDamage: 0,
};
