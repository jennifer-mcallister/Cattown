import { ICat } from "../types/savefileTypes";
import { ProgressBar } from "./ProgressBar";
import {
  CatContainer,
  CatContent,
  CatContentColumn,
  CatDivider,
  CatFooter,
  CatHeader,
  CatImg,
  CatImgContainer,
  CatTextContainer,
} from "./styled/Cat";
import {
  HeaderSmall,
  TextMedium,
  TextSmall,
  TextSmallBold,
} from "./styled/Text";
import placeholder from "/assets/cat_white.png";
import { ButtonLarge, ButtonLargeSelect, ButtonMedium } from "./styled/Button";
import { useState } from "react";
import {
  MenuBackground,
  MenuContainer,
  MenuHeader,
  MenuHeaderItems,
} from "./styled/Menu";
import { updateCats } from "../services/CatService";

interface IPickCatTraining {
  cat: ICat;
  cats: ICat[];
}

export const PickCatTraining = ({ cat, cats }: IPickCatTraining) => {
  const [pickTime, setPickTime] = useState(false);
  const [selectedTime, setSelectedTime] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);

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
            trainingEndTime: new Date().getTime() + selectedTime,
            trainingXp: selectedTime / 1000,
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
              src={placeholder}
              onLoad={handleLoading}
              alt="Image of a cat"
            />
          </CatImgContainer>
          <HeaderSmall>{cat.name}</HeaderSmall>
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
                Back in: {cat.trainingTimeLeft?.h}:{cat.trainingTimeLeft?.min}:
                {cat.trainingTimeLeft?.sec}
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
              <h3>Pick time</h3>
              <ButtonMedium
                onClick={() => {
                  setPickTime(false);
                }}
              >
                X
              </ButtonMedium>
            </MenuHeaderItems>
          </MenuHeader>

          <ButtonLargeSelect
            onClick={() => {
              setSelectedTime(60000);
            }}
          >
            1 min
          </ButtonLargeSelect>
          <ButtonLargeSelect
            onClick={() => {
              setSelectedTime(300000);
            }}
          >
            5 min
          </ButtonLargeSelect>
          <ButtonLargeSelect
            onClick={() => {
              setSelectedTime(900000);
            }}
          >
            15 min
          </ButtonLargeSelect>
          <ButtonLargeSelect
            onClick={() => {
              setSelectedTime(3600000);
            }}
          >
            1 h
          </ButtonLargeSelect>
          <ButtonLargeSelect
            onClick={() => {
              setSelectedTime(7200000);
            }}
          >
            2 h
          </ButtonLargeSelect>
          <ButtonLargeSelect
            onClick={() => {
              setSelectedTime(28800000);
            }}
          >
            8 h
          </ButtonLargeSelect>
          <ButtonMedium onClick={confirmTraining}>Ok</ButtonMedium>
        </MenuContainer>
      </MenuBackground>
    </>
  );
};
