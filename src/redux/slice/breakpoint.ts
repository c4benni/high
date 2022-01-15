import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";

export type BreakpointSlice = {
  is: string;
  orientation: string;
};

const initialState: BreakpointSlice = {
  is: "",
  orientation: "",
};

const breakpointSlice: Slice<BreakpointSlice> = createSlice({
  name: "breakpoint",
  initialState,
  reducers: {
    setBreakpoint: (state, action: PayloadAction<BreakpointSlice>) => {
      state.is = action.payload.is;
      state.orientation = action.payload.orientation;
    },
  },
});

export const { setBreakpoint } = breakpointSlice.actions;

export default breakpointSlice.reducer;
