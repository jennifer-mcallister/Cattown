import { ButtonMedium } from "./styled/Button";
import {
  ConfirmationButtonsContainer,
  ConfirmationContainer,
} from "./styled/Container";
import { HeaderSmall, TextMediumCenter } from "./styled/Text";
import { primaryGreen, primaryRed } from "./styled/theme_variables/colors";

interface IConfirm {
  confirm: () => void;
  abort: () => void;
  header: string;
  text?: string;
}

export const Confirm = ({ confirm, abort, header, text }: IConfirm) => {
  return (
    <ConfirmationContainer>
      <HeaderSmall>{header}</HeaderSmall>
      <TextMediumCenter>{text}</TextMediumCenter>
      <ConfirmationButtonsContainer>
        <ButtonMedium onClick={confirm} bgcolor={primaryGreen}>
          Yes
        </ButtonMedium>
        <ButtonMedium onClick={abort} bgcolor={primaryRed}>
          No
        </ButtonMedium>
      </ConfirmationButtonsContainer>
    </ConfirmationContainer>
  );
};
