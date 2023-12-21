import { useLoaderData } from "react-router-dom";
import { MainContent } from "../components/styled/LayoutStyle";
import { useReducer } from "react";
import { ISavefile } from "../types/savefileTypes";
import { CatsContent } from "../components/styled/LayoutStyle";
import { CatsReducer } from "../reducers/CatsReducers";
import { CatsContext } from "../contexts/CatsContext";
import { CatsDispatchContext } from "../contexts/CatsDispatchContext";
import { CatInfo } from "../components/CatInfo";

export const Cats = () => {
  const savefile: ISavefile = useLoaderData() as ISavefile;
  const [cats, dispatch] = useReducer(CatsReducer, savefile.cats);

  return (
    <>
      <MainContent>
        <CatsContent>
          <CatsContext.Provider value={cats}>
            <CatsDispatchContext.Provider value={dispatch}>
              {cats.map((cat) => (
                <CatInfo cat={cat} key={cat.id} />
              ))}
            </CatsDispatchContext.Provider>
          </CatsContext.Provider>
          {cats.length < 1 && (
            <h2>
              Hmm.. looks like you do not have any cats. Maybe the Witch has one
              you can buy?
            </h2>
          )}
        </CatsContent>
      </MainContent>
    </>
  );
};
