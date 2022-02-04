import React, { useEffect, useRef, useState } from 'react';
import styles from './Main.module.scss';
import { Statistic } from './Statistic/Statistic';
import { useDispatch, useSelector } from 'react-redux';
import {
  CallType,
  endCallAC,
  removeCallAC,
  startCallAC,
  StatisticsType,
  sumCallsAC,
} from '../../redux/app-reducer';
import { Call } from './Call/Call';
import { call, hangup, start } from '../../utils/rtcFunctions';
import { AppStateType } from '../../redux/store';
import callImg from './../../assets/call.png';
import hangUpImg from './../../assets/hangUp.png';

export const Main = () => {
  const calls = useSelector<AppStateType, Array<CallType>>(state => state.app.calls);
  const statistics = useSelector<AppStateType, StatisticsType>(
    state => state.app.statistics,
  );

  const [disabledCall, setDisabledCall] = useState(false);
  const [disabledHangup, setDisabledHangup] = useState(true);

  const dispatch = useDispatch();

  let localVideoRef = useRef(null);
  let remoteVideoRef = useRef(null);
  let localStream = useRef(null);

  useEffect(() => {
    start(localVideoRef, localStream).then()
  }, []);

  const removeCall = (id: string) => {
    dispatch(removeCallAC(id));
    dispatch(sumCallsAC());
  };
  const onClickHandlerCall = () => {
    dispatch(startCallAC(Date.now()));
    setDisabledCall(true);
    setDisabledHangup(false);

    return call(localStream, remoteVideoRef);
  };
  const onClickHandlerHandUp = () => {
    const currentCall = calls.filter(el => el.duration === 0);
    const endId = currentCall[0].id;

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
          ref={localVideoRef}
        />
        <video
          className={styles.remoteVideo}
          playsInline
          preload="metadata"
          autoPlay
          ref={remoteVideoRef}
        />
      </div>

      <div className={styles.buttonBox}>
        <button
          className={styles.buttonCall}
          onClick={onClickHandlerCall}
          style={callIMG}
          disabled={disabledCall}
        />
        <button
          className={styles.buttonHangUp}
          style={hangUpIMG}
          onClick={onClickHandlerHandUp}
          disabled={disabledHangup}
        />
      </div>

      <div className={styles.statsContainer}>
        <div className={styles.callsBlock}>
          {calls.map(call => (
            <Call
              key={call.id}
              id={call.id}
              data={call.data}
              startTime={call.startTime}
              endTime={call.endTime}
              duration={call.duration}
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
