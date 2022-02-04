import React, {useEffect, useRef, useState} from "react";
import './Main.module.css'
import {Statistic} from "./Statistic/Statistic";
import {useDispatch, useSelector} from "react-redux";
import {endCallAC, removeCallAC, startCallAC, sumCallsAC} from "../../redux/app-reducer";
import {Call} from "./Call/Call";
import {call, hangup, start} from "../../utils/rtcFunctions";

// let pc1;
// let pc2;

export const Main = () => {
    const calls = useSelector(state => state.app.calls)
    const statistics = useSelector(state => state.app.statistics)
    const currentId = useSelector(state => state.app.calls)

    const [disabledCall, setDisabledCall] = useState(false)
    const [disabledHangup, setDisabledHangup] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        return start(localVideoRef, localStream)
    }, [])

    let localVideoRef = useRef(null)
    let remoteVideoRef = useRef(null)

    // let startTime;
    let localStream = useRef(null);

    /*const offerOptions = {
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1
    };*/

    /*function getOtherPc(pc) {
        return (pc === pc1) ? pc2 : pc1;
    }*/

    // async function start() {
    //     const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
    //     localVideoRef.current.srcObject = stream;
    //     localStream.current = stream;
    // }

    /*async function call() {
        // dispatch(startCallAC(Date.now()))
        //
        // setDisabledCall(true)
        // setDisabledHangup(false)
        startTime = window.performance.now();
        const configuration = {};
        pc1 = new RTCPeerConnection(configuration);
        pc1.addEventListener('icecandidate', e => onIceCandidate(pc1, e));
        pc2 = new RTCPeerConnection(configuration);
        pc2.addEventListener('icecandidate', e => onIceCandidate(pc2, e));
        pc2.addEventListener('track', gotRemoteStream);
        localStream.current.getTracks().forEach(track => pc1.addTrack(track, localStream.current));
        const offer = await pc1.createOffer(offerOptions);
        await onCreateOfferSuccess(offer);
    }

    async function onCreateOfferSuccess(desc) {
        await pc1.setLocalDescription(desc);
        await pc2.setRemoteDescription(desc);
        const answer = await pc2.createAnswer();
        await onCreateAnswerSuccess(answer);
    }

    function gotRemoteStream(e) {
        if (remoteVideoRef.current.srcObject !== e.streams[0]) {
            remoteVideoRef.current.srcObject = e.streams[0];
        }
    }

    async function onCreateAnswerSuccess(desc) {
        await pc2.setLocalDescription(desc);
        await pc1.setRemoteDescription(desc);
    }

    async function onIceCandidate(pc, event) {
        await (getOtherPc(pc).addIceCandidate(event.candidate));
    }*/

    /*function hangup() {
        const currentCall = currentId.filter(el => el.duration === 0)
        const endId = currentCall[0].id

        dispatch(endCallAC(endId, new Date().toLocaleTimeString(), Date.now()))
        dispatch(sumCallsAC())

        pc1.close();
        pc2.close();
        pc1 = null;
        pc2 = null;
        setDisabledHangup(true);
        setDisabledCall(false);
    }*/

    const removeCall = (id) => {
        dispatch(removeCallAC(id))
        dispatch(sumCallsAC())
    }
    const onClickHandlerCall = () => {
        dispatch(startCallAC(Date.now()))

        setDisabledCall(true)
        setDisabledHangup(false)

        call(localStream, remoteVideoRef)
    }
    const onClickHandlerHand = () => {
        const currentCall = currentId.filter(el => el.duration === 0)
        const endId = currentCall[0].id

        dispatch(endCallAC(endId, new Date().toLocaleTimeString(), Date.now()))
        dispatch(sumCallsAC())

        hangup()

        setDisabledHangup(true);
        setDisabledCall(false);
    }

    return (
        <div id="container">

            <video id="localVideo"
                   playsInline
                   preload='metadata'
                   autoPlay
                   muted
                   ref={localVideoRef}/>
            <video id="remoteVideo"
                   playsInline
                   preload='metadata'
                   autoPlay
                   ref={remoteVideoRef}/>

            <div className="box">
                <button id="callButton" onClick={onClickHandlerCall} disabled={disabledCall}>Call</button>
                <button id="hangupButton" onClick={onClickHandlerHand} disabled={disabledHangup}>Hang Up</button>
            </div>

            <div>
                {
                    calls.map(call => <Call key={call.id}
                                            id={call.id}
                                            data={call.data}
                                            startTime={call.startTime}
                                            endTime={call.endTime}
                                            duration={call.duration}
                                            disabled={disabledCall}
                                            removeCallCallback={removeCall}/>)
                }

            </div>

            <div>

                <Statistic sumCalls={statistics.sumCalls}
                           averageDurationCalls={statistics.averageDurationCalls}/>

            </div>
        </div>
    )
}