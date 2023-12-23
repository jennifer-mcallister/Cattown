import { useOutletContext } from "react-router-dom";
import { MainContent } from "../components/styled/LayoutStyle";
import { TextMedium } from "../components/styled/Text";
import { ILayoutContext } from "./layout/Layout";

export const Training = () => {
  const outletContext = useOutletContext<ILayoutContext>();
  return (
    <>
      <MainContent>
        <h1>Training</h1>
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
