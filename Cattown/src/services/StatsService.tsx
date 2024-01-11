import { doc, updateDoc } from "firebase/firestore";
import { IStats } from "../types/savefileTypes";
import { auth, db } from "./config/Firebase";

export const updateStats = async (stats: IStats) => {
  try {
    const loggedInUser = await auth.currentUser;

    if (!loggedInUser) {
      throw new Error("UnAuthorized");
    }

    const savefileRef = doc(db, "savefiles", loggedInUser.uid);
    await updateDoc(savefileRef, { stats: stats });
    console.log("Stats updated");
  } catch {
    throw new Error("503 Service Unavailable");
  }
};
