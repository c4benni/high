import { eventKey } from "./eventKey";

export const mediaListener = ({
  media,
  callback,
  event = "change",
}: {
  media: MediaQueryList;
  callback: MediaQueryListEvent | any;
  event?: string;
}): void => {
  try {
    media.addEventListener(event, callback);
  } catch (e: any) {
    if (/undefined is not a function/i.test(e.message)) {
      media?.addListener?.(callback);
    }
  }
};

type CopyFn = {
  text: string;
  done: Function;
  onSuccess: Function;
  onError: Function;
};

export function Copy({
  text,
  done = () => {},
  onSuccess = () => {},
  onError = () => {},
}: CopyFn): Promise<void> {
  return new Promise((r) => {
    const oldBrowser = () => {
      try {
        let psuedoInput = document.createElement("input");
        psuedoInput.classList.add("sr-only");
        psuedoInput.setAttribute("tabindex", "-1");
        psuedoInput.setAttribute("aria-hidden", "true");
        psuedoInput.value = text;
        document.body.appendChild(psuedoInput);
        psuedoInput.select();

        document.execCommand("copy");
        document.body.removeChild(psuedoInput);
        onSuccess();
      } catch (e) {
        if (e) {
          onError();
        }
      } finally {
        done();
        r();
      }
    };

    if ("clipboard" in navigator) {
      try {
        navigator.clipboard.writeText(text);
        onSuccess();
        done();

        r();
      } catch (e) {
        if (e) {
          oldBrowser();
        }
      }
    } else oldBrowser();
  });
}

export const nextAnimFrame = (callback?: Function): Promise<void> => {
  return new Promise((r) =>
    requestAnimationFrame(() => {
      r();
      callback?.();
    })
  );
};

export const nextTick = async () =>
  await new Promise<void>((resolve) => resolve()); 

export function hackTabKey(
  e: KeyboardEvent,
  cb = (e?: KeyboardEvent, key?: string) => {},
  evtKey?: string
) {
  const key = evtKey || eventKey(e);

  if (key === "tab") {
    if (!e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();

      cb(e, key);
    }
  }

  return key;
}

export function vibrate(d = 1) {
  // @ts-ignore
  typeof navigator.mozVibrate == "function"
    ? // @ts-ignore
      navigator.mozVibrate(d)
    : navigator?.vibrate?.(d);
}

export const isHTML = (x: any) => x instanceof HTMLElement;

export function isIOS() {
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
}
