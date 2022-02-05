import React from 'react';

import { converter } from '../../../utils/converter';

import styles from './Call.module.scss';

type StatisticsType = {
  id: string;
  data: string;
  startTime: string;
  endTime: string | number;
  duration: number;
  disabled: boolean;
  removeCallCallback: (id: string) => void;
};

export const Call: React.FC<StatisticsType> = ({
  id,
  data,
  startTime,
  endTime,
  duration,
  disabled,
  removeCallCallback,
}) => {
  const onClickHandler = (): any => {
    removeCallCallback(id);
  };

  // helper function
  const time = converter(duration);

  const timeNull = 0;
  const endTimeMod =
    endTime === timeNull ? `${endTime}0:${endTime}0:${endTime}0` : endTime;
  const durationMod = `${time.hoursEdit}: ${time.minutesEdit}: ${time.secondsEdit}`;
  return (
    <div className={styles.callContainer} key={id}>
      <span className={styles.span}> Date: {data}</span>
      <span className={styles.span}> Start time: {startTime}</span>
      <span className={styles.span}> End time: {endTimeMod}</span>
      <span className={styles.span}> Duration: {durationMod}</span>
      <button
        type="button"
        className={styles.button}
        onClick={onClickHandler}
        disabled={disabled}
      >
        ×
      </button>
    </div>
  );
};
