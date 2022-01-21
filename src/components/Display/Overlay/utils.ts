import { ControlledFocus } from "../../../utils/ControlledFocus";
import { eventKey } from "../../../utils/eventKey";
import { hackTabKey, nextTick } from "../../../utils/main";

export const overlays = {
  indexes: [] as string[],
};

type RootRef = React.MutableRefObject<null>;

export function setOverlayZindex(
  rootRef: RootRef,
  setZIndex: React.Dispatch<React.SetStateAction<string | undefined>>
) {
  if (rootRef.current) {
    const root: HTMLElement = rootRef.current;

    // set a uid to track zIndex
    root.id =
      root.id || `ui-${performance.now().toString(36).replace(/\./g, "-")}`;

    const index = root.id || "";

    if (!overlays.indexes.includes(index)) {
      overlays.indexes = [...overlays.indexes, index];
      setZIndex(`${1000 + overlays.indexes.indexOf(index)}`);
    }
  }
}

export function removeOverlayZIndex(
  rootRef: React.MutableRefObject<null>,
  callback?: Function
) {
  if (rootRef.current) {
    const root: HTMLElement = rootRef.current;

    const index = root.id || "";

    overlays.indexes = overlays.indexes.filter((x) => x !== index);

    root?.setAttribute("id", "");

    nextTick(() => {
      callback && callback();
    });
  }
}

export function restoreFocus(
  previousActive: HTMLElement | null,
  rootRef: RootRef
) {
  let selfId: string;

  if (rootRef.current) {
    const self: HTMLElement = rootRef.current;

    selfId = self.id;
  }

  const previousOverlayId = overlays.indexes
    .filter((x) => (selfId ? x !== selfId : true))
    .slice(-1)[0];

  // check if there's a previous overlay and focus on it;
  if (previousOverlayId) {
    const overlayRoot = document.getElementById("#ui-overlay") || document.body;

    const previousOverlayEl: HTMLElement | null = overlayRoot.querySelector(
      `#${previousOverlayId}`
    );

    if (previousOverlayEl) {
      const controlledFocus = new ControlledFocus({
        root: previousOverlayEl,
        children: "*",
      });

      return controlledFocus.forward();
    }
  }

  // if this point is reached, means no overlay, focus on the previousActive from component;
  if (previousActive instanceof HTMLElement) {
    previousActive.focus();
  }
}

export function trapFocus(
  e: React.KeyboardEvent<HTMLElement>,
  close: Function,
  rootRef: RootRef
) {
  if (rootRef.current) {
    const root: HTMLElement = rootRef.current;

    if (root.id !== overlays.indexes.slice(-1)[0]) {
      return;
    }

    const key = eventKey(e.nativeEvent);
    if (key === "esc") {
      return close();
    }
    hackTabKey(e as unknown as KeyboardEvent, (evt) => {
      const controlledFocus = new ControlledFocus({
        children: "*",
        root: evt?.currentTarget as HTMLElement,
      });

      if (evt?.shiftKey) {
        controlledFocus.backward();
      } else {
        controlledFocus.forward();
      }
    });
  }
}

export function toggleHTMLScroll(action: "add" | "remove") {
  if (action === "remove" && overlays.indexes.length) {
    return;
  }

  document.documentElement.classList[action]("dialog-active");
}
