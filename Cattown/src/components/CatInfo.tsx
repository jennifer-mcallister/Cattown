import { ICat } from "../types/savefileTypes";
import { ButtonMedium } from "./styled/Button";
import {
  CatContainer,
  CatImg,
  CatImgContainer,
  CatInfoColumn,
  CatInfoContainer,
  CatStatus,
} from "./styled/Cat";
import { TextMedium, TextSmall } from "./styled/Text";
import placeholder from "../assets/cat_placeholder.png";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { MenuBackground } from "./styled/Menu";
import {
  ConfirmationButtonsContainer,
  ConfirmationContainer,
} from "./styled/Container";
import { Form, FormInput } from "./styled/Form";
import { updateCats } from "../services/CatService";
import { ProgressBar } from "./ProgressBar";

interface ICatInfoProps {
  cat: ICat;
  cats: ICat[];
}

export const CatInfo = ({ cat, cats }: ICatInfoProps) => {
  const [changeName, setChangeName] = useState(false);
  const [newName, setNewName] = useState("");
  const [statusColor, setStatusColor] = useState<string>("");

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
    <CatContainer key={cat.id}>
      {changeName && (
        <MenuBackground show={"true"}>
          <ConfirmationContainer>
            <h3>Enter new name for: {cat.name}</h3>
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
                <ButtonMedium type="submit">Yes</ButtonMedium>
                <ButtonMedium onClick={toggleChangeName}>No</ButtonMedium>
              </ConfirmationButtonsContainer>
            </Form>
          </ConfirmationContainer>
        </MenuBackground>
      )}
      <CatImgContainer>
        <CatImg src={placeholder} />
      </CatImgContainer>
      <CatInfoContainer>
        <CatInfoColumn>
          <h3>
            {cat.name} lvl. {cat.level}
          </h3>
          <TextMedium>HP {cat.health}</TextMedium>
          <TextMedium>Str. {cat.strength}</TextMedium>
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
          <TextSmall>{cat.xp} XP</TextSmall>
          <ProgressBar catLevel={cat.level} catXP={cat.xp} />
        </CatInfoColumn>
        <CatInfoColumn>
          <ButtonMedium onClick={toggleChangeName}>Change name</ButtonMedium>
          <ButtonMedium
            onClick={() => {
              deleteCat(cat);
            }}
          >
            Retire
          </ButtonMedium>
        </CatInfoColumn>
      </CatInfoContainer>
    </CatContainer>
  );
};
