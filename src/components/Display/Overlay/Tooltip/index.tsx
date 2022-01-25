import React, { ReactNode, useMemo, useState } from 'react';
import { className as classes } from '../../../utils/main';
import { eventKey } from '../../../../utils/eventKey';
import { DynamicObject, Slot } from '../../../utils/types';
import Reposition from '../Reposition';
import './main.css'
import { OverlayAlign, OverlayPosition } from '../Reposition/utils/types';
import { styeArrow } from '../Reposition/utils';
import useBreakpoint from '../../../../hooks/breakpoint';

type Toggle = (open: boolean) => void

type VoidFn = () => void;

export type TooltipActivatorEvents = {
    onBlur?: VoidFn;
    onFocus: VoidFn;
    onMouseLeave?: VoidFn;
    onMouseEnter: VoidFn;
    onMouseMove?: (evt: Event) => void;
    onKeyDown?: (evt: KeyboardEvent) => void;
    onWheel?: (evt: Event) => void;
    onTouchMove?: (evt: Event) => void;
}

export type TooltipActivatorArgs = {
    ref: React.MutableRefObject<null>;
    toggle: Toggle;
    active?: boolean;
    events?: TooltipActivatorEvents;
    attrs?: DynamicObject<string | undefined>;
}

type Props = {
    activator: (arg: TooltipActivatorArgs) => ReactNode;
    children?: Slot;
    open?: boolean;
    onToggle?: Toggle;
    position?: OverlayPosition;
    hideArrow?: boolean;
    offset?: number;
    title?: string;
    delay?: number;
    arrowSize?: number;
    align?: OverlayAlign;
}

// on open,
// set transitionDuration = 1,
// onEnter, getBoundingClient if `!boundSet`;
// close overlay after boundSet, 
// onNextFrame, open with default duration

function Tooltip(props: Props) {
    const [breakpoint] = useBreakpoint();

    const {
        children, activator, open,
        onToggle, position = 'bottom', arrowSize,
        hideArrow, offset = 8, title, delay = 200, align
    } = props;

    const [arrowPosition, setArrowPosition] =
        useState<OverlayPosition>('none');

    const [arrowAdjust, setArrowAdjust] = useState<number | null>(0);

    const Arrow = useMemo(() => styeArrow(
        !hideArrow && !align,
        arrowPosition,
        arrowAdjust,
        arrowSize
    ), [hideArrow, arrowPosition, arrowAdjust, arrowSize, align])

    return <Reposition
        disabled={breakpoint.isMobile}
        activator={(arg) => {
            const { active, toggle } = arg;

            const events: TooltipActivatorEvents = {
                onMouseEnter: () => {
                    !active && toggle(false)
                    toggle(true)
                },
                onFocus: () => {
                    !active && toggle(false)
                    toggle(true)
                },
                onBlur: () => toggle(false),
                onKeyDown: (e: KeyboardEvent) => {
                    if (eventKey(e) === 'esc' && active) {
                        toggle(false)
                    }
                },
                onMouseLeave: () => toggle(false),
            }

            return activator({
                ...arg,
                events,
                attrs: {
                    'aria-label': title || undefined
                }
            })
        }}
        delay={delay}
        open={open}
        onToggle={onToggle}
        offset={offset}
        position={position}
        hideArrow={hideArrow}
        role={'tooltip'}
        awayListeners={[
            'click',
            'wheel',
            'touchmove',
        ]}
        lockBodyScroll={false}
        transitionDuration={{
            enter: 150,
            leave: 100
        }}
        onArrowPosition={setArrowPosition}
        onArrowAdjust={setArrowAdjust}
        align={align}
    >
        {({ active }) => {
            return <div
                className={
                    classes([
                        'Tooltip',
                        {
                            invisible: !active
                        },
                        ...Arrow.class
                    ])
                }
                style={{
                    ...Arrow.style
                }}
            >
                {children || title}
            </div>
        }}
    </Reposition>
}

Tooltip.defaultProps = {
    arrowSize: 7
}

export default Tooltip;
