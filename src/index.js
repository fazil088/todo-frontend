import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import {configureStore} from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import todoSlice from './Slices/Slices'
import {persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';


const persistConfig = {
  key:'root',
  storage,
  version: 1
}

const persistedReducer = persistReducer(persistConfig, todoSlice);

const store = configureStore({
  devTools:true,
  reducer:persistedReducer,
  middleware:(getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck : false
    })
}) 

const persistor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
    <App/>
    </PersistGate>
  </Provider>
);
