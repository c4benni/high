import { ControlledFocus } from "../../../utils/ControlledFocus";
import { eventKey } from "../../../utils/eventKey";
import { hackTabKey, nextTick, uid } from "../../../utils/main";

export const overlays = {
  indexes: [] as string[],
};

type RootRef = React.MutableRefObject<null>;

export interface OverlayRootEl extends HTMLElement {
  _close: Function;
  _away_cb: Function;
}

export function setOverlayZindex(arg: {
  rootRef: RootRef;
  setZIndex: React.Dispatch<React.SetStateAction<string | undefined>>;
  role: string;
  close: Function;
  closeAllSame?: boolean;
}) {
  const { rootRef, setZIndex, role, closeAllSame } = arg;

  if (rootRef.current) {
    const root: OverlayRootEl = rootRef.current;

    // set a uid to track zIndex
    root.id = root.id || `${role}-${uid()}`;

    const index = root.id || "";

    if (closeAllSame && overlays.indexes.length) {
      const sameOverlays = overlays.indexes.filter(
        (id) => id.startsWith(role) && id !== index
      );

      if (sameOverlays.length) {
        const wrapper = document.getElementById("ui-overlay") || document.body;

        sameOverlays.forEach((id) => {
          const overlay: OverlayRootEl | null = wrapper.querySelector(`#${id}`);

          overlay && overlay._close?.();
        });
      }
    }

    if (!overlays.indexes.includes(index)) {
      overlays.indexes = [...overlays.indexes, index];
      setZIndex(`${1000 + overlays.indexes.indexOf(index)}`);
    }
  }
}

export function awayListener(
  cb: Function,
  listeners: string[],
  action: "add" | "remove",
  rootRef: RootRef
) {
  if (rootRef.current) {
    const root: OverlayRootEl = rootRef.current;

    if (root) {
      if (action === "add") {
        const removeEvents = () => {
          listeners.forEach((evt) => {
            // @ts-ignore
            document.body.removeEventListener(
              evt,
              root._away_cb as unknown as EventListenerObject,
              {
                once: true,
              }
            );
          });
        };

        removeEvents();

        root._away_cb = (e: Event) => {
          if (e.composedPath().includes(root)) {
            return removeEvents();
          }
          cb();

          removeEvents();
        };
      }

      listeners.forEach((evt) => {
        document.body[`${action}EventListener`](
          evt,
          root._away_cb as unknown as EventListenerObject,
          {
            once: true,
          }
        );
      });
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
    const overlayRoot = document.getElementById("ui-overlay") || document.body;

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

    const key = eventKey(e.nativeEvent);
    if (key === "esc") {
      return close();
    }

    if (
      root.id !==
      overlays.indexes.filter((x) => !x.startsWith("tooltip")).slice(-1)[0]
    ) {
      return;
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
