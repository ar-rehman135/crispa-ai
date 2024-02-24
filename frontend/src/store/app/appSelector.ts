import { AppState } from "../rootReducer";

export const getAppDataSelector = (state: AppState) => state.app;
