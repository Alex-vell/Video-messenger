

const initialState = {
    calls: [] as Array<CallType>,
    statistics: {} as StatisticsType
}

export const appReducer = (state: InitialStateType = initialState, action: ActionType):InitialStateType => {
    switch (action.type) {
        case "SET_CALL":
            return {...state}

        default:
            return state
    }
}

export const setCall = () => {
    return {
        type: 'SET_CALL'
    } as const
}

//types
/*export type InitialStateType = {
    calls: CallType,
    statistics: StatisticsType
}*/
export type InitialStateType = typeof initialState
export type CallType = {
    data: number,
    startTime: number,
    endTime: number,
    duration: number
}
export type StatisticsType = {
    sumCalls: number
    averageDurationCalls: number
}
type ActionType = ReturnType<typeof setCall>