import { IRelic, ISavefile, IStats } from "../types/savefileTypes";
import { updateLocalStorage } from "./LSService";
import { relics } from "../data/relics";

export const getRelics = async () => {
  try {
    return relics;
  } catch {
    throw new Error("Unable to retreive data");
  }
};

export const buyRelics = (
  relics: IRelic[],
  goldLeft: number,
  stats: IStats,
  savefile: ISavefile
) => {
  const updatedSavefile: ISavefile = {
    ...savefile,
    relics: relics,
    gold: goldLeft,
    stats: stats,
  };
  updateLocalStorage(updatedSavefile);
};
