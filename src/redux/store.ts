import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import appStateSlice from "./slice/appState";
import breakpointSlice from "./slice/breakpoint";
import themeSlice from "./slice/theme";

const rootReducer = combineReducers({
  breakpointSlice,
  themeSlice,
  appStateSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({ reducer: rootReducer });

export default store;
