import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './main.css';
import { className } from '../../../utils/main'
import { useSpring, a, config } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'
import { nextTick } from '../../../../utils/main';
import Button from '../../../Inputs/Button/Button';

type Props = {
    open: boolean;
    onModel?: Function;
}

type TransitionState = 'enter' | 'afterenter' | 'leave' | 'afterleave';

const items = ['save item', 'open item', 'share item', 'delete item', 'cancel']
const height = items.length * 60 + 80;

export default function BottomSheet(props: Props) {
    const [{ y }, set] = useSpring(() => ({
        y: height,
        onStart: () => /afterenter|afterleave/.test(transitionState) && $transitionState(props.open ? 'enter' : 'leave'),
        onRest: () => {
            /enter|leave/.test(transitionState) && $transitionState(props.open ? 'afterleave' : 'afterenter')
        },
    }))

    const [transitionState, $transitionState] = useState<TransitionState>('afterleave');

    useEffect(() => {
        const { open } = props;
        if (open) {
            openSheet({
                canceled: false
            });
        }
    })

    // @ts-ignore
    const openSheet = ({ canceled }) => {
        // when cancel is true, it means that the user passed the upwards threshold
        props.onModel && props.onModel(true)
        // so we change the spring config to create a nice wobbly effect
        set({ y: 0, immediate: false, config: canceled ? config.wobbly : config.stiff })
    }
    const close = async (velocity = 0) => {
        props.onModel && props.onModel(false)
        await nextTick()
        set({ y: height, immediate: false, config: { ...config.stiff, velocity } })
    }

    const bind = useDrag(
        ({ last, vxvy: [, vy], movement: [, my], cancel, canceled }) => {
            // if the user drags up passed a threshold, then we cancel
            // the drag so that the sheet resets to its open position
            if (my < -70) cancel()

            // when the user releases the sheet, we check whether it passed
            // the threshold for it to close, or if we reset it to its open positino
            if (last) {
                my > height * 0.5 || vy > 0.5 ? close(vy) : openSheet({ canceled })
            }
            // when the user keeps dragging, we just move the sheet according to
            // the cursor position
            else set({ y: my, immediate: true })
        },
        { initial: () => [0, y.get()], filterTaps: true, bounds: { top: 0 }, rubberband: true }
    )

    const display = y.to((py) => (py < height ? 'block' : 'none'))

    return (
        ReactDOM.createPortal(
            (
                <div className={
                    className([
                        'BottomSheet',
                        {
                            active: props.open,
                            invisible: transitionState === 'afterleave'
                        }
                    ])
                }
                    onClick={() => {
                        if (typeof props.onModel == 'function') {
                            close()
                        }
                    }}
                >
                    <a.div
                        className={
                            className([
                                "BottomSheetContent divide-y-[0.75px] divide-gray-300 dark:divide-gray-700",
                                {
                                    'will-change-transform': /^enter|^leave/.test(transitionState)
                                }
                            ])
                        }
                        {...bind()}
                        style={{
                            display,
                            bottom: `calc(-100vh + ${height - 100}px)`,
                            y
                        }}
                    >
                        {items.map((entry, i) => (
                            <Button
                                block
                                className={
                                    className([
                                        "h-[60px]",
                                        {
                                            'rounded-none': i > 0
                                        }
                                    ])
                                }
                                key={entry} onClick={() => (i < items.length - 1 ? alert('clicked on ' + entry) : close())} children={entry} />
                        ))}
                    </a.div>
                </div>
            ),
            document.body
        )
    )
}
