import { ICat } from "../types/savefileTypes";
import { ButtonMedium } from "./styled/Button";
import {
  CatContainer,
  CatImg,
  CatInfoColumn,
  CatInfoContainer,
} from "./styled/Cat";
import { TextMedium } from "./styled/Text";
import placeholder from "../assets/cat_placeholder.png";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { MenuBackground } from "./styled/Menu";
import {
  ConfirmationButtonsContainer,
  ConfirmationContainer,
} from "./styled/Container";
import { Form, FormInput } from "./styled/Form";
import { updateCats } from "../services/CatService";

interface ICatInfoProps {
  cat: ICat;
  cats: ICat[];
}

export const CatInfo = ({ cat, cats }: ICatInfoProps) => {
  const navigate = useNavigate();
  const [changeName, setChangeName] = useState(false);
  const [newName, setNewName] = useState("");

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
    <CatContainer key={cat.id}>
      <CatImg src={placeholder} />
      <CatInfoContainer>
        <CatInfoColumn>
          <h3>{cat.name}</h3>
          <TextMedium>lvl. {cat.level}</TextMedium>
          <TextMedium>HP {cat.health}</TextMedium>
          <TextMedium>Str. {cat.strength}</TextMedium>
        </CatInfoColumn>
        <CatInfoColumn>
          <ButtonMedium
            onClick={() => {
              navigate("/map");
            }}
          >
            Mission
          </ButtonMedium>
          <ButtonMedium
            onClick={() => {
              navigate("/training");
            }}
          >
            Training
          </ButtonMedium>
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
    </CatContainer>
  );
};
