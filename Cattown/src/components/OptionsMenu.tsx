import { useState } from "react";
import { ButtonLarge, ButtonMedium } from "./styled/Button";
import {
  MenuBackground,
  MenuBody,
  MenuContainer,
  MenuFooter,
  MenuHeader,
  MenuHeaderItems,
} from "./styled/Menu";
import { useNavigate } from "react-router-dom";
import { Confirm } from "./Confirm";
import { resetSavefile } from "../services/SavefileService";
import { logoutUser } from "../services/UserService";

interface IOptionsMenuProps {
  toggleOptions: () => void;
  show: boolean;
}

export const OptionsMenu = ({ toggleOptions, show }: IOptionsMenuProps) => {
  const navigate = useNavigate();

  const [confirmRestart, setConfirmRestart] = useState(false);
  const [confirmLogOut, setConfirmLogOut] = useState(false);

  const logout = async () => {
    try {
      await logoutUser();
      setConfirmLogOut(!confirmLogOut);
      navigate("/");
    } catch {
      console.log("Something went wrong");
    }
  };

  const abortLogout = () => {
    setConfirmLogOut(!confirmLogOut);
  };

  const restart = async () => {
    try {
      await resetSavefile();
      setConfirmRestart(!confirmRestart);
      toggleOptions();
      navigate("/home");
    } catch {
      console.log("Something went wrong");
    }
  };

  const abortRestart = () => {
    setConfirmRestart(!confirmRestart);
  };

  return (
    <MenuBackground show={show.toString()}>
      {!confirmLogOut && !confirmRestart && (
        <MenuContainer>
          <MenuHeader>
            <MenuHeaderItems>
              {/* add func when added sounds */}
              <ButtonMedium onClick={() => {}} disabled={true}>
                Sound
              </ButtonMedium>
              <h2>Options</h2>
              <ButtonMedium onClick={() => toggleOptions()}>X</ButtonMedium>
            </MenuHeaderItems>
          </MenuHeader>
          <MenuBody>
            <ButtonLarge onClick={toggleOptions}>Resume</ButtonLarge>
            <ButtonLarge
              onClick={() => {
                setConfirmLogOut(!confirmLogOut);
              }}
            >
              Log out
            </ButtonLarge>
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
      {confirmLogOut && (
        <Confirm
          confirm={logout}
          abort={abortLogout}
          header="Are you sure you want to logout?"
        />
      )}
      {confirmRestart && (
        <Confirm
          confirm={restart}
          abort={abortRestart}
          header="Are you sure you want to restart?"
          text="By confirming all your game progress will be lost"
        />
      )}
    </MenuBackground>
  );
};
