import { useOutletContext } from "react-router-dom";
import { MainContent } from "../components/styled/LayoutStyle";
import { CatsContent } from "../components/styled/LayoutStyle";
import { CatInfo } from "../components/CatInfo";
import { ILayoutContext } from "./layout/Layout";

export const Cats = () => {
  const outletContext = useOutletContext<ILayoutContext>();

  return (
    <>
      <MainContent>
        <CatsContent>
          {outletContext.savefile.cats.map((cat) => (
            <CatInfo
              cat={cat}
              cats={outletContext.savefile.cats}
              key={cat.id}
            />
          ))}
          {outletContext.savefile.cats.map.length < 1 && (
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
