import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";

export type AsideSlice = {
  visible: boolean;
  disabled: boolean;
};

export type AppStateSlice = {
  chatAside: AsideSlice;
};

const initialState: AppStateSlice = {
  chatAside: {
    visible: true,
    disabled: true,
  },
};

const appStateSlice: Slice<AppStateSlice> = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setAside: (state, action: PayloadAction<AsideSlice>) => {
      state.chatAside = action.payload;
    },
  },
});

export const { setAside } = appStateSlice.actions;

export default appStateSlice.reducer;
