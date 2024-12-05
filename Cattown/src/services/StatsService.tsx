import { ISavefile, IStats } from "../types/savefileTypes";
import { updateLocalStorage } from "./LSService";

export const updateStats = async (stats: IStats, savefile: ISavefile) => {
  try {
    const updatedSavefile: ISavefile = {
      ...savefile,
      stats: stats,
    };
    updateLocalStorage(updatedSavefile);
  } catch {
    throw new Error("Unable to update localstorage");
  }
};
