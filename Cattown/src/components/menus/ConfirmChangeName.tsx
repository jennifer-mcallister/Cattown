import { Form, useOutletContext } from "react-router-dom";
import {
  ConfirmationButtonsContainer,
  ConfirmationContainer,
} from "../styled/Container";
import { MenuBackground } from "../styled/Menu";
import { HeaderSmall } from "../styled/Text";
import { FormInput } from "../styled/Form";
import { ButtonMedium } from "../styled/Button";
import { primaryGreen, primaryRed } from "../styled/style_variables/colors";
import { ICat } from "../../types/savefileTypes";
import { ChangeEvent, FormEvent, useState } from "react";
import { updateCats } from "../../services/CatService";
import { ILayoutContext } from "../../pages/layout/Layout";

interface IConfirmChangeNameProps {
  cat: ICat;
  cats: ICat[];
  toggleChangeName: () => void;
}

export const ConfirmChangeName = ({
  cat,
  cats,
  toggleChangeName,
}: IConfirmChangeNameProps) => {
  const [newName, setNewName] = useState("");
  const outletContext = useOutletContext<ILayoutContext>();

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
      console.log("change name", updatedCats);

      await updateCats(updatedCats, outletContext.savefile);
    } catch {
      throw new Error("Something when wrong");
    }
  };

  return (
    <MenuBackground>
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
  );
};
