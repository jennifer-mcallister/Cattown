import { IBoss } from "../types/missionTypes";
import { ICat, IStats } from "../types/savefileTypes";

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
