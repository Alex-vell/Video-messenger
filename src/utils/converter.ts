export const converter = (duration: number) => {
  let remain = duration;
  let hours = Math.round(remain / (1000 * 60 * 60));
  remain = remain % (1000 * 60 * 60);

  let minutes = Math.round(remain / (1000 * 60));
  remain = remain % (1000 * 60);

  let seconds = Math.round(remain / 1000);

  return {
    hoursEdit: hours < 10 ? `${0}${hours}` : hours,
    minutesEdit: minutes < 10 ? `${0}${minutes}` : minutes,
    secondsEdit: seconds < 10 ? `${0}${seconds}` : seconds,
  };
};
