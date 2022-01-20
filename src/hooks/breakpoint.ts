import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBreakpoint } from "../redux/slice/breakpoint";
import { RootState } from "../redux/store";
import Breakpoint, { BreakpointOutput } from "../utils/breakpoints";
import screenSizes from "../utils/screenSizes";

export interface BreakpointHook extends BreakpointOutput {
  isMobile?: boolean;
}

export default function useBreakpoint() {
  const breakpointState = useSelector(
    (state: RootState) => state.breakpointSlice
  );

  const dispatch = useDispatch();

  const [breakpoint, changeBreakpoint] =
    useState<BreakpointHook>(breakpointState);

  useEffect(() => {
    if (!breakpointState.is) {
      console.log("br not set well");
      
      const updateBreakpoint = (br: BreakpointOutput) =>
        dispatch(setBreakpoint(br));

      const breakpoint: BreakpointOutput = new Breakpoint({
        config: screenSizes,
        useOrientation: true,
        onChange: (evt: BreakpointOutput) => {
          updateBreakpoint(evt);
        },
      });

      updateBreakpoint({
        is: breakpoint.is,
        orientation: breakpoint.orientation,
      });
    }

    changeBreakpoint({
      ...breakpointState,
      isMobile: /xxs|xs|sm/.test(breakpointState.is),
    });

  }, [dispatch, breakpointState]);

  return [breakpoint] as const;
}
