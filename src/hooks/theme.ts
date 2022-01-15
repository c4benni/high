import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme, ThemeOption, ThemeSlice } from "../redux/slice/theme";
import { RootState } from "../redux/store";
import { mediaListener } from "../utils/main";

export default function useTheme() {
  const dispatch = useDispatch();

  const theme = useSelector((state: RootState) => state.themeSlice);

  const [currentTheme, changeTheme] = useState<ThemeSlice>(theme);

  useEffect(() => {
    changeTheme(theme);
    if (!theme.is) {
      const currentTheme: MediaQueryList = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );

      const dispatchTheme = (value: ThemeOption) => dispatch(setTheme(value));

      if (currentTheme?.matches) {
        dispatchTheme("dark");
      } else dispatchTheme("light");

      mediaListener({
        media: currentTheme,
        callback: (e: MediaQueryListEvent) => {
          if (e.matches) {
            dispatchTheme("dark");
          } else dispatchTheme("light");
        },
      });
    }
  }, [theme, dispatch]);

  const toggleTheme = () => {
    dispatch(setTheme(theme.dark ? "light" : "dark"));
    changeTheme(theme);
  };

  return [currentTheme, toggleTheme] as const;
}
