import React, { FC, useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import callImg from '../../assets/call.png';
import hangUpImg from '../../assets/hangUp.png';
import {
  CallType,
  endCallAC,
  removeCallAC,
  startCallAC,
  StatisticsType,
  sumCallsAC,
} from '../../redux/app-reducer';
import { AppStateType } from '../../redux/store';
import { call, hangup, start } from '../../utils/rtcFunctions';

import { Call } from './Call/Call';
import styles from './Main.module.scss';
import { Statistic } from './Statistic/Statistic';

type MainType = {};

export const Main: FC<MainType> = () => {
  const calls = useSelector<AppStateType, Array<CallType>>(state => state.app.calls);
  const statistics = useSelector<AppStateType, StatisticsType>(
    state => state.app.statistics,
  );
  const [disabledCall, setDisabledCall] = useState(false);
  const [disabledHangup, setDisabledHangup] = useState(true);

  const dispatch = useDispatch();

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localStream = useRef(null);

  useEffect(() => {
    start(localVideoRef, localStream).then();
  }, []);

  const removeCall = (id: string): any => {
    dispatch(removeCallAC(id));
    dispatch(sumCallsAC());
  };
  const onClickHandlerCall = (): any => {
    dispatch(startCallAC(Date.now()));
    setDisabledCall(true);
    setDisabledHangup(false);

    return call(localStream, remoteVideoRef);
  };
  const onClickHandlerHandUp = (): any => {
    const firstElArray = 0;
    const durationNull = 0;
    const currentCall = calls.filter(el => el.duration === durationNull);
    const endId = currentCall[firstElArray].id;

    dispatch(endCallAC(endId, new Date().toLocaleTimeString(), Date.now()));
    dispatch(sumCallsAC());

    hangup();

    setDisabledHangup(true);
    setDisabledCall(false);
  };

  const callIMG = {
    backgroundImage: `url(${callImg})`,
  };
  const hangUpIMG = {
    backgroundImage: `url(${hangUpImg})`,
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.videoBox}>
        <video
          className={styles.localVideo}
          playsInline
          preload="metadata"
          autoPlay
          muted
          ref={localVideoRef}
        />
        <video
          className={styles.remoteVideo}
          playsInline
          preload="metadata"
          autoPlay
          muted
          ref={remoteVideoRef}
        />
      </div>

      <div className={styles.buttonBox}>
        <button
          className={styles.buttonCall}
          type="button"
          onClick={onClickHandlerCall}
          style={callIMG}
          disabled={disabledCall}
        >
          s
        </button>
        <button
          className={styles.buttonHangUp}
          style={hangUpIMG}
          type="button"
          onClick={onClickHandlerHandUp}
          disabled={disabledHangup}
        >
          r
        </button>
      </div>

      <div className={styles.statsContainer}>
        <div className={styles.callsBlock}>
          {calls.map(c => (
            <Call
              key={c.id}
              id={c.id}
              data={c.data}
              startTime={c.startTime}
              endTime={c.endTime}
              duration={c.duration}
              disabled={disabledCall}
              removeCallCallback={removeCall}
            />
          ))}
        </div>

        <div className={styles.statsBlock}>
          <Statistic
            sumCalls={statistics.sumCalls}
            averageDurationCalls={statistics.averageDurationCalls}
          />
        </div>
      </div>
    </div>
  );
};
