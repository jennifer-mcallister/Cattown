import { ProgressBar } from "../ProgressBar";
import {
  QuestCatImg,
  QuestContainer,
  QuestContent,
  QuestFooter,
  QuestHeader,
} from "../styled/Quest";
import { TextMedium, TextSmall } from "../styled/Text";
import catPlaceholder from "../../assets/cathead_placeholder.png";
import { ICat } from "../../types/savefileTypes";
import { useState } from "react";

interface IQuestCatProps {
  cat: ICat;
  questType: string;
  zoneLevel: number;
  selectCat: (cat: ICat, type: string) => void;
}

export const QuestCat = ({
  cat,
  questType,
  zoneLevel,
  selectCat,
}: IQuestCatProps) => {
  const [selectedCat, setSelectedCat] = useState<string>("false");

  return (
    <QuestContainer
      onClick={() => {
        selectCat(cat, questType);
        setSelectedCat("true");
      }}
      disabled={cat.status !== "in camp" || cat.level < zoneLevel}
      selected={selectedCat}
    >
      <QuestHeader>
        <h2>{cat.name}</h2>
        <TextMedium>Lvl. {cat.level}</TextMedium>
      </QuestHeader>
      <QuestContent>
        <QuestCatImg src={catPlaceholder} />
        <TextMedium>{cat.status}</TextMedium>
        {cat.status === "training" && (
          <TextSmall>
            Back in: {cat.trainingTimeLeft?.h}:{cat.trainingTimeLeft?.min}:
            {cat.trainingTimeLeft?.sec}
          </TextSmall>
        )}
        {cat.status === "on mission" && (
          <TextSmall>
            Back in: {cat.missionTimeLeft?.h}:{cat.missionTimeLeft?.min}:
            {cat.missionTimeLeft?.sec}
          </TextSmall>
        )}
        {cat.status === "downed" && (
          <TextSmall>
            Back in: {cat.downedTimeLeft?.h}:{cat.downedTimeLeft?.min}:
            {cat.downedTimeLeft?.sec}
          </TextSmall>
        )}
      </QuestContent>
      <QuestFooter>
        <ProgressBar catLevel={cat.level} catXP={cat.xp} />
      </QuestFooter>
    </QuestContainer>
  );
};
