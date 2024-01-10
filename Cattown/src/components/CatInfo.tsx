import { ICat } from "../types/savefileTypes";
import { ButtonMedium } from "./styled/Button";
import {
  CatContainer,
  CatContent,
  CatContentColumn,
  CatDivider,
  CatFooter,
  CatHeader,
  CatHeaderTitleContainer,
  CatImg,
  CatImgContainer,
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
import { ChangeEvent, FormEvent, useState } from "react";
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
} from "./styled/theme_variables/colors";
import { formatTime } from "../helpers/gameCalculationHelpers";

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
                Back in:
                {formatTime(
                  cat.trainingTimeLeft.h,
                  cat.trainingTimeLeft.min,
                  cat.trainingTimeLeft.sec
                )}
              </TextSmall>
            )}
            {cat.status === "on mission" && (
              <TextSmall>
                Back in:
                {formatTime(
                  cat.missionTimeLeft?.h,
                  cat.missionTimeLeft?.min,
                  cat.missionTimeLeft?.sec
                )}
              </TextSmall>
            )}
            {cat.status === "downed" && (
              <TextSmall>
                Back in:
                {formatTime(
                  cat.downedTimeLeft?.h,
                  cat.downedTimeLeft?.min,
                  cat.downedTimeLeft?.sec
                )}
              </TextSmall>
            )}
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
