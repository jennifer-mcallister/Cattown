import { bosses } from "../data/bosses";
import { missions } from "../data/missions";

export const getQuests = async () => {
  try {
    return { missions: missions, bosses: bosses };
  } catch {
    throw new Error("Unable to retreive data");
  }
};
