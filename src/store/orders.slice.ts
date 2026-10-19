import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetUserOrders } from "../features/orders/orders.actions/getUserOrder"; // عدلي المسار
import { Order } from "../features/orders/Types/OrderType";

export interface OrdersState {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  isLoading: false,
  error: null,
};

export const fetchOrders = createAsyncThunk<
  Order[],
  string,
  { rejectValue: string }
>("orders/fetchOrders", async (userId, { rejectWithValue }) => {
  const orders = await GetUserOrders(userId);
  if (!orders) return rejectWithValue("Failed to load orders");

  return orders;
});

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export const ordersReducer = ordersSlice.reducer;
export const ordersActions = ordersSlice.actions;