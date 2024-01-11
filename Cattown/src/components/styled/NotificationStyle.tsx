import { styled } from "styled-components";
import { primaryBlue, secondaryWhite } from "./theme_variables/colors";
import { borderRadiusRoundSmall, smallBorder } from "./theme_variables/borders";
import { bounceAnimation } from "./Animations";
import { TertiaryInfoBox } from "./Quest";
import { devices } from "./theme_variables/devices";

interface INotificationProps {
  bgcolor?: string;
}

export const NotificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100vw;
  gap: 0.5rem;
  padding-top: 5vh;

  position: fixed;
  pointer-events: none;
  top: 0;

  @media (${devices.tablet}) {
    padding-top: 1.5rem;
  }
`;

export const NotificationCard = styled.div`
  display: none;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 3.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  min-width: 10rem;
  max-width: 95vw;
  background-color: ${secondaryWhite};
  border: ${smallBorder};
  border-radius: ${borderRadiusRoundSmall};
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  gap: 0.5rem;

  opacity: 0;
  transform: scale(0.5);
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;

  &.active {
    display: flex;
    opacity: 1;
    transform: translateY(0) scale(1);
    animation: ${bounceAnimation} 1s ease-in-out;
  }
`;

export const StatusBox = styled(TertiaryInfoBox)<INotificationProps>`
  background-color: ${({ bgcolor }) => (bgcolor ? bgcolor : primaryBlue)};
  height: 2rem;
`;
