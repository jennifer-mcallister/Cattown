import { useEffect, useState } from "react";

import { ICat } from "../../types/savefileTypes";
import {
  CatContentColumn,
  CatContentContainer,
  CatStatusContainer,
  CatTextContainer,
} from "../styled/Cat";
import { IconSmall } from "../styled/Icon";
import { StatusBox } from "../styled/NotificationStyle";
import { HeaderSmall, TextMedium, TextSmall } from "../styled/Text";
import {
  primaryBlue,
  primaryRed,
  secondaryGreen,
  trainingColor,
} from "../styled/style_variables/colors";
import { formatTime } from "../../helpers/timeManagement";
const timerIcon = "/assets/icons/timer.png";

interface ICatContentProps {
  cat: ICat;
}

export const CatContent = ({ cat }: ICatContentProps) => {
  const [bgColor, setBgColor] = useState("");

  useEffect(() => {
    if (cat.status === "training") {
      setBgColor(trainingColor);
    }
    if (cat.status === "downed") {
      setBgColor(primaryRed);
    }
    if (cat.status === "in camp") {
      setBgColor(secondaryGreen);
    }
    if (cat.status === "on mission") {
      setBgColor(primaryBlue);
    }
  }, [cat.status]);

  return (
    <CatContentContainer>
      <CatContentColumn>
        <HeaderSmall>Stats</HeaderSmall>
        <CatTextContainer>
          <TextSmall>Health</TextSmall>
          <TextSmall>{cat.health}</TextSmall>
        </CatTextContainer>
        <CatTextContainer>
          <TextSmall>Strength</TextSmall>
          <TextSmall>{cat.strength}</TextSmall>
        </CatTextContainer>
      </CatContentColumn>
      <CatContentColumn>
        {cat.status === "training" && (
          <CatStatusContainer>
            <TextSmall>
              {formatTime(
                cat.trainingTimeLeft.h,
                cat.trainingTimeLeft.min,
                cat.trainingTimeLeft.sec
              )}
            </TextSmall>
          </CatStatusContainer>
        )}
        {cat.status === "on mission" && (
          <CatStatusContainer>
            <TextSmall>
              {formatTime(
                cat.missionTimeLeft?.h,
                cat.missionTimeLeft?.min,
                cat.missionTimeLeft?.sec
              )}
            </TextSmall>
          </CatStatusContainer>
        )}
        {cat.status === "downed" && (
          <CatStatusContainer>
            <TextSmall>
              {formatTime(
                cat.downedTimeLeft?.h,
                cat.downedTimeLeft?.min,
                cat.downedTimeLeft?.sec
              )}
            </TextSmall>
          </CatStatusContainer>
        )}
        <StatusBox bgcolor={bgColor}>
          {cat.status !== "in camp" && (
            <IconSmall src={timerIcon} alt="timer" />
          )}

          <TextMedium>{cat.status}</TextMedium>
        </StatusBox>
      </CatContentColumn>
    </CatContentContainer>
  );
};
