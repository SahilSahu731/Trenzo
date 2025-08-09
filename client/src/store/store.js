import { configureStore, combineReducers } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

const persistConfig = {
  key: 'root',
  storage, 
  version: 1,
  whitelist: ['theme'],
};

const rootReducer = combineReducers({
  theme: themeReducer,
  // user: userReducer, // example
  // cart: cartReducer, // example
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);