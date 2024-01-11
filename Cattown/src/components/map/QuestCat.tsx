import { ICat } from "../../types/savefileTypes";
import { useEffect, useState } from "react";
import { CatContainer } from "../styled/Cat";
import { primaryPink, primaryYellow } from "../styled/style_variables/colors";
import { CatHeader } from "../cat_card/CatHeader";
import { CatContent } from "../cat_card/CatContent";
import { CatFooter } from "../cat_card/CatFooter";
import { CatQuestMobile } from "../cat_card/CatQuestMobile";

interface IQuestCatProps {
  cat: ICat;
  questType: string;
  zoneLevel: number;
  selectCat: (cat: ICat, type: string) => void;
}

export const QuestCat = ({
  cat,
  questType,
  zoneLevel,
  selectCat,
}: IQuestCatProps) => {
  const [buttonColor, setButtonColor] = useState<string>();
  const [imgLoaded, setImgLoaded] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLoading = () => {
    setImgLoaded(true);
  };

  const handleSendOnMission = () => {
    selectCat(cat, questType);
    setButtonColor(primaryPink);
  };

  const handleSelectCat = () => {
    selectCat(cat, questType);
    setButtonColor(primaryYellow);
  };

  return (
    <>
      {windowWidth > 768 && (
        <CatContainer key={cat.id} className={imgLoaded ? "loaded" : ""}>
          <CatHeader cat={cat} handleLoading={handleLoading} />
          <CatContent cat={cat} />
          <CatFooter
            action={handleSendOnMission}
            disable={cat.status !== "in camp" || cat.level < zoneLevel}
            buttonText={"Send on mission"}
            buttonColor={buttonColor}
            typeSelected={true}
          />
        </CatContainer>
      )}
      {windowWidth < 769 && (
        <CatQuestMobile
          cat={cat}
          zoneLevel={zoneLevel}
          buttonColor={buttonColor}
          action={handleSelectCat}
        />
      )}
    </>
  );
};
