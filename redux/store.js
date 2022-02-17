import { createStore, combineReducers } from "redux";

import itemReducer from "./items";

const rootReducer = combineReducers({
  page: itemReducer,
});
export const store = createStore(
  rootReducer,
  typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);
