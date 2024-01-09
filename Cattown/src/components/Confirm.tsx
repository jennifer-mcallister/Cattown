import { ButtonMedium } from "./styled/Button";
import {
  ConfirmationButtonsContainer,
  ConfirmationContainer,
} from "./styled/Container";
import { TextMediumCenter, TextSmall } from "./styled/Text";

interface IConfirm {
  confirm: () => void;
  abort: () => void;
  header: string;
  text?: string;
}

export const Confirm = ({ confirm, abort, header, text }: IConfirm) => {
  return (
    <ConfirmationContainer>
      <TextMediumCenter>{header}</TextMediumCenter>
      <TextSmall>{text}</TextSmall>
      <ConfirmationButtonsContainer>
        <ButtonMedium onClick={confirm}>Yes</ButtonMedium>
        <ButtonMedium onClick={abort}>No</ButtonMedium>
      </ConfirmationButtonsContainer>
    </ConfirmationContainer>
  );
};
