import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cartitem } from "../../features/cart/types/addtoCartResponse"; // عدّلي المسار حسب ملفك

export type CartValuesTypes = {
  status: string;
  message: string;
 numOfCartItems: number;
  cartId: null | string;
  data: {
    products: Cartitem[];
    totalCartPrice: number;
    cartOwner:string
  };
};

export const cartInitialValues: CartValuesTypes = {
  status: "",
  message: "",
 numOfCartItems: 0,
  cartId: null,
  data: {
    products: [],
    totalCartPrice: 0,
    cartOwner:""
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialValues,
reducers: {
    setCartInfo: function (state, action: PayloadAction<CartValuesTypes>) {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.numOfCartItems = action.payload.numOfCartItems;
      state.cartId = action.payload.cartId;
      state.data = {
        products: action.payload.data.products,
        totalCartPrice: action.payload.data.totalCartPrice,
        cartOwner:action.payload.data.cartOwner
      };},
    }
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;