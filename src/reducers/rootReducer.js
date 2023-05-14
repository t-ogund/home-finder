import { setInputReducer } from "./input";
import { setHoverReducer } from "./setHoverReducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    setInputReducer,
    setHoverReducer,
})