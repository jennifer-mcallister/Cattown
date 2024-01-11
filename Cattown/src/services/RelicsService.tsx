import { doc, getDocs, updateDoc } from "firebase/firestore";
import { auth, db, relicsCollection } from "./config/Firebase";
import { IRelic } from "../types/savefileTypes";

export const getRelics = async () => {
  try {
    const res = await getDocs(relicsCollection);
    const relics = res.docs.map((relic) => {
      return relic.data();
    });
    return relics;
  } catch {
    throw new Error("503 Service Unavailable");
  }
};

export const buyRelics = async (relics: IRelic[], goldLeft: number) => {
  try {
    const loggedInUser = await auth.currentUser;

    if (!loggedInUser) {
      throw new Error("UnAuthorized");
    }

    const savefileRef = doc(db, "savefiles", loggedInUser.uid);
    await updateDoc(savefileRef, { relics: relics, gold: goldLeft });
    console.log("Relics updated");
  } catch {
    throw new Error("503 Service Unavailable");
  }
};
