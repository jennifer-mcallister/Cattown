import { getDocs } from "firebase/firestore";
import { bossesCollection, missionCollection } from "./Firebase";

export const getQuests = async () => {
  try {
    const resMissions = await getDocs(missionCollection);
    const missions = resMissions.docs.map((mission) => {
      return mission.data();
    });

    const resBosses = await getDocs(bossesCollection);
    const bosses = resBosses.docs.map((bosses) => {
      return bosses.data();
    });

    return { missions: missions, bosses: bosses };
  } catch {
    throw new Error("503 Service Unavailable");
  }
};
