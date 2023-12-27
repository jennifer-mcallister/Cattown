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
