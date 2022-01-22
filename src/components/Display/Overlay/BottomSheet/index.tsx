import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import './main.css';
import { className } from '../../../utils/main'
import { useSpring, a, config } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'
import { nextTick } from '../../../../utils/main';
import useBreakpoint from '../../../../hooks/breakpoint';
import BottomSheetBackdrop from './Backdrop';
import { removeOverlayZIndex, restoreFocus, setOverlayZindex, toggleHTMLScroll, trapFocus } from '../utils';

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

    const rootRef = useRef(null);

    // zIndex is set on enter
    const [zIndex, setZIndex] = useState<string>();

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

                removeOverlayZIndex(rootRef, () => {
                    !props.open && setZIndex("");

                    requestAnimationFrame(() => {
                        props.onAfterLeave && props.onAfterLeave()
                    })
                })
            },
        })
    }, [breakpoint, height, props, api])


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
        await nextTick()

        if (!entered) {
            setOverlayZindex({
                rootRef,
                setZIndex,
                role: 'bottom-sheet',
                close
            })
        }

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
        transitionState, api, props, entered, breakpoint, close
    ])

    useEffect(() => {
        const { open } = props;
        if (open && transitionState !== 'afterenter') {
            transitionState !== 'enter' && openSheet({
                canceled: false
            });

            $previousActive(document.activeElement as HTMLElement);

            toggleHTMLScroll('add')
        } else if (!open && transitionState !== 'afterleave') {
            close()
            restoreFocus(previousActive, rootRef)
            $previousActive(null);
            toggleHTMLScroll('remove')
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
                    ref={rootRef}
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
                    style={{
                        zIndex,
                    }}
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
                                        trapFocus(e, close, rootRef)
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
            document.getElementById('ui-overlay') || document.body
        )
    )
}
