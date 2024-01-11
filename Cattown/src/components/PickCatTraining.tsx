import { ICat } from "../types/savefileTypes";
import { ProgressBar } from "./ProgressBar";
import {
  CatContainer,
  CatContent,
  CatContentColumn,
  CatFooter,
  CatHeader,
  CatHeaderTitleContainer,
  CatImg,
  CatImgContainer,
  CatStatusContainer,
  CatTextContainer,
} from "./styled/Cat";
import {
  HeaderSmall,
  TextMedium,
  TextSmall,
  TextSmallBold,
} from "./styled/Text";
import placeholder from "/assets/cat_white.webp";
import {
  ButtonIcon,
  ButtonLarge,
  ButtonLargeSelect,
  ButtonMedium,
} from "./styled/Button";
import { useEffect, useState } from "react";
import {
  MenuBackground,
  MenuContainer,
  MenuFooter,
  MenuHeader,
  MenuHeaderItems,
} from "./styled/Menu";
import { updateCats } from "../services/CatService";
import { QuestRewardBox, SecondaryInfoBox } from "./styled/Quest";
import { formatTime } from "../helpers/gameCalculationHelpers";
import exitIcon from "/assets/icons/exit.png";
import { Icon, IconSmall } from "./styled/Icon";
import { StatusBox } from "./styled/NotificationStyle";
import {
  primaryBlue,
  primaryRed,
  secondaryGreen,
  trainingColor,
} from "./styled/theme_variables/colors";
const timerIcon = "/assets/icons/timer.png";

interface IPickCatTraining {
  cat: ICat;
  cats: ICat[];
}

export const PickCatTraining = ({ cat, cats }: IPickCatTraining) => {
  const [pickTime, setPickTime] = useState(false);
  const [selectedTimeMin, setSelectedTimeMin] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [bgColor, setBgColor] = useState("");
  const imgPath = `/assets/${cat.img}`;
  const xpPerMinute = 150;

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

  const handleLoading = () => {
    setImgLoaded(true);
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
      await updateCats(updatedCats);
      setPickTime(false);
    } catch {
      throw new Error("Something when wrong");
    }
  };

  return (
    <>
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
              setPickTime(true);
            }}
            disabled={cat.status !== "in camp" ? true : false}
          >
            Train Cat
          </ButtonLarge>
        </CatFooter>
      </CatContainer>
      <MenuBackground show={pickTime.toString()}>
        <MenuContainer>
          <MenuHeader>
            <MenuHeaderItems>
              <HeaderSmall>Pick time</HeaderSmall>
              <ButtonIcon
                onClick={() => {
                  setPickTime(false);
                }}
              >
                <Icon src={exitIcon} alt="exit" />
              </ButtonIcon>
            </MenuHeaderItems>
          </MenuHeader>

          <ButtonLargeSelect
            onClick={() => {
              setSelectedTimeMin(1);
            }}
          >
            <QuestRewardBox>{1 * xpPerMinute} xp</QuestRewardBox>
            <SecondaryInfoBox>
              <TextMedium>1 min</TextMedium>
            </SecondaryInfoBox>
          </ButtonLargeSelect>
          <ButtonLargeSelect
            onClick={() => {
              setSelectedTimeMin(5);
            }}
          >
            <QuestRewardBox>{5 * xpPerMinute} xp</QuestRewardBox>
            <SecondaryInfoBox>
              <TextMedium>5 min</TextMedium>
            </SecondaryInfoBox>
          </ButtonLargeSelect>
          <ButtonLargeSelect
            onClick={() => {
              setSelectedTimeMin(15);
            }}
          >
            <QuestRewardBox>{15 * xpPerMinute} xp</QuestRewardBox>
            <SecondaryInfoBox>
              <TextMedium>15 min</TextMedium>
            </SecondaryInfoBox>
          </ButtonLargeSelect>
          <ButtonLargeSelect
            onClick={() => {
              setSelectedTimeMin(60);
            }}
          >
            <QuestRewardBox>{60 * xpPerMinute} xp</QuestRewardBox>
            <SecondaryInfoBox>
              <TextMedium>1 h</TextMedium>
            </SecondaryInfoBox>
          </ButtonLargeSelect>
          <ButtonLargeSelect
            onClick={() => {
              setSelectedTimeMin(120);
            }}
          >
            <QuestRewardBox>{120 * xpPerMinute} xp</QuestRewardBox>
            <SecondaryInfoBox>
              <TextMedium>2 h</TextMedium>
            </SecondaryInfoBox>
          </ButtonLargeSelect>
          <ButtonLargeSelect
            onClick={() => {
              setSelectedTimeMin(480);
            }}
          >
            <QuestRewardBox>{480 * xpPerMinute} xp</QuestRewardBox>
            <SecondaryInfoBox>
              <TextMedium>8 h</TextMedium>
            </SecondaryInfoBox>
          </ButtonLargeSelect>
          <MenuFooter>
            <ButtonMedium onClick={confirmTraining}>Ok</ButtonMedium>
          </MenuFooter>
        </MenuContainer>
      </MenuBackground>
    </>
  );
};
