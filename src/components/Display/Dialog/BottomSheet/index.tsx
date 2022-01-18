import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import './main.css';
import { className } from '../../../utils/main'
import { useSpring, a, config } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'
import { hackTabKey, nextTick } from '../../../../utils/main';
import { ControlledFocus } from '../../../../utils/ControlledFocus';
import { eventKey } from '../../../../utils/eventKey';
import useBreakpoint from '../../../../hooks/breakpoint';
import BottomSheetBackdrop from './Backdrop';

type Props = {
    open: boolean;
    onModel?: Function;
    height: number;
    style: Object;
    bottom?: string | undefined;
    children: Function;
    onBeforeEnter?: Function;
    onAfterLeave?: Function;
    onAfterEnter?: Function;
}

type TransitionState = 'enter' | 'afterenter' | 'leave' | 'afterleave';

export default function BottomSheet(props: Props) {
    const { height } = props;

    const scaleFrom = 0.75

    const [breakpoint] = useBreakpoint();

    const [{ y, scale, opacity }, api] = useSpring(() => ({
        y: height,
        scale: breakpoint.isMobile ? undefined : scaleFrom,
        opacity: breakpoint.isMobile ? undefined : 0
    }))


    const [transitionState, $transitionState] = useState<TransitionState>('afterleave');

    const [entered, $entered] = useState(false);

    const [previousActive, $previousActive] = useState<HTMLElement | null>(null)

    const contentRef = useRef<HTMLDivElement | null>(null)

    // @ts-ignore
    const openSheet = useCallback(async ({ canceled, velocity = 0, friction = 22 }) => {
        const springConfig = breakpoint.isMobile ?
            canceled ? config.wobbly : {
                tension: 170,
                friction,
                velocity
            }
            : config.stiff;
        // when cancel is true, it means that the user passed the upwards threshold
        // set transitionstate to render content
        transitionState === 'afterleave' &&
            $transitionState('enter')

        props.onModel && props.onModel(true)
        // await nextTick()

        // so we change the spring config to create a nice wobbly effect
        api.start({
            y: breakpoint.isMobile ? 0 : undefined,
            scale: 1,
            opacity: 1,
            immediate: false,
            config: springConfig,
            onStart: () => {
                $transitionState('enter')
                requestAnimationFrame(() => {
                    props.onBeforeEnter && props.onBeforeEnter()
                })
            },
            onRest: () => {
                $transitionState('afterenter')

                !entered &&
                    contentRef.current && contentRef.current.focus()
                $entered(true)

                requestAnimationFrame(() => {
                    props.onAfterEnter && props.onAfterEnter()
                })
            },
        })
    }, [
        transitionState, api, props, entered, breakpoint
    ])

    const close = useCallback(async (velocity = 0) => {
        props.onModel &&
            props.onModel(false)
        await nextTick()
        api.start({
            y: breakpoint.isMobile ? height : undefined,
            scale: breakpoint.isMobile ? undefined : scaleFrom,
            opacity: breakpoint.isMobile ? undefined : 0,
            immediate: false,
            config: { ...config.stiff, velocity },
            onStart: () => {
                $transitionState('leave')
                $entered(false)
            },
            onRest: () => {
                $transitionState('afterleave')
                props.onModel &&
                    props.onModel(false)
                $entered(false)

                requestAnimationFrame(() => {
                    props.onAfterLeave && props.onAfterLeave()
                })
            },
        })
    }, [breakpoint, height, props, api])


    useEffect(() => {
        const { open } = props;
        if (open && transitionState !== 'afterenter') {
            transitionState !== 'enter' && openSheet({
                canceled: false
            });

            $previousActive(document.activeElement as HTMLElement);

            document.documentElement.classList.add('dialog-active')
        } else if (!open && transitionState !== 'afterleave') {
            close()
            previousActive && previousActive.focus()
            $previousActive(null);
            document.documentElement.classList.remove('dialog-active')
        }
    }, [$previousActive, openSheet, previousActive, props, transitionState, close])

    const bind = useDrag(
        ({ last, vxvy: [, vy], movement: [, my], cancel, canceled }) => {
            // if the user drags up passed a threshold, then we cancel
            // the drag so that the sheet resets to its open position
            if (my < -90) cancel()

            // when the user releases the sheet, we check whether it passed
            // the threshold for it to close, or if we reset it to its open positino
            if (last) {
                my > height * 0.5 || vy > 0.5 ? close(vy) : openSheet({ canceled, velocity: vy, friction: 18 })
            }
            // when the user keeps dragging, we just move the sheet according to
            // the cursor position
            else api.start({
                y: my,
                immediate: true,
                onStart: () => {
                    $transitionState('enter')
                },
            })
        },
        {
            initial: () => [0, y?.get()],
            filterTaps: true,
            bounds: { top: 0 },
            rubberband: true
        }
    )

    return (
        ReactDOM.createPortal(
            (
                <div
                    key={breakpoint.is}
                    className={
                    className([
                        'BottomSheet',
                        {
                            active: props.open,
                            invisible: transitionState === 'afterleave'
                        }
                    ])
                }
                >
                    {
                        <BottomSheetBackdrop
                            canRender={transitionState !== 'afterleave'}
                            onClose={() => props.onModel && props.onModel(false)}
                            active={props.open}
                        />
                    }
                    {
                        transitionState !== 'afterleave' ?
                            (
                                <a.div
                                    ref={contentRef}
                                    tabIndex={0}
                                    className={
                                        className([
                                            "BottomSheetContent outline-none",
                                            {
                                                'will-change-transform': transitionState !== 'afterenter'
                                            },
                                        ])
                                    }
                                    onKeyDown={(e) => {
                                        const key = eventKey(e.nativeEvent);
                                        if (key === 'esc') {
                                            return close()
                                        }
                                        hackTabKey(e as unknown as KeyboardEvent, (evt) => {
                                            const controlledFocus =
                                                new ControlledFocus({
                                                    children: '*',
                                                    root: evt?.currentTarget as HTMLElement,
                                                })

                                            if (evt?.shiftKey) {
                                                controlledFocus.backward();
                                            } else {
                                                controlledFocus.forward()
                                            }
                                        })
                                    }}
                                    style={{
                                        ...props.style,
                                        bottom: props.bottom || `calc(-100vh + ${height - 100}px)`,
                                        y: breakpoint.isMobile ? y : undefined,
                                        scale: breakpoint.isMobile ? undefined : scale,
                                        opacity: breakpoint.isMobile ? undefined : opacity
                                    }}
                                >
                                    {
                                        props.children && props.children(
                                            {
                                                bind: {
                                                    ...(breakpoint.isMobile ? bind() : {})
                                                },
                                                close
                                            }
                                        )
                                    }
                                </a.div>
                            )
                            : null
                    }
                </div>
            ),
            document.body
        )
    )
}
