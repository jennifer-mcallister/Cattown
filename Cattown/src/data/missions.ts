import { IMission, missionType, missionZone } from "../types/missionTypes";

export const missions: IMission[] = [
  {
    zone: missionZone.SWAMP,
    type: missionType.EXPLORE,
    timeInSec: 600,
    xpReceived: 600,
    goldReceived: 120,
  },
  {
    zone: missionZone.CAVE,
    type: missionType.SCAVANGE,
    timeInSec: 600,
    xpReceived: 400,
    goldReceived: 110,
  },
  {
    zone: missionZone.SWAMP,
    type: missionType.SCAVANGE,
    timeInSec: 900,
    xpReceived: 900,
    goldReceived: 180,
  },
  {
    zone: missionZone.THE_CITY,
    type: missionType.SCAVANGE,
    timeInSec: 1200,
    xpReceived: 1000,
    goldReceived: 250,
  },
  {
    zone: missionZone.WOODS,
    type: missionType.SCAVANGE,
    timeInSec: 300,
    xpReceived: 100,
    goldReceived: 50,
  },
  {
    zone: missionZone.CAVE,
    type: missionType.EXPLORE,
    timeInSec: 300,
    xpReceived: 200,
    goldReceived: 60,
  },
  {
    zone: missionZone.THE_CITY,
    type: missionType.EXPLORE,
    timeInSec: 900,
    xpReceived: 750,
    goldReceived: 180,
  },
  {
    zone: missionZone.WOODS,
    type: missionType.EXPLORE,
    timeInSec: 120,
    xpReceived: 40,
    goldReceived: 20,
  },
];
