import { ICat } from "../../types/savefileTypes";
import { CatContainer } from "../styled/Cat";
import { useState } from "react";
import { updateCats } from "../../services/CatService";
import { CatHeader } from "./CatHeader";
import { CatContent } from "./CatContent";
import { CatFooter } from "./CatFooter";
import { PickTimeMenu } from "../menus/PickTmeMenu";
import { useOutletContext } from "react-router-dom";
import { ILayoutContext } from "../../pages/layout/Layout";

interface ICatTraining {
  cat: ICat;
  cats: ICat[];
}

export const CatTraining = ({ cat, cats }: ICatTraining) => {
  const [pickTime, setPickTime] = useState(false);
  const [selectedTimeMin, setSelectedTimeMin] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const outletContext = useOutletContext<ILayoutContext>();
  const xpPerMinute = 150;

  const handleLoading = () => {
    setImgLoaded(true);
  };

  const toggleSetTime = () => {
    setPickTime(!pickTime);
  };

  const selectTime = (min: number) => {
    setSelectedTimeMin(min);
  };

  const confirmTraining = async () => {
    try {
      const updatedCats = [...cats].map((c) => {
        if (c.id === cat.id) {
          return {
            ...c,
            status: "training",
            trainingEndTime: new Date().getTime() + selectedTimeMin * 60000,
            trainingXp: selectedTimeMin * xpPerMinute,
          };
        } else {
          return c;
        }
      });
      await updateCats(updatedCats, outletContext.savefile);
      setPickTime(false);
    } catch {
      throw new Error("Something when wrong");
    }
  };

  return (
    <>
      <CatContainer key={cat.id} className={imgLoaded ? "loaded" : ""}>
        <CatHeader cat={cat} handleLoading={handleLoading} />
        <CatContent cat={cat} />
        <CatFooter
          disable={cat.status !== "in camp" ? true : false}
          action={toggleSetTime}
          buttonText="Train Cat"
        />
      </CatContainer>
      {pickTime && (
        <PickTimeMenu
          toggleMenu={toggleSetTime}
          selectTimeInMinutes={selectTime}
          confirmTraining={confirmTraining}
        />
      )}
    </>
  );
};
