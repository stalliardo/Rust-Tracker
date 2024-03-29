import { combineReducers, configureStore } from '@reduxjs/toolkit';

import alertsSlice from '../features/alerts/alertsSlice';
import themeSlice from '../features/theme/themeSlice';
import userSlice from '../features/user/userSlice';

const combinedReducers = combineReducers({
  user: userSlice,
  theme: themeSlice,
  alerts: alertsSlice
})

const rootReducer = (state, action) => {
  if(action.type === "user/logOut/pending" || action.type === "user/logOut/fulfilled") {
    return combinedReducers(undefined, action);
  }

  return combinedReducers(state, action)
}

export const store = configureStore({
  reducer: rootReducer
});