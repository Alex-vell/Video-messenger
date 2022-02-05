export const converter = (duration: number): any => {
  let remain = duration;

  const ms = 1000;
  const hs = 60;
  const sc = 60;
  const tenth = 10;
  const addNull = 0;

  const hours = Math.round(remain / (ms * hs * sc));
  remain %= ms * hs * sc;

  const minutes = Math.round(remain / (ms * hs));
  remain %= ms * hs;

  const seconds = Math.round(remain / ms);

  return {
    hoursEdit: hours < tenth ? `${addNull}${hours}` : hours,
    minutesEdit: minutes < tenth ? `${addNull}${minutes}` : minutes,
    secondsEdit: seconds < tenth ? `${addNull}${seconds}` : seconds,
  };
};
