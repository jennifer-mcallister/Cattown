import { IMission, missionType, missionZone } from "../types/missionTypes";

export const defaultMission: IMission = {
  zone: missionZone.WOODS,
  type: missionType.EXPLORE,
  timeInSec: 0,
  xpReceived: 0,
  goldReceived: 0,
};
