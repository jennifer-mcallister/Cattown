import { useState } from "react";
import { IBoss, IMission } from "../../types/missionTypes";
import { ICat, IStats } from "../../types/savefileTypes";
import { Boss } from "./Boss";
import { Mission } from "./Mission";
import { ButtonIcon } from "../styled/Button";
import {
  QuestMenuBackground,
  QuestsMenuContainer,
  QuestsMenuContent,
  QuestsMenuFooter,
  QuestsMenuHeader,
  TertiaryInfoBox,
} from "../styled/Quest";
import { defaultMission } from "../../models/Misson";
import { defaultCat } from "../../models/Cat";
import { defaultBoss } from "../../models/Boss";
import { QuestCat } from "./QuestCat";
import { updateCats } from "../../services/CatService";
import { ConfirmMission } from "./ConfirmMission";
import { ConfirmBoss } from "./ConfirmBoss";
import {
  bossFight,
  countOutCatLevel,
} from "../../helpers/gameCalculationHelpers";
import { updateUniqueItems } from "../../services/SavefileService";
import { HeaderBig, HeaderSmall, TextMediumCenter } from "../styled/Text";
import exitIcon from "/assets/icons/exit.png";
import { Icon } from "../styled/Icon";
import { McGuffinImg } from "../styled/LibraryStyle";
import { StatusBoxBig } from "../styled/NotificationStyle";
import { primaryGreen, primaryYellow } from "../styled/style_variables/colors";

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
  toggleShowWinner: () => void;
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
  toggleShowWinner,
}: IQuestMenuProps) => {
  const [questType, setQuestType] = useState("");
  const [bossFightSuccess, setBossFightSuccess] = useState(false);
  const [showBossFightResult, setShowBossFightSuccess] = useState(false);
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
            return {
              ...cat,
              xp: cat.xp + 500,
              level: countOutCatLevel(cat.xp + 500),
              strength:
                countOutCatLevel(cat.xp + 500) > cat.level
                  ? cat.strength + cat.level * 2
                  : cat.strength,
              health:
                countOutCatLevel(cat.xp + 500) > cat.level
                  ? cat.health + cat.level * 10
                  : cat.health,
            };
          }
          return cat;
        });
        await updateCats(updatedCats);
        await updateUniqueItems(updatedUniqueItems);
        if (updatedUniqueItems.length > 3) {
          toggleShowWinner();
          setShowConfirmBoss(false);
          toggleShowQuests();
        } else {
          setShowBossFightSuccess(true);
        }
        setShowConfirmBoss(false);
        setBossFightSuccess(true);
      }
    } catch {
      throw new Error("Something when wrong");
    }
  };

  return (
    <>
      <QuestMenuBackground>
        <QuestsMenuContainer>
          <QuestsMenuHeader>
            <HeaderSmall>
              {zone} lvl. {zoneLevel} - {zoneLevel + 5}
            </HeaderSmall>
            <ButtonIcon onClick={toggleShowQuests}>
              <Icon src={exitIcon} alt="exit" />
            </ButtonIcon>
          </QuestsMenuHeader>
          {showQuests && (
            <QuestsMenuContent>
              {missions
                .sort((a, b) =>
                  a.type > b.type ? 1 : b.type > a.type ? -1 : 0
                )
                .map((mission, index) => (
                  <Mission
                    mission={mission}
                    key={index}
                    selectMission={selectMission}
                  />
                ))}
              <Boss boss={boss} bossDead={bossDead} selectBoss={selectBoss} />
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
            <ConfirmMission
              quest={missionQuest}
              confirmMission={confirmMission}
            />
          )}
          {showConfirmBoss && (
            <>
              {!showBossFightResult && (
                <ConfirmBoss
                  quest={bossQuest}
                  confirmBoss={confirmBoss}
                  userStats={userStats}
                />
              )}
            </>
          )}
          {showBossFightResult && (
            <>
              {bossFightSuccess && (
                <StatusBoxBig bgcolor={primaryGreen}>
                  <HeaderBig>Success!</HeaderBig>
                </StatusBoxBig>
              )}
              {!bossFightSuccess && (
                <StatusBoxBig bgcolor={primaryYellow}>
                  <HeaderBig>Fail!</HeaderBig>
                </StatusBoxBig>
              )}

              {bossFightSuccess && (
                <McGuffinImg
                  src={
                    boss.mcguffinId
                      ? `/assets/mcguffin_${boss.mcguffinId}.webp`
                      : ""
                  }
                  alt="Image of an McGuffin"
                />
              )}
              <QuestsMenuFooter>
                <TextMediumCenter>
                  {bossFightSuccess
                    ? `You have slayed ${boss.name} and McGuffin ${boss.mcguffinId} is now yours! `
                    : `This time you were to weak and ${boss.name} was not defeated.`}
                </TextMediumCenter>
              </QuestsMenuFooter>
            </>
          )}

          {questType === "boss" && bossQuest.cats.length < 3 && (
            <QuestsMenuFooter>
              <TertiaryInfoBox>
                <HeaderSmall>Pick 3 cats</HeaderSmall>
              </TertiaryInfoBox>
            </QuestsMenuFooter>
          )}
        </QuestsMenuContainer>
      </QuestMenuBackground>
    </>
  );
};
