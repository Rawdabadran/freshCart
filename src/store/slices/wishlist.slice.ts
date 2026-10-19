// store/slices/wishlistSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../features/wichlist/typs/wishlist.type"; // عدّلي المسار حسب ملفك

export type WishlistValuesTypes = {
  status: string;
  count: number;
  data: Product[];
};

export const wishlistInitialValues: WishlistValuesTypes = {
  status: "",
  count: 0,
  data: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: wishlistInitialValues,
  reducers: {
    setWishlistInfo: function (state, action: PayloadAction<WishlistValuesTypes>) {
      state.status = action.payload.status;
      state.count = action.payload.count;
      state.data = action.payload.data;
    },
    removeFromWishlist: function (state, action: PayloadAction<string>) {
      state.data = state.data.filter((product) => product._id !== action.payload);
      state.count = state.data.length;
    },
    clearWishlist: function () {
      return wishlistInitialValues;
    },
  },
});

export const wishlistReducer = wishlistSlice.reducer;
export const wishlistActions = wishlistSlice.actions;