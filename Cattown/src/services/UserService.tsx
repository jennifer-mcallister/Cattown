// import {
//   createUserWithEmailAndPassword,
//   sendPasswordResetEmail,
//   signInWithEmailAndPassword,
//   signOut,
// } from "firebase/auth";
// import { auth, savefilesCollection } from "./config/Firebase";
// import { IUserLogin, IUserRegister } from "../types/userTypes";
// import { ISavefile } from "../types/savefileTypes";
// import { doc, setDoc } from "firebase/firestore";
// import { newGameSavefile } from "../models/Savefile";

// export const registerUser = async (user: IUserRegister) => {
//   try {
//     const cred = await createUserWithEmailAndPassword(
//       auth,
//       user.email,
//       user.password
//     );

//     const newSavefile: ISavefile = {
//       ...newGameSavefile,
//       username: user.username,
//     };

//     const newSavefileDoc = doc(savefilesCollection, cred.user.uid);
//     await setDoc(newSavefileDoc, newSavefile);
//   } catch {
//     throw new Error("503 Service Unavailable");
//   }
// };

// export const loginUser = async (user: IUserLogin) => {
//   try {
//     const userLogin = await signInWithEmailAndPassword(
//       auth,
//       user.email,
//       user.password
//     );
//     console.log("User logged in", userLogin);
//   } catch {
//     throw new Error("503 Service Unavailable");
//   }
// };

// export const logoutUser = async () => {
//   try {
//     await signOut(auth);
//     console.log("User signed out");
//   } catch {
//     throw new Error("503 Service Unavailable");
//   }
// };

// export const resetPassword = async (email: string) => {
//   try {
//     sendPasswordResetEmail(auth, email);
//     console.log("Reset password email sent");
//   } catch {
//     throw new Error("503 Service Unavailable");
//   }
// };
