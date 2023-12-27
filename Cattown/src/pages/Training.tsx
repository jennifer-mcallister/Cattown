import { useOutletContext } from "react-router-dom";
import { MainContent } from "../components/styled/LayoutStyle";
import { ILayoutContext } from "./layout/Layout";
import { TrainingContainer } from "../components/styled/TrainingStyle";
import { PickCatTraining } from "../components/PickCatTraining";

export const Training = () => {
  const outletContext = useOutletContext<ILayoutContext>();

  return (
    <>
      <MainContent>
        <h1>Training</h1>
        <TrainingContainer>
          {outletContext.savefile.cats.map((cat) => (
            <PickCatTraining
              cat={cat}
              cats={outletContext.savefile.cats}
              key={cat.id}
            />
          ))}
        </TrainingContainer>
      </MainContent>
    </>
  );
};
