import { ProgressBar } from "../ProgressBar";
import {
  HeaderSmall,
  TextMedium,
  TextSmall,
  TextSmallBold,
} from "../styled/Text";
import placeholder from "/assets/cat_white.png";
import { ICat } from "../../types/savefileTypes";
import { useEffect, useState } from "react";
import {
  CatContainer,
  CatContainerQuest,
  CatContent,
  CatContentColumn,
  CatDivider,
  CatFooter,
  CatHeader,
  CatHeaderTitleContainer,
  CatImg,
  CatImgContainer,
  CatImgContainerQuest,
  CatImgQuest,
  CatTextColumn,
  CatTextContainer,
} from "../styled/Cat";
import { ButtonLarge, ButtonMedium } from "../styled/Button";
import { primaryGreen } from "../styled/theme_variables/colors";

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
  const imgPath = `/assets/${cat.img}`;
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

  return (
    <>
      {windowWidth > 768 && (
        <CatContainer key={cat.id} className={imgLoaded ? "loaded" : ""}>
          <CatHeader>
            <CatImgContainer>
              <CatImg
                src={cat.img ? imgPath : placeholder}
                onLoad={handleLoading}
                alt="Image of a cat"
              />
            </CatImgContainer>
            <CatHeaderTitleContainer>
              <HeaderSmall>{cat.name} </HeaderSmall>
              <TextSmallBold>Lvl. {cat.level}</TextSmallBold>
            </CatHeaderTitleContainer>
            <ProgressBar catLevel={cat.level} catXP={cat.xp} />
          </CatHeader>
          <CatContent>
            <CatContentColumn>
              <TextMedium>Stats</TextMedium>
              <CatDivider />
              <CatTextContainer>
                <TextSmall>Health</TextSmall>
                <TextSmall>{cat.health}</TextSmall>
              </CatTextContainer>
              <CatTextContainer>
                <TextSmall>Strength</TextSmall>
                <TextSmall>{cat.strength}</TextSmall>
              </CatTextContainer>
            </CatContentColumn>
            <CatContentColumn>
              <TextMedium>Status</TextMedium>
              <CatDivider />
              <TextSmallBold>{cat.status}</TextSmallBold>
              {cat.status === "training" && (
                <TextSmall>
                  Back in: {cat.trainingTimeLeft?.h}:{cat.trainingTimeLeft?.min}
                  :{cat.trainingTimeLeft?.sec}
                </TextSmall>
              )}
              {cat.status === "on mission" && (
                <TextSmall>
                  Back in: {cat.missionTimeLeft?.h}:{cat.missionTimeLeft?.min}:
                  {cat.missionTimeLeft?.sec}
                </TextSmall>
              )}
              {cat.status === "downed" && (
                <TextSmall>
                  Back in: {cat.downedTimeLeft?.h}:{cat.downedTimeLeft?.min}:
                  {cat.downedTimeLeft?.sec}
                </TextSmall>
              )}
            </CatContentColumn>
          </CatContent>
          <CatFooter>
            <ButtonLarge
              onClick={() => {
                selectCat(cat, questType);
                setButtonColor(primaryGreen);
              }}
              disabled={cat.status !== "in camp" || cat.level < zoneLevel}
              bgcolor={buttonColor}
            >
              Send on mission
            </ButtonLarge>
          </CatFooter>
        </CatContainer>
      )}
      {windowWidth < 769 && (
        <CatContainerQuest key={cat.id} className={imgLoaded ? "loaded" : ""}>
          <CatHeader>
            <CatHeaderTitleContainer>
              <HeaderSmall>{cat.name} </HeaderSmall>
              <CatTextColumn>
                <TextSmallBold>Lvl. {cat.level}</TextSmallBold>
                <TextSmall>{cat.status}</TextSmall>
              </CatTextColumn>
            </CatHeaderTitleContainer>
            <CatImgContainerQuest>
              <CatImgQuest
                src={cat.img ? imgPath : placeholder}
                onLoad={handleLoading}
                alt="Image of a cat"
              />
            </CatImgContainerQuest>
          </CatHeader>
          <CatFooter>
            <ButtonMedium
              onClick={() => {
                selectCat(cat, questType);
                setButtonColor(primaryGreen);
              }}
              disabled={cat.status !== "in camp" || cat.level < zoneLevel}
              bgcolor={buttonColor}
            >
              Pick cat
            </ButtonMedium>
          </CatFooter>
        </CatContainerQuest>
      )}
    </>
  );
};
