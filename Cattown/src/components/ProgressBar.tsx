import { useEffect, useState } from "react";
import {
  ProgressBarContainer,
  ProgressBarFill,
  ProgressBarNextLevel,
} from "./styled/ProgressBarStyle";
import {
  countOutLevelProgress,
  countOutXpForLevel,
} from "../helpers/gameCalculationHelpers";

interface IProgressBar {
  catLevel: number;
  catXP: number;
}

export const ProgressBar = ({ catLevel, catXP }: IProgressBar) => {
  const [userProgress, setUserProgress] = useState(0);
  const [nextLevelXP, setNextLevelXP] = useState(0);

  useEffect(() => {
    setUserProgress(countOutLevelProgress(catXP));
    setNextLevelXP(countOutXpForLevel(catLevel + 1));
  }, [catXP]);

  return (
    <>
      <ProgressBarNextLevel>
        {catXP}/{nextLevelXP} XP
      </ProgressBarNextLevel>
      <ProgressBarContainer>
        <ProgressBarFill progress={userProgress}></ProgressBarFill>
      </ProgressBarContainer>
    </>
  );
};
