import {combineReducers, createStore} from "redux";
import {appReducer} from "./app-reducer";


const rootReducer = combineReducers({
    app: appReducer
})


export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

// @ts-ignore
window.store=store;