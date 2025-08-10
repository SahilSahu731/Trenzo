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
import authReducer from './slices/authSlices'
import productReducer from './slices/productSlice';
import categoryReducer from './slices/categorySlice';

const persistConfig = {
  key: 'root',
  storage, 
  version: 1,
  whitelist: ['theme', 'auth'],
};

const rootReducer = combineReducers({
  theme: themeReducer,
  auth : authReducer,
  products : productReducer,
  categories : categoryReducer, 
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