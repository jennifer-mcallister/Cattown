import { ICat } from "../../types/savefileTypes";
import { ButtonMedium } from "../styled/Button";
import {
  ConfirmationButtonsContainer,
  ConfirmationContainer,
} from "../styled/Container";
import { MenuBackground } from "../styled/Menu";
import { TextMediumCenter } from "../styled/Text";
import { primaryGreen, primaryRed } from "../styled/style_variables/colors";

interface IConfirmDeleteCatProps {
  cat: ICat;
  deleteCat: (cat: ICat) => void;
  toggleShowConfirmDelete: () => void;
}
export const ConfirmDeleteCat = ({
  cat,
  deleteCat,
  toggleShowConfirmDelete,
}: IConfirmDeleteCatProps) => {
  return (
    <MenuBackground>
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
          <ButtonMedium bgcolor={primaryRed} onClick={toggleShowConfirmDelete}>
            No
          </ButtonMedium>
        </ConfirmationButtonsContainer>
      </ConfirmationContainer>
    </MenuBackground>
  );
};
