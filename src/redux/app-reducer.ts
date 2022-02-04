import { v1 } from 'uuid';

const START_CALL = 'app/START_CALL';
const END_CALL = 'app/END_CALL';
const SET_STATISTIC = 'app/SET_STATISTIC';
const SUM_CALLS = 'app/SUM_CALLS';
const REMOVE_CALL = 'app/REMOVE_CALL';

const initialState = {
  calls: [] as Array<CallType>,
  statistics: {
    sumCalls: 0,
    averageDurationCalls: 0,
  } as StatisticsType,
};

export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionType,
): InitialStateType => {
  switch (action.type) {
    case START_CALL:
      return {
        ...state,
        calls: [
          ...state.calls,
          {
            id: v1(),
            data: new Date().toLocaleDateString(),
            startTime: new Date().toLocaleTimeString(),
            dateNowMsStart: action.dateNowMsStart,
            dateNowMsEnd: 0,
            endTime: 0,
            duration: 0,
          },
        ],
      };

    case END_CALL:
      return {
        ...state,
        calls: state.calls.map(c =>
          c.id === action.payload.id
            ? {
                ...c,
                endTime: action.payload.endTime,
                duration: action.payload.dateNowMsEnd - c.dateNowMsStart,
              }
            : c,
        ),
      };

    case SUM_CALLS:
      const arr = state.calls.map(el => el.duration);
      const sum = state.calls.reduce((sum, el) => sum + el.duration, 0);
      const averageDuration = sum / (arr.length !== 0 ? arr.length : 1);

      return {
        ...state,
        statistics: {
          sumCalls: sum,
          averageDurationCalls: averageDuration,
        },
      };

    case REMOVE_CALL:
      return {
        ...state,
        calls: state.calls.filter(call => call.id !== action.payload.id),
      };

    default:
      return state;
  }
};

//action
export const startCallAC = (dateNowMsStart: number) => {
  return {
    type: START_CALL,
    dateNowMsStart,
  } as const;
};
export const endCallAC = (id: string, endTime: string | number, dateNowMsEnd: number) => {
  return {
    type: END_CALL,
    payload: {
      id,
      endTime,
      dateNowMsEnd,
    },
  } as const;
};

export const setStatisticsAC = (
  duration: number,
  sumCalls: number,
  averageDurationCalls: number,
) => {
  return {
    type: SET_STATISTIC,
    payload: {
      duration,
      sumCalls,
      averageDurationCalls,
    },
  } as const;
};

export const sumCallsAC = () => {
  return {
    type: SUM_CALLS,
  } as const;
};

export const removeCallAC = (id: string) => {
  return {
    type: REMOVE_CALL,
    payload: {
      id,
    },
  } as const;
};

//types

export type InitialStateType = typeof initialState;
export type CallType = {
  id: string;
  data: string;
  startTime: string;
  dateNowMsStart: number;
  dateNowMsEnd: number;
  endTime: string | number;
  duration: number;
};
export type StatisticsType = {
  sumCalls: number;
  averageDurationCalls: number;
};
type ActionType =
  | ReturnType<typeof startCallAC>
  | ReturnType<typeof endCallAC>
  | ReturnType<typeof setStatisticsAC>
  | ReturnType<typeof sumCallsAC>
  | ReturnType<typeof removeCallAC>;
