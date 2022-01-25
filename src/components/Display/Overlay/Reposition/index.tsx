import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { nextAnimFrame } from '../../../../utils/main';
import { Slot } from '../../../utils/types';
import Overlay, { TransitionDuration } from '../Overlay';
import { onEntered } from './utils';
import setPosition from './utils/setPosition';
import { BoundRect, OverlayAlign, OverlayPosition, Position } from './utils/types';

type Toggle = (open: boolean) => void

type SlotArgs = {
    toggle: Toggle;
    active?: boolean;
}

export interface RepositionArg extends SlotArgs {
    ref: React.MutableRefObject<null>;
}

type Props = {
    activator: (arg: RepositionArg) => ReactNode;
    children?: Slot | ((arg: SlotArgs) => Slot);
    open?: boolean;
    onToggle?: Toggle;
    position?: OverlayPosition;
    hideArrow?: boolean;
    arrowSize?: number;
    offset?: number;
    // default delay = 200
    delay?: number;
    role?: React.AriaRole;
    awayListeners?: string[];
    renderBackdrop?: boolean;
    lockBodyScroll?: boolean;
    transitionDuration: TransitionDuration;
    onArrowPosition?: (position: OverlayPosition) => void;
    onArrowAdjust?: (offset: number | null) => void;
    align?: OverlayAlign;
    disabled?: boolean;
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
        children, activator, open, awayListeners = [],
        lockBodyScroll, position, onToggle, offset = 8,
        delay, role, renderBackdrop, transitionDuration,
        onArrowPosition, onArrowAdjust, arrowSize, align, disabled
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
        if (!mounted || disabled) return;

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
    }, [hasModel, onToggle, getOpen, mounted, disabled])

    const [psuedoOpen, setPsuedoOpen] = useState(getOpen);

    const [showOverlay, setShowOverlay] = useState(false);

    const [pseudoDuration, setPseudoDuration] = useState<number | undefined>();

    const [contentBound, setContentBound] =
        useState<BoundRect | null>(null);

    const [inset, setInset] = useState<Position | null>(null)

    const [transformOrigin, setTransformOrigin] = useState<OverlayPosition | undefined>()

    const positionOverlay = useCallback(async () => {

        await setPosition({
            contentBound,
            psuedoOpen,
            offset,
            getOpen,
            mounted,
            activatorRef,
            position,
            arrowSize,
            align,
            setPsuedoOpen,
            setPseudoDuration,
            setInset,
            setShowOverlay,
            onArrowPosition,
            onArrowAdjust,
            setTransformOrigin,
        })
    }, [
        contentBound, psuedoOpen, offset, getOpen, arrowSize,
        mounted, position, onArrowPosition, onArrowAdjust, align
    ])

    useEffect(() => {
        setMounted(true);

        if (getOpen) {
            setInset(null)
            positionOverlay()
        } else {
            setShowOverlay(false)
            setContentBound(null)
        }

        return () =>
            setMounted(false);
    }, [getOpen, positionOverlay])

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
            className={['fixed', {
                'invisible': !inset
            }]}
            style={{
                top: `${inset?.top}px`,
                left: `${inset?.left}px`
            }}
            lockBodyScroll={lockBodyScroll}
            role={role}
            duration={pseudoDuration || transitionDuration}
            transformOrigin={transformOrigin}
            onEntered={async (el: HTMLElement | null) => {
                await onEntered({
                    el, contentBound, delay, getOpen, setContentBound, setPseudoDuration, setPsuedoOpen
                })
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
    arrowSize: 7,
    lockBodyScroll: true,
    renderBackdrop: false,
    position: 'top'
}

export default Reposition;
