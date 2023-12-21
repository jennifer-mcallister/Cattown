import { ICat } from "../types/savefileTypes";

export interface IActionCats {
  type: ActionTypeCats;
  payload: ICat;
}

export enum ActionTypeCats {
  CHANGE_NAME,
  REMOVE_CAT,
}

export const CatsReducer = (cats: ICat[], action: IActionCats) => {
  switch (action.type) {
    case ActionTypeCats.CHANGE_NAME: {
      const updatedCats: ICat[] = [...cats].map((c) => {
        if (c.id === action.payload.id) {
          return {
            ...c,
            name: action.payload.name,
          };
        } else {
          return c;
        }
      });

      return updatedCats;
    }
    case ActionTypeCats.REMOVE_CAT: {
      const updatedCats = cats.filter((c) => c.id !== action.payload.id);
      return updatedCats;
    }
  }
  return cats;
};
