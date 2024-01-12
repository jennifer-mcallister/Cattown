const baseXP = 100;
const exponent = 2;

interface ICountOutStats {
  rarity: string;
  level: number;
}

export const countOutCatLevel = (catXP: number) => {
  const level = Math.pow((catXP + 1) / baseXP, 1 / exponent);
  return Math.floor(level);
};

export const countOutXpForLevel = (level: number) => {
  const xp = Math.floor(baseXP * Math.pow(level, exponent));
  return xp;
};

export const countOutLevelProgress = (catXP: number) => {
  const catLevel = countOutCatLevel(catXP);
  const currentLevelXP = countOutXpForLevel(catLevel);
  const nextLevelXP = countOutXpForLevel(catLevel + 1);
  const levelXPDifference = nextLevelXP - currentLevelXP;
  const catXpToNextLevel = levelXPDifference - (catXP - currentLevelXP);
  const progressInPrecentage =
    catLevel < 2
      ? (catXP / nextLevelXP) * 100
      : Math.floor((1 - catXpToNextLevel / levelXPDifference) * 100);
  return progressInPrecentage;
};

export const countOutStrength = (stats: ICountOutStats) => {
  let baseStrength = 2;

  if (stats.rarity === "common") {
    baseStrength = 2;
  }
  if (stats.rarity == "uncommon") {
    baseStrength = 5;
  }
  if (stats.rarity === "rare") {
    baseStrength = 10;
  }
  if (stats.rarity === "legendary") {
    baseStrength = 15;
  }

  const strength = baseStrength * stats.level;

  return strength;
};

export const countOutHealth = (stats: ICountOutStats) => {
  let baseHealth = 10;

  if (stats.rarity === "common") {
    baseHealth = 10;
  }
  if (stats.rarity == "uncommon") {
    baseHealth = 15;
  }
  if (stats.rarity === "rare") {
    baseHealth = 20;
  }
  if (stats.rarity === "legendary") {
    baseHealth = 30;
  }

  const health = baseHealth * stats.level;

  return health;
};
