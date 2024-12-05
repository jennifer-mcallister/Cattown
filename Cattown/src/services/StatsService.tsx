import { ISavefile, IStats } from "../types/savefileTypes";
import { updateLocalStorage } from "./LSService";

export const updateStats = (stats: IStats, savefile: ISavefile) => {
  const updatedSavefile: ISavefile = {
    ...savefile,
    stats: stats,
  };
  updateLocalStorage(updatedSavefile);
};
