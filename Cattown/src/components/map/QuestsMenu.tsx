import { useState } from "react";
import { IBoss, IMission } from "../../types/missionTypes";
import { ICat, IStats } from "../../types/savefileTypes";
import { Boss } from "./Boss";
import { Mission } from "./Mission";
import { ButtonMedium } from "../styled/Button";
import {
  QuestsMenuContainer,
  QuestsMenuContent,
  QuestsMenuHeader,
} from "../styled/Quest";
import { defaultMission } from "../../models/Misson";
import { defaultCat } from "../../models/Cat";
import { defaultBoss } from "../../models/Bosss";
import { QuestCat } from "./QuestCat";
import { updateCats } from "../../services/CatService";
import { ConfirmMission } from "./ConfirmMission";
import { ConfirmBoss } from "./ConfirmBoss";
import {
  bossFight,
  countOutCatLevel,
} from "../../helpers/gameCalculationHelpers";
import { updateUniqueItems } from "../../services/SavefileService";
import { TextMedium } from "../styled/Text";

interface IQuestMenuProps {
  zone: string;
  zoneLevel: number;
  missions: IMission[];
  boss: IBoss;
  bossDead: boolean;
  cats: ICat[];
  userStats: IStats;
  uniqueItems: number[];
  toggleShowQuests: () => void;
}

export interface IMissionQuest {
  mission: IMission;
  cat: ICat;
}

export interface IBossQuest {
  boss: IBoss;
  cats: ICat[];
}

export const QuestsMenu = ({
  zone,
  zoneLevel,
  missions,
  boss,
  bossDead,
  cats,
  userStats,
  uniqueItems,
  toggleShowQuests,
}: IQuestMenuProps) => {
  const [questType, setQuestType] = useState("");
  const [bossFightSuccess, setBossFightSuccess] = useState(false);
  const [showBossFightSuccess, setShowBossFightSuccess] = useState(false);
  const [showQuests, setShowQuests] = useState(true);
  const [showCats, setShowCats] = useState(false);
  const [showConfirmMission, setShowConfirmMission] = useState(false);
  const [showConfirmBoss, setShowConfirmBoss] = useState(false);
  const [missionQuest, setMissionQuest] = useState<IMissionQuest>({
    mission: defaultMission,
    cat: defaultCat,
  });
  const [bossQuest, setBossQuest] = useState<IBossQuest>({
    boss: defaultBoss,
    cats: [],
  });

  const selectMission = (mission: IMission) => {
    setMissionQuest({ ...missionQuest, mission: mission });
    setQuestType("mission");
    setShowQuests(false);
    setShowCats(true);
  };

  const selectBoss = (boss: IBoss) => {
    setBossQuest({ ...bossQuest, boss: boss });
    setQuestType("boss");
    setShowQuests(false);
    setShowCats(true);
  };

  const selectCat = (cat: ICat, questType: string) => {
    if (questType === "mission") {
      setMissionQuest({ ...missionQuest, cat: cat });
      setShowQuests(false);
      setShowCats(false);
      setShowConfirmMission(true);
    }
    if (questType === "boss") {
      const catAlreadySelected = bossQuest.cats.find(
        (catExists) => catExists.id === cat.id
      );
      if (!catAlreadySelected) {
        const updatedCats = [...bossQuest.cats, cat];
        setBossQuest({ ...bossQuest, cats: updatedCats });

        if (bossQuest.cats.length === 2) {
          setShowQuests(false);
          setShowCats(false);
          setShowConfirmBoss(true);
        }
      }
    }
  };

  const confirmMission = async () => {
    try {
      const updatedCats = [...cats].map((cat) => {
        if (cat.id === missionQuest.cat.id) {
          return {
            ...cat,
            status: "on mission",
            missionEndTime:
              new Date().getTime() + missionQuest.mission.timeInSec * 1000,
            missionXp: missionQuest.mission.timeInSec,
            missionGold: missionQuest.mission.goldReceived,
          };
        } else {
          return cat;
        }
      });
      await updateCats(updatedCats);
      toggleShowQuests();
    } catch {
      throw new Error("Something when wrong");
    }
  };

  const confirmBoss = async () => {
    const killedBoss = bossFight(bossQuest.boss, bossQuest.cats, userStats);

    try {
      if (!killedBoss) {
        const updatedCats: ICat[] = [...cats].map((cat) => {
          const foundCat = bossQuest.cats.find(
            (questCat) => questCat.id === cat.id
          );

          if (foundCat) {
            return {
              ...cat,
              status: "downed",
              downedEndTime: new Date().getTime() + 900000,
            };
          }
          return cat;
        });
        await updateCats(updatedCats);
        setShowConfirmBoss(false);
        setShowBossFightSuccess(true);
        setBossFightSuccess(false);
      }

      if (killedBoss) {
        const updatedUniqueItems: number[] = [
          ...uniqueItems,
          bossQuest.boss.mcguffinId,
        ];
        const updatedCats: ICat[] = [...cats].map((cat) => {
          const foundCat = bossQuest.cats.find(
            (questCat) => questCat.id === cat.id
          );

          if (foundCat) {
            return { ...cat, xp: countOutCatLevel(cat.xp + 500) };
          }
          return cat;
        });
        await updateCats(updatedCats);
        await updateUniqueItems(updatedUniqueItems);
        setShowConfirmBoss(false);
        setShowBossFightSuccess(true);
        setBossFightSuccess(true);
      }
    } catch {
      throw new Error("Something when wrong");
    }
  };

  return (
    <QuestsMenuContainer>
      <QuestsMenuHeader>
        <h2>Questlog for {zone}</h2>
        {questType === "boss" && <TextMedium>Pick 3 cats</TextMedium>}
        <ButtonMedium onClick={toggleShowQuests}>X</ButtonMedium>
      </QuestsMenuHeader>
      {showQuests && (
        <QuestsMenuContent>
          {missions.map((mission, index) => (
            <Mission
              mission={mission}
              key={index}
              selectMission={selectMission}
            />
          ))}
          {!bossDead && <Boss boss={boss} selectBoss={selectBoss} />}
        </QuestsMenuContent>
      )}
      {showCats && (
        <QuestsMenuContent>
          {cats.map((cat) => (
            <QuestCat
              key={cat.id}
              cat={cat}
              questType={questType}
              zoneLevel={zoneLevel}
              selectCat={selectCat}
            />
          ))}
        </QuestsMenuContent>
      )}
      {showConfirmMission && (
        <ConfirmMission quest={missionQuest} confirmMission={confirmMission} />
      )}
      {showConfirmBoss && (
        <>
          {!showBossFightSuccess && (
            <ConfirmBoss
              quest={bossQuest}
              confirmBoss={confirmBoss}
              userStats={userStats}
            />
          )}
        </>
      )}
      {showBossFightSuccess && (
        <QuestsMenuContent>
          <h2>{bossFightSuccess ? "Success!" : "Fail"}</h2>
          <TextMedium>
            {bossFightSuccess
              ? `You have slayed ${boss.name} and McGuffin ${boss.mcguffinId} is now yours! `
              : `This time you were to weak and ${boss.name} was not defeated. Your cats will be downed for 15 minutes.`}
          </TextMedium>
        </QuestsMenuContent>
      )}
    </QuestsMenuContainer>
  );
};
