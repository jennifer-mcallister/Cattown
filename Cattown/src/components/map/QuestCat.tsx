import { ProgressBar } from "../ProgressBar";
import {
  HeaderSmall,
  TextMedium,
  TextSmall,
  TextSmallBold,
} from "../styled/Text";
import placeholder from "/assets/cat_white.webp";
import { ICat } from "../../types/savefileTypes";
import { useEffect, useState } from "react";
import {
  CatContainer,
  CatContainerQuest,
  CatContent,
  CatContentColumn,
  CatFooter,
  CatHeader,
  CatHeaderTitleContainer,
  CatImg,
  CatImgContainer,
  CatImgContainerQuest,
  CatImgQuest,
  CatStatusContainer,
  CatTextContainer,
} from "../styled/Cat";
import { ButtonLarge, ButtonMedium } from "../styled/Button";
import {
  primaryBlue,
  primaryGreen,
  primaryPink,
  primaryRed,
  secondaryGreen,
  trainingColor,
} from "../styled/theme_variables/colors";
import { formatTime } from "../../helpers/gameCalculationHelpers";
import { StatusBox } from "../styled/NotificationStyle";
import { IconSmall } from "../styled/Icon";
const timerIcon = "/assets/icons/timer.png";

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
  const [bgColor, setBgColor] = useState("");

  useEffect(() => {
    if (cat.status === "training") {
      setBgColor(trainingColor);
    }
    if (cat.status === "downed") {
      setBgColor(primaryRed);
    }
    if (cat.status === "in camp") {
      setBgColor(secondaryGreen);
    }
    if (cat.status === "on mission") {
      setBgColor(primaryBlue);
    }
  }, [cat.status]);

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
              <HeaderSmall>Stats</HeaderSmall>
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
              {cat.status === "training" && (
                <CatStatusContainer>
                  <TextSmall>
                    {formatTime(
                      cat.trainingTimeLeft.h,
                      cat.trainingTimeLeft.min,
                      cat.trainingTimeLeft.sec
                    )}
                  </TextSmall>
                </CatStatusContainer>
              )}
              {cat.status === "on mission" && (
                <CatStatusContainer>
                  <TextSmall>
                    {formatTime(
                      cat.missionTimeLeft?.h,
                      cat.missionTimeLeft?.min,
                      cat.missionTimeLeft?.sec
                    )}
                  </TextSmall>
                </CatStatusContainer>
              )}
              {cat.status === "downed" && (
                <CatStatusContainer>
                  <TextSmall>
                    {formatTime(
                      cat.downedTimeLeft?.h,
                      cat.downedTimeLeft?.min,
                      cat.downedTimeLeft?.sec
                    )}
                  </TextSmall>
                </CatStatusContainer>
              )}
              <StatusBox bgcolor={bgColor}>
                {cat.status !== "in camp" && (
                  <IconSmall src={timerIcon} alt="timer" />
                )}

                <TextMedium>{cat.status}</TextMedium>
              </StatusBox>
            </CatContentColumn>
          </CatContent>
          <CatFooter>
            <ButtonLarge
              onClick={() => {
                selectCat(cat, questType);
                setButtonColor(primaryPink);
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
            <TextSmallBold>Lvl. {cat.level}</TextSmallBold>
          </CatFooter>
        </CatContainerQuest>
      )}
    </>
  );
};
