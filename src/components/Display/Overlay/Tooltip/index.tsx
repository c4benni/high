import React, { ReactNode, useMemo, useState } from 'react';
import { className as classes } from '../../../utils/main';
import { eventKey } from '../../../../utils/eventKey';
import { Slot } from '../../../utils/types';
import Reposition from '../Reposition';
import './main.css'

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
}

export type OverlayPosition = 'top' | 'right' | 'bottom' | 'left';

type Props = {
    activator: (arg: TooltipActivatorArgs) => ReactNode;
    children?: Slot;
    open?: boolean;
    onToggle?: Toggle;
    position?: OverlayPosition;
    hideArrow?: boolean;
    offset?: number;
    title?: string;
    delay?: number
}

// on open,
// set transitionDuration = 1,
// onEnter, getBoundingClient if `!boundSet`;
// close overlay after boundSet, 
// onNextFrame, open with default duration

function Tooltip(props: Props) {
    const {
        children, activator, open,
        onToggle, position = 'bottom',
        hideArrow, offset = 8, title, delay = 200
    } = props;


    const getArrowPosition: OverlayPosition = useMemo(() => {
        if (position === 'top') {
            return 'bottom'
        }
        if (position === 'right') {
            return 'left'
        }
        if (position === 'bottom') {
            return 'top'
        }
        return 'right'
    }, [position])

    const [arrowPosition] =
        useState<OverlayPosition>(getArrowPosition)

    return <Reposition
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
    >
        {({ active }) => {
            return <div
                className={
                    classes([
                        'Tooltip has-arrow',
                        {
                            invisible: !active
                        },
                        !hideArrow ?
                            [
                                'has-arrow',
                                `arrow-${arrowPosition}`
                            ] : undefined
                    ])
                }
            >
                {children || title}
            </div>
        }}
    </Reposition>
}

export default Tooltip;
