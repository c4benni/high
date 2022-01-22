import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { nextAnimFrame, nextTick, sleep } from '../../../../utils/main';
import { Slot } from '../../../utils/types';
import Overlay, { TransitionDuration } from '../Overlay';

type Toggle = (open: boolean) => void

type Position = { top: number, left: number }

type SlotArgs = {
    toggle: Toggle;
    active?: boolean;
}

export interface RepositionArg extends SlotArgs {
    ref: React.MutableRefObject<null>;
}

export type OverlayPosition = 'top' | 'right' | 'bottom' | 'left';

type BoundRect = {
    width: number;
    height: number;
    left: number;
    top: number;
    right: number;
    bottom: number;
}

type Props = {
    activator: (arg: RepositionArg) => ReactNode;
    children?: Slot | ((arg: SlotArgs) => Slot);
    open?: boolean;
    onToggle?: Toggle;
    position?: OverlayPosition;
    hideArrow?: boolean;
    offset?: number;
    // default delay = 200
    delay?: number;
    role?: React.AriaRole;
    awayListeners?: string[];
    renderBackdrop?: boolean;
    lockBodyScroll?: boolean;
    transitionDuration: TransitionDuration
}

// on open,
// set transitionDuration = 1,
// onEnter, getBoundingClient if `!boundSet`;
// close overlay after boundSet, 
// onNextFrame, open with default duration

function Reposition(props: Props) {
    const activatorRef = useRef(null);

    const [mounted, setMounted] = useState(false);

    const {
        children, activator, open, awayListeners = [], lockBodyScroll,
        onToggle, offset = 8, delay, role, renderBackdrop, transitionDuration
    } = props;

    const [selfOpen, setSelfOpen] = useState(open || false);

    const hasModel = useMemo(() =>
        typeof open === 'boolean' && typeof onToggle === 'function',
        [open, onToggle]
    )

    const getOpen = useMemo(() => {
        if (hasModel) {
            return open || false;
        } return selfOpen
    }, [hasModel, open, selfOpen])

    const getToggle = useCallback(async (val: boolean) => {
        if (!mounted) return;

        const value = typeof val == 'boolean' ? val : !getOpen;

        if (!value) {
            setPsuedoOpen(false)
            setShowOverlay(false)
        }

        await nextAnimFrame()

        if (hasModel) {
            onToggle && onToggle(value)
        }

        return setSelfOpen(value);
    }, [hasModel, onToggle, getOpen, mounted])

    const [psuedoOpen, setPsuedoOpen] = useState(getOpen);

    const [showOverlay, setShowOverlay] = useState(false);

    const [pseudoDuration, setPseudoDuration] = useState<number | undefined>();

    const [contentBound, setContentBound] =
        useState<BoundRect | null>(null);

    const [inset, setInset] = useState<Position | null>(null)

    const positionTooltip = useCallback(async () => {
        await nextTick();

        if (!activatorRef.current || !getOpen || !mounted) { return }

        if (!psuedoOpen && !contentBound) {
            setPsuedoOpen(true);

            setPseudoDuration(1);
        }

        const activator: HTMLElement = activatorRef.current;

        if (activator && contentBound) {

            const { left, bottom, width, } =
                activator.getBoundingClientRect();

            const getLeft = (left - (contentBound.width / 2)) + (width / 2);

            const getTop = (bottom + offset)

            setInset({
                left: getLeft, top: getTop
            })

            await nextAnimFrame()

            if (!mounted) { return }

            setShowOverlay(true)
        }
    }, [contentBound, psuedoOpen, offset, getOpen, mounted])

    useEffect(() => {
        setMounted(true);

        if (getOpen) {
            setInset(null)
            positionTooltip()
        } else {
            setShowOverlay(false)
            setContentBound(null)
        }

        return () =>
            setMounted(false);
    }, [getOpen, positionTooltip])

    return <>
        {
            activator({
                ref: activatorRef,
                toggle: getToggle,
                active: showOverlay,
            })
        }

        <Overlay
            // if !contentBound use psuedoOpen which has no delay
            // showOverlay only toggles when everything is done;
            open={!inset ? (psuedoOpen) : showOverlay}
            onToggle={getToggle}
            renderBackdrop={renderBackdrop}
            className={'fixed'}
            style={{
                top: `${inset?.top}px`,
                left: `${inset?.left}px`
            }}
            lockBodyScroll={lockBodyScroll}
            role={role}
            duration={pseudoDuration || transitionDuration}
            onEntered={async (el) => {
                if (!contentBound && el instanceof HTMLElement) {
                    const { top, right, bottom, left, width, height }
                        = el.getBoundingClientRect()

                    await sleep(typeof delay == 'number' ? delay : 200)

                    if (getOpen) {
                        setContentBound({
                            top, right, bottom, left, width, height
                        })

                        setPsuedoOpen(false)

                        setPseudoDuration(undefined);
                    }
                }
            }}
            awayListeners={!inset ? [] : awayListeners}
        >
            {
                typeof children == 'function' ?
                    children({
                        toggle: getToggle,
                        active: showOverlay,
                    } as SlotArgs)
                    : children
            }
        </Overlay>
    </>
}

Reposition.defaultProps = {
    offset: 8,
    lockBodyScroll: true,
    renderBackdrop: false
}

export default Reposition;
