import { countOutCatLevel } from "../helpers/gameCalculationHelpers";
import { ICat } from "../types/savefileTypes";

export const defaultCat: ICat = {
  id: Date.now().toString(),
  name: "Kitty",
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
