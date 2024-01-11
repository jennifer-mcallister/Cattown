import { ICat } from "../types/savefileTypes";
import { ButtonMedium } from "./styled/Button";
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
  TextMediumCenter,
  TextSmall,
  TextSmallBold,
} from "./styled/Text";
import placeholder from "/assets/cat_white.webp";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { MenuBackground } from "./styled/Menu";
import {
  ConfirmationButtonsContainer,
  ConfirmationContainer,
} from "./styled/Container";
import { Form, FormInput } from "./styled/Form";
import { updateCats } from "../services/CatService";
import { ProgressBar } from "./ProgressBar";
import {
  primaryBlue,
  primaryGreen,
  primaryRed,
  secondaryGreen,
  trainingColor,
} from "./styled/theme_variables/colors";
import { formatTime } from "../helpers/gameCalculationHelpers";
import { StatusBox } from "./styled/NotificationStyle";
import { IconSmall } from "./styled/Icon";
const timerIcon = "/assets/icons/timer.png";

interface ICatInfoProps {
  cat: ICat;
  cats: ICat[];
}

export const CatInfo = ({ cat, cats }: ICatInfoProps) => {
  const [changeName, setChangeName] = useState(false);
  const [newName, setNewName] = useState("");
  const [imgLoaded, setImgLoaded] = useState(false);
  const [showConfirmDeleteCat, setShowConfirmDeleteCat] = useState(false);
  const imgPath = `/assets/${cat.img}`;
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

  const handleLoading = () => {
    setImgLoaded(true);
  };

  const toggleChangeName = () => {
    setChangeName(!changeName);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const type = e.target.type;
    const value = e.target.value;

    type === "text" ? setNewName(value) : "";
  };

  const updateCatName = async (e: FormEvent) => {
    e.preventDefault();
    toggleChangeName();
    try {
      const updatedCats = [...cats].map((c) => {
        if (c.id === cat.id) {
          return {
            ...c,
            name: newName,
          };
        } else {
          return c;
        }
      });

      await updateCats(updatedCats);
    } catch {
      throw new Error("Something when wrong");
    }
  };

  const deleteCat = async (cat: ICat) => {
    try {
      const updatedCats = [...cats].filter((c) => c.id !== cat.id);
      await updateCats(updatedCats);
    } catch {
      throw new Error("Something when wrong");
    }
  };

  const handleChangeName = () => {
    toggleChangeName();
    setNewName("");
  };

  return (
    <>
      {showConfirmDeleteCat && (
        <MenuBackground show={"true"}>
          <ConfirmationContainer>
            <TextMediumCenter>
              Are you sure you want to delete {cat.name}?
            </TextMediumCenter>
            <ConfirmationButtonsContainer>
              <ButtonMedium
                bgcolor={primaryGreen}
                onClick={() => {
                  deleteCat(cat);
                }}
              >
                Yes
              </ButtonMedium>
              <ButtonMedium
                bgcolor={primaryRed}
                onClick={() => {
                  setShowConfirmDeleteCat(false);
                }}
              >
                No
              </ButtonMedium>
            </ConfirmationButtonsContainer>
          </ConfirmationContainer>
        </MenuBackground>
      )}
      {changeName && (
        <MenuBackground show={"true"}>
          <ConfirmationContainer>
            <HeaderSmall>Enter new name for: {cat.name}</HeaderSmall>
            <Form method="post" onSubmit={updateCatName}>
              <FormInput
                type="text"
                placeholder="New name"
                name="name"
                id="name"
                value={newName}
                minLength={3}
                maxLength={14}
                required
                onChange={handleChange}
              />
              <ConfirmationButtonsContainer>
                <ButtonMedium bgcolor={primaryGreen} type="submit">
                  Yes
                </ButtonMedium>
                <ButtonMedium bgcolor={primaryRed} onClick={toggleChangeName}>
                  No
                </ButtonMedium>
              </ConfirmationButtonsContainer>
            </Form>
          </ConfirmationContainer>
        </MenuBackground>
      )}
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
          <ButtonMedium
            bgcolor={primaryBlue}
            onClick={() => {
              handleChangeName();
            }}
          >
            New name
          </ButtonMedium>
          <ButtonMedium
            disabled={cats.length < 2}
            bgcolor={primaryRed}
            onClick={() => {
              setShowConfirmDeleteCat(true);
            }}
          >
            Retire
          </ButtonMedium>
        </CatFooter>
      </CatContainer>
    </>
  );
};
