import { ICat } from "../types/savefileTypes";

export const defaultCat: ICat = {
  id: Date.now().toString(),
  name: "Kitty",
  xp: 0,
  level: 1,
  health: 10,
  strength: 1,
  status: "in camp",
  trainingEndTime: 0,
  trainingTimeLeft: {
    h: 0,
    min: 0,
    sec: 0,
  },
  trainingXp: 0,
};
