import { ICat } from "../types/savefileTypes";
import { ButtonMedium } from "./styled/Button";
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

interface ICatInfoProps {
  cat: ICat;
  cats: ICat[];
}

export const CatInfo = ({ cat, cats }: ICatInfoProps) => {
  const [changeName, setChangeName] = useState(false);
  const [newName, setNewName] = useState("");
  const [imgLoaded, setImgLoaded] = useState(false);

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

  return (
    <>
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
                maxLength={30}
                required
                onChange={handleChange}
              />
              <ConfirmationButtonsContainer>
                <ButtonMedium bgColor={primaryGreen} type="submit">
                  Yes
                </ButtonMedium>
                <ButtonMedium bgColor={primaryRed} onClick={toggleChangeName}>
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
          <ButtonMedium bgColor={primaryBlue} onClick={toggleChangeName}>
            New name
          </ButtonMedium>
          <ButtonMedium
            bgColor={primaryRed}
            onClick={() => {
              deleteCat(cat);
            }}
          >
            Retire
          </ButtonMedium>
        </CatFooter>
      </CatContainer>
    </>
  );
};
