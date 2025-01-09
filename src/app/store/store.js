import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "../../features/account/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * @description
 * Este archivo se encarga de crear el store de Redux.
 * @see configureStore
 * @see combineReducers
 * @see persistReducer
 * @see persistStore
 */

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
