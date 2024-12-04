import { defaultSavefileTest } from "../models/Savefile";
import { ISavefile } from "../types/savefileTypes";

export const updateLocalStorage = (savefile: ISavefile) => {
  localStorage.setItem("savefile", JSON.stringify(savefile));
  window.dispatchEvent(new CustomEvent("LSUpdated"));
};

export const getLocalStorage = (): ISavefile => {
  const savefile = localStorage.getItem("savefile");
  if (!savefile) return defaultSavefileTest;
  return JSON.parse(savefile) as ISavefile;
};
