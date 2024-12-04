import { IBoss, missionZone } from "../types/missionTypes";

export const bosses: IBoss[] = [
  {
    zone: missionZone.WOODS,
    name: "The Druid",
    mcguffinId: 1,
    health: 100,
    strength: 10,
    fireDamage: 0,
    waterDamage: 0,
    shadowDamage: 0,
    natureDamage: 10,
  },
  {
    zone: missionZone.SWAMP,
    name: "The Hag",
    mcguffinId: 3,
    health: 220,
    strength: 35,
    fireDamage: 0,
    waterDamage: 25,
    shadowDamage: 15,
    natureDamage: 15,
  },
  {
    zone: missionZone.THE_CITY,
    name: "The Mayor",
    mcguffinId: 4,
    health: 400,
    strength: 50,
    fireDamage: 25,
    waterDamage: 25,
    shadowDamage: 25,
    natureDamage: 25,
  },
  {
    zone: missionZone.CAVE,
    name: "The Hermit",
    mcguffinId: 2,
    health: 180,
    strength: 25,
    fireDamage: 0,
    waterDamage: 0,
    shadowDamage: 25,
    natureDamage: 15,
  },
];