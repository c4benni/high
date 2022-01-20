import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { AsideSlice, setAside } from "../redux/slice/appState";
import { RootState } from "../redux/store";

export function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export function useChatAside() {
  const dispatch = useDispatch();

  const { chatAside } = useSelector((state: RootState) => state.appStateSlice);

  const toggleSidebar = (newState: AsideSlice) => dispatch(setAside(newState));

  return [chatAside, toggleSidebar] as const;
}
