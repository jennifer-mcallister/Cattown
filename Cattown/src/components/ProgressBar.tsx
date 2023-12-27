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
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(countOutLevelProgress(catXP));
  }, [catXP]);

  return (
    <ProgressBarContainer>
      <ProgressBarFill progress={progress} />
      <ProgressBarNextLevel>Level {catLevel + 1}</ProgressBarNextLevel>
    </ProgressBarContainer>
  );
};
