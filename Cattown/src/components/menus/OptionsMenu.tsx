import { useState } from "react";
import { ButtonIcon, ButtonLarge } from "../styled/Button";
import {
  MenuBackground,
  MenuBody,
  MenuContainer,
  MenuFooter,
  MenuHeader,
  MenuHeaderItems,
} from "../styled/Menu";
import { useNavigate } from "react-router-dom";
import { ConfirmOptionsMenu } from "./ConfirmOptionsMenu";
import { resetSavefile } from "../../services/SavefileService";
import exitIcon from "/assets/icons/exit.png";
import soundOff from "/assets/icons/sound_off.png";
import { Icon } from "../styled/Icon";
import { HeaderSmall } from "../styled/Text";

interface IOptionsMenuProps {
  toggleOptions: () => void;
  show: boolean;
}

export const OptionsMenu = ({ toggleOptions, show }: IOptionsMenuProps) => {
  const navigate = useNavigate();

  const [confirmRestart, setConfirmRestart] = useState(false);

  const restart = () => {
    resetSavefile();
    setConfirmRestart(!confirmRestart);
    toggleOptions();
    navigate("/");
  };

  const abortRestart = () => {
    setConfirmRestart(!confirmRestart);
  };

  return (
    <>
      {show && (
        <MenuBackground>
          {!confirmRestart && (
            <MenuContainer>
              <MenuHeader>
                <MenuHeaderItems>
                  {/* add func when added sounds */}
                  <ButtonIcon onClick={() => {}} disabled={true}>
                    <Icon src={soundOff} alt="Sound off" />
                  </ButtonIcon>
                  <HeaderSmall>Options</HeaderSmall>
                  <ButtonIcon onClick={() => toggleOptions()}>
                    <Icon src={exitIcon} alt="exit" />
                  </ButtonIcon>
                </MenuHeaderItems>
              </MenuHeader>
              <MenuBody>
                <ButtonLarge onClick={toggleOptions}>Resume</ButtonLarge>
              </MenuBody>
              <MenuFooter>
                <ButtonLarge
                  onClick={() => {
                    setConfirmRestart(!confirmRestart);
                  }}
                >
                  Restart
                </ButtonLarge>
              </MenuFooter>
            </MenuContainer>
          )}
          {confirmRestart && (
            <ConfirmOptionsMenu
              confirm={restart}
              abort={abortRestart}
              header="Are you sure you want to restart?"
              text="By confirming all your game progress will be lost"
            />
          )}
        </MenuBackground>
      )}
    </>
  );
};
