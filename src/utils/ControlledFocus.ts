import { isHTML } from "./main";

type Uid = string | number | null | undefined;
type Root = HTMLElement | null;
type $Children = HTMLElement[] | null | undefined;

type ControlledFocusArgs = {
  root: Root;
  children: string;
  loop?: boolean;
  preventScroll?: boolean;
  closest?: string;
  uid?: Uid;
};

export class ControlledFocus {
  constructor({
    root,
    children,
    loop = true,
    preventScroll = false,
    closest,
    uid,
  }: ControlledFocusArgs) {
    this.uid = uid;

    // ControlledFocus.saved = {
    //   ...(ControlledFocus.saved || {})
    // }

    // ControlledFocus.saved.items = [...(ControlledFocus.saved.items || [])]

    // if (ControlledFocus.saved.uid != this.uid) {
    //   ControlledFocus.saved.items = []
    //   ControlledFocus.saved.uid = this.uid
    // }

    // if (!ControlledFocus.saved.items.length) {
    //   this.root = root
    //   this.$children = this.root?.querySelectorAll?.(`${children}`)
    // } else {
    //   this.$children = ControlledFocus.saved.items
    // }

    this.root = root;
    this.$children = [
      ...((this.root?.querySelectorAll?.(
        `${children}`
      ) as unknown as HTMLElement[]) || []),
    ];

    this.root = null;
    this.loop = loop;
    this.preventScroll = preventScroll;
    this.closest = closest || children;

    this.focusableNodes =
      this.$children &&
      [...this.$children].filter((x) => {
        const validFocusable =
          isHTML(x) &&
          (x.tabIndex > -1 || +(x.getAttribute("tabindex") || -1) > -1) &&
          !x.getAttribute("disabled");

        return validFocusable
          ? this.closest
            ? x.closest(this.closest)
            : x
          : false;
      });

    // if (!ControlledFocus.saved.items?.length) {
    //   ControlledFocus.saved.items = this.focusableNodes
    // }

    this.$children = null;

    this.index =
      this.focusableNodes?.length &&
      this.focusableNodes.indexOf(
        //   @ts-ignore
        this.focusableNodes.find((x: HTMLElement) =>
          x.isSameNode(x.ownerDocument.activeElement)
        )
      );
  }

  root: Root;
  uid: Uid;
  $children: $Children;
  loop: boolean;
  preventScroll: boolean;
  closest: string;
  focusableNodes: $Children;
  index: number;

  forward(count = 0) {
    if (!this.focusableNodes?.length) {
      return;
    }
    const getIndex =
      this.index + 1 + count > this.focusableNodes.length - 1
        ? this.loop
          ? 0
          : this.focusableNodes.length - 1
        : this.index + 1 + count;

    this.focusableNodes[getIndex].focus({ preventScroll: this.preventScroll });

    this.destroy();
  }

  backward(count = 0) {
    if (!this.focusableNodes?.length) {
      return;
    }

    const getIndex =
      this.index - 1 - count < 0
        ? this.loop
          ? this.focusableNodes?.length - 1
          : 0
        : this.index - 1 - count;

    this.focusableNodes[getIndex].focus({ preventScroll: this.preventScroll });

    this.destroy();
  }

  destroy() {
    this.$children = null;
    this.root = null;
    this.focusableNodes = null;
  }
}
