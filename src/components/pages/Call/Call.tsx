import React from "react";
import {CallType} from "../../../redux/app-reducer";

type StatisticsType = {
    calls: Array<CallType>
    statistics: any
}

export const Statistics: React.FC<StatisticsType> = ({calls, statistics}) => {

    let milliseconds = parseInt((duration % 1000) / 100)
    let seconds = parseInt((duration / 1000) % 60)
    let minutes = parseInt((duration / (1000 * 60)) % 60)
    let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;

    return (
        <>
            {
                calls.map(c => (
                    <div key={c.id}>
                        <span> data: {c.data};</span><span> startTime: {c.startTime};</span><span> endTime: {c.endTime};</span><span> duration: {c.duration};</span>
                    </div>
                ))
            }

            <div>
                <span> sumCalls: {statistics.sumCalls};</span><span> averageDurationCalls: {statistics.averageDurationCalls} ;</span>
            </div>
        </>
    )
}