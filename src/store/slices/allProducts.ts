// store/slices/products.slice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetProducts } from "../../features/categores/api/getProducts"; // عدلي المسار
import { ProductsResponse } from "../../features/categores/types/allProductType"; // عدلي المسار

type ProductsState = {
  products: ProductsResponse["data"];
  isLoading: boolean;
  error: string | null;
};

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      return await GetProducts();
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to fetch products",
      );
    }
  },
);

const productsSlice = createSlice({
  name: "productsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.data;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) ?? "Something went wrong";
      });
  },
});

export const ProductsReducer = productsSlice.reducer;