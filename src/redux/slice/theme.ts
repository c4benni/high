import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";

export type ThemeOption = "light" | "dark" | "";

export type ThemeSlice = {
  is: ThemeOption;
  light: boolean;
  dark: boolean;
};

const initialState: ThemeSlice = {
  is: "",
  light: true,
  dark: true,
};

const themeSlice: Slice<ThemeSlice> = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      const installed = state.is;

      if (/light|dark/.test(action.payload)) {
        state.is = action.payload as ThemeOption;
      } else state.is = "dark";

      state.dark = state.is !== "light";
      state.light = state.is === "light";

      // if (process.client) {
      const isLight = state.light;

      const currentTheme = isLight ? "dark" : "light";
      const replaceWith = isLight ? "light" : "dark";

      const html = document.documentElement;
      !installed && html.classList.add(currentTheme);
      html.classList.replace(currentTheme, replaceWith);
      // }
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
