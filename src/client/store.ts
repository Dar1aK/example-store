import {
  configureStore,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { CartState } from "@/types";
import type { ProductShortInfo } from "@common/types";
import { useDispatch, useSelector } from "react-redux";

const initialState: CartState = {};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductShortInfo>) => {
      const { id, name, price } = action.payload;

      if (!state[id]) {
        state[id] = { name, count: 0, price };
      }

      state[id].count++;
    },
    clearCart: () => {
      return initialState;
    },
  },
});

export const initStore = () => {
  const store = configureStore({
    reducer: {
      cart: cartSlice.reducer,
    },
    devTools: true,
  });

  return store;
};

export const { addToCart, clearCart } = cartSlice.actions;

export type Store = ReturnType<typeof initStore>;

export type RootState = ReturnType<Store["getState"]>;

export type AppDispatch = Store["dispatch"];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
