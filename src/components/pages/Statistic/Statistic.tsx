import React from 'react';
import { converter } from '../../../utils/converter';
import styles from './Statistic.module.scss';

type StatisticsType = {
  sumCalls: number;
  averageDurationCalls: number;
};

export const Statistic: React.FC<StatisticsType> = ({
  sumCalls,
  averageDurationCalls,
}) => {
  // helper functions
  const sumTime = converter(sumCalls);
  const averageTime = converter(averageDurationCalls);

  return (
    <>
      <div className={styles.statsContainer}>
        <span className={styles.span}>
          Duration of all calls: {sumTime.hoursEdit}:{sumTime.minutesEdit}:
          {sumTime.secondsEdit}
        </span>
        <span className={styles.span}>
          Average call duration: {averageTime.hoursEdit}:{averageTime.minutesEdit}:
          {averageTime.secondsEdit}
        </span>
      </div>
    </>
  );
};
