import { ICat } from "../types/savefileTypes";
import { ProgressBar } from "./ProgressBar";
import {
  CatContainer,
  CatFooter,
  CatImg,
  CatImgContainer,
  CatInfoColumn,
  CatInfoContainer,
  CatStatus,
} from "./styled/Cat";
import { TextMedium, TextSmall } from "./styled/Text";
import placeholder from "../assets/cat_placeholder.png";
import { ButtonLargeSelect, ButtonMedium } from "./styled/Button";
import { useEffect, useState } from "react";
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
  const [statusColor, setStatusColor] = useState<string>("");
  const [pickTime, setPickTime] = useState(false);
  const [selectedTime, setSelectedTime] = useState(0);

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

  useEffect(() => {
    switch (cat.status) {
      case "in camp":
        setStatusColor("lightgreen");
        break;
      case "training":
        setStatusColor("yellow");
        break;
      case "on mission":
        setStatusColor("red");
        break;
      case "downed":
        setStatusColor("blue");
        break;
    }
  }, [cats]);

  return (
    <>
      <CatContainer key={cat.id}>
        <CatImgContainer>
          <CatImg src={placeholder} />
        </CatImgContainer>

        <CatInfoContainer>
          <CatInfoColumn>
            <h3>{cat.name}</h3>
            <TextMedium>lvl. {cat.level}</TextMedium>
          </CatInfoColumn>
          <CatInfoColumn>
            <TextMedium>HP {cat.health}</TextMedium>
            <TextMedium>str. {cat.strength}</TextMedium>
          </CatInfoColumn>
          <CatInfoColumn>
            <CatStatus color={statusColor}>{cat.status}</CatStatus>
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
            <ButtonMedium
              onClick={() => {
                setPickTime(true);
              }}
              disabled={cat.status !== "in camp" ? true : false}
            >
              Train
            </ButtonMedium>
          </CatInfoColumn>
        </CatInfoContainer>
        <CatFooter>
          <ProgressBar catLevel={cat.level} catXP={cat.xp} />
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
