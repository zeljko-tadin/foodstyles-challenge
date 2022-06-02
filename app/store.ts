import { configureStore } from "@reduxjs/toolkit";
import cardListReducer from "../features/card-list/cardListSlice";

export const store = configureStore({
  reducer: {
    cardList: cardListReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;