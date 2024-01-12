export interface ITimeLeft {
  h: number;
  min: number;
  sec: number;
}

export const countOutTimeLeft = (timeInMilliseconds: number) => {
  const hours = Math.floor(
    (timeInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (timeInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor((timeInMilliseconds % (1000 * 60)) / 1000);
  const timeLeft: ITimeLeft = {
    h: hours,
    min: minutes,
    sec: seconds,
  };

  return timeLeft;
};

export const formatTime = (h: number, min: number, sec: number) => {
  const formatedHours = h < 10 ? h.toString().padStart(2, "0") : h;
  const formatedMinutes = min < 10 ? min.toString().padStart(2, "0") : min;
  const formatedSecondes = sec < 10 ? sec.toString().padStart(2, "0") : sec;
  const formatedTime =
    formatedHours + ":" + formatedMinutes + ":" + formatedSecondes;

  return formatedTime;
};
