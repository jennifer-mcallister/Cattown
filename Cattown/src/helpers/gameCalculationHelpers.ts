import { IBoss } from "../types/missionTypes";
import { ICat, IStats } from "../types/savefileTypes";

export interface ITimeLeft {
  h: number;
  min: number;
  sec: number;
}

const baseXP = 100;
const exponent = 1.5;

export const countOutCatLevel = (catXP: number) => {
  const level = Math.pow(catXP / baseXP, 1 / exponent);
  return Math.floor(level);
};

export const countOutXpForLevel = (level: number) => {
  return Math.floor(baseXP * Math.pow(level, exponent));
};

export const countOutLevelProgress = (catXP: number) => {
  const catLevel = countOutCatLevel(catXP);
  const nextLevelXP = countOutXpForLevel(catLevel + 1);
  const progressInPrecentage = (catXP / nextLevelXP) * 100;
  return Math.min(100, Math.max(0, progressInPrecentage));
};

export const countOutTimeLeft = (timeInMilliseconds: number) => {
  const hours = Math.floor(
    (timeInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (timeInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor((timeInMilliseconds % (1000 * 60)) / 1000);
  const timeLeft: ITimeLeft = { h: hours, min: minutes, sec: seconds };

  return timeLeft;
};

export const countOutBossFightSuccessChance = (
  boss: IBoss,
  cats: ICat[],
  userStats: IStats
) => {
  const simulation = 100;
  let wins = 0;

  for (let i = 0; i < simulation; i++) {
    const win = bossFight(boss, cats, userStats);
    win ? (wins += 1) : wins;
  }

  const successChance = wins;
  return successChance;
};

export const bossFight = (
  questBoss: IBoss,
  questCats: ICat[],
  userStats: IStats
) => {
  let win = false;

  let bossHealth = questBoss.health;
  const bossDamage =
    questBoss.strength +
    (1 - userStats.fireRes / 100) * questBoss.fireDamage +
    (1 - userStats.waterRes / 100) * questBoss.waterDamage +
    (1 - userStats.natureRes / 100) * questBoss.natureDamage +
    (1 - userStats.shadowRes / 100) * questBoss.shadowDamage;

  for (let i = 0; i < questCats.length; i++) {
    let catHealth = questCats[i].health;
    let catDamage = questCats[i].strength;

    do {
      if (Math.random() * 100 < userStats.critChance) {
        catDamage = catDamage * 2;
      }

      if (Math.random() * 100 > 20) {
        catHealth = catHealth - bossDamage;
      }

      if (Math.random() * 100 > 20) {
        bossHealth = bossHealth - catDamage;
      }

      catDamage = questCats[i].strength;

      if (bossHealth < 1) {
        win = true;
        break;
      }
    } while (catHealth > 0);
    if (win === true) {
      break;
    }
  }

  return win;
};
