import React, { ReactNode, useMemo, useState } from 'react';
import { DynamicObject, Slot } from '../../../utils/types';
import Reposition from '../Reposition';
import './main.css'
import { OverlayAlign, OverlayPosition } from '../Reposition/utils/types';
import { styeArrow } from '../Reposition/utils';
import { className as classes } from '../../../utils/main';

type Toggle = (open: boolean) => void

export type PopoverActivatorArgs = {
    ref: React.MutableRefObject<null>;
    toggle: Toggle;
    active?: boolean;
    attrs?: DynamicObject<string | undefined>;
}

type Props = {
    activator: (arg: PopoverActivatorArgs) => ReactNode;
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

function Popover(props: Props) {
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
        activator={(arg) => {
            const { active, toggle } = arg;

            return activator({
                ...arg,
                active,
                toggle,
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
        role={'menu'}
        awayListeners={[
            'click',
            'wheel',
            'touchmove',
        ]}
        lockBodyScroll={false}
        transitionDuration={{
            enter: 200,
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
                        'Popover',
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

Popover.defaultProps = {
    arrowSize: 7
}

export default Popover;
