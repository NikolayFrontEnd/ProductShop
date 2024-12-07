import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productSlice"; 
import favoritesReducer from './favoritesSlice'
export const store = configureStore({
    reducer: {
        products: productsReducer, 
        favorites: favoritesReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;