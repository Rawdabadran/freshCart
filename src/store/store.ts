import { configureStore } from "@reduxjs/toolkit";
import {authReducer, initialState }from "./slices/auth.slice";
import { cartReducer, CartValuesTypes, } from "./slices/cart.slice";
import { ordersReducer, OrdersState } from "./orders.slice";
import { wishlistReducer, WishlistValuesTypes } from "./slices/wishlist.slice";
import { SearchReducer } from "./slices/search.slics";
import { ProductsReducer } from "./slices/allProducts";



export type preloadedState = {
    authReducer:initialState
    cartReducer:CartValuesTypes
    wishlistReducer:WishlistValuesTypes

   
}

export function createStore(preloadedState:preloadedState){
const mystore=configureStore({
    reducer:{
        authReducer,
        cartReducer,
        ordersReducer,
        wishlistReducer,
        SearchReducer,
        productsReducer: ProductsReducer,

    },
    preloadedState
})
return mystore

}



export type AppStore = ReturnType<typeof  createStore>
export type appState = ReturnType< AppStore["getState"]>
