import { useEffect, useState } from "react";
import {
  ProgressBarContainer,
  ProgressBarFill,
  ProgressBarNextLevel,
} from "./styled/ProgressBarStyle";
import { countOutLevelProgress } from "../helpers/gameCalculationHelpers";

interface IProgressBar {
  catLevel: number;
  catXP: number;
}

export const ProgressBar = ({ catLevel, catXP }: IProgressBar) => {
  const [userProgress, setUserProgress] = useState(0);

  useEffect(() => {
    setUserProgress(countOutLevelProgress(catXP));
  }, [catXP]);

  return (
    <ProgressBarContainer>
      <ProgressBarFill progress={userProgress} />
      <ProgressBarNextLevel>Level {catLevel + 1}</ProgressBarNextLevel>
    </ProgressBarContainer>
  );
};
