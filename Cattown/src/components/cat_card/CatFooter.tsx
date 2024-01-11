import { ButtonLarge, ButtonMedium } from "../styled/Button";
import { CatFooterContainer } from "../styled/Cat";

interface ICatFooterProps {
  typeSelected?: boolean;
  action: () => void;
  disable: boolean;
  buttonText: string;
  buttonColor?: string;
  secondAction?: () => void;
  secondButtonDisable?: boolean;
  secondButtonText?: string;
  secondButtonColor?: string;
}
export const CatFooter = ({
  typeSelected,
  action,
  disable,
  buttonText,
  buttonColor,
  secondAction,
  secondButtonDisable,
  secondButtonText,
  secondButtonColor,
}: ICatFooterProps) => {
  return (
    <CatFooterContainer>
      {!secondAction && !typeSelected && (
        <ButtonLarge onClick={action} disabled={disable}>
          {buttonText}
        </ButtonLarge>
      )}
      {!secondAction && typeSelected && (
        <ButtonLarge onClick={action} disabled={disable} bgcolor={buttonColor}>
          {buttonText}
        </ButtonLarge>
      )}
      {secondAction && (
        <>
          <ButtonMedium
            disabled={disable}
            bgcolor={buttonColor}
            onClick={action}
          >
            {buttonText}
          </ButtonMedium>
          <ButtonMedium
            disabled={secondButtonDisable}
            bgcolor={secondButtonColor}
            onClick={secondAction}
          >
            {secondButtonText}
          </ButtonMedium>
        </>
      )}
    </CatFooterContainer>
  );
};
