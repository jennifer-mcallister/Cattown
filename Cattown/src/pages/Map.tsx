import { useOutletContext } from "react-router-dom";
import { MainContent } from "../components/styled/LayoutStyle";
import { ILayoutContext } from "./layout/Layout";
import { TextMedium } from "../components/styled/Text";

export const Map = () => {
  const outletContext = useOutletContext<ILayoutContext>();

  return (
    <>
      <MainContent>
        <h1>Map</h1>
        <h2>Availble Cats</h2>
        {outletContext.savefile.cats.map((cat) => (
          <TextMedium>
            {cat.name} lvl.{cat.level}
          </TextMedium>
        ))}
      </MainContent>
    </>
  );
};
