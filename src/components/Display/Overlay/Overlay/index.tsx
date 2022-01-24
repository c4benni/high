import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group';
import './main.css'

import { nextTick } from '../../../../utils/main';
import Backdrop from './Backdrop';
import { awayListener, OverlayRootEl, removeOverlayZIndex, restoreFocus, setOverlayZindex, toggleHTMLScroll, trapFocus } from '../utils';

import springScale from '../../../transitions/spring/scale.module.css';
import { ClassName, className as classes } from '../../../utils/main';

// renders nothing unless active;
// on close, `render` will delay to turn false till
// animationend event has fired;
// on open, render will be true on nextTick;

export type TransitionDuration = number | {
    enter: number;
    leave: number;
}

type Props = {
    open: boolean;
    onToggle: (open: boolean) => void;
    children: ReactNode;
    duration?: TransitionDuration;
    className?: ClassName;
    style?: object;
    overlayAttrs?: object;
    backdropOpacity?: number;
    renderBackdrop?: boolean;
    lockBodyScroll?: boolean;
    onEnter?: (el: HTMLElement | null) => void;
    onEntered?: (el: HTMLElement | null) => void;
    onExit?: (el: HTMLElement | null) => void;
    onExited?: (el: HTMLElement | null) => void;
    role?: React.AriaRole | undefined;
    awayListeners?: string[];
    backdropBackground?: string;
    transformOrigin?: string
}

function Overlay(props: Props) {

    const {
        open, onToggle, duration, backdropOpacity, style, role,
        awayListeners = ['click'], backdropBackground, transformOrigin,
        className, children, overlayAttrs, renderBackdrop, lockBodyScroll
    } = props;

    const [mounted, setMounted] = useState(false);

    const close = useCallback(() => onToggle(false), [onToggle])

    const $duration = useMemo(() => {
        if (typeof duration == 'number') {
            return duration
        }

        const defaultDuration = {
            enter: 483,
            leave: 250,
        }

        if (typeof duration == 'object') {
            Object.assign(defaultDuration, duration)
        }

        return Math.max(defaultDuration[open ? 'enter' : 'leave'], 1)
    }, [duration, open])

    const getDuration = useMemo(() => $duration - 16, [$duration]);

    const rootRef = useRef(null);

    const transitionRef = useRef<HTMLDivElement | null>(null);

    const [previousActive, setPreviousActive] =
        useState<HTMLElement | null>(null)

    // zIndex is set on enter
    const [zIndex, setZIndex] = useState<string>();

    const [render, setRender] = useState(false);

    // open mounts the portal;
    // render controls the transition
    const canRender = useMemo(() => open || render, [open, render]);

    const isTooltip = role === 'tooltip'

    const saveCloseCall = useCallback(() => {
        if (rootRef.current) {
            const root: OverlayRootEl = rootRef.current;

            if (root) {
                root._close = close
            }
        }
    }, [close])

    const toggleRender = useCallback(() => {
        nextTick(() => {
            if (mounted) {
                saveCloseCall()
                setRender(true);
            }
        })
    }, [mounted, saveCloseCall])

    useEffect(() => {
        setMounted(true)
        if (open) {
            toggleRender()
        }

        return () =>
            setMounted(false);
    }, [toggleRender, open])

    if (!canRender) {
        return null
    }

    const rootClose = !renderBackdrop ? {
        onClick: close
    } : {}

    return ReactDOM.createPortal(
        <div
            ref={rootRef}
            className={
                classes([
                    'Overlay',
                    {
                        'pointer-events-none': isTooltip
                    }
                ])
            }
            style={{
                zIndex
            }}
            {...rootClose}
        >

            {
                renderBackdrop ?
                    <Backdrop
                        open={render && open}
                        duration={getDuration}
                        onToggle={onToggle}
                        opacity={backdropOpacity}
                        background={backdropBackground}
                    />
                    : null
            }
            <CSSTransition
                nodeRef={transitionRef}
                in={render && open}
                timeout={getDuration}
                classNames={springScale}
                unmountOnExit
                onEnter={async () => {

                    mounted && setOverlayZindex({
                        rootRef,
                        setZIndex,
                        role: role || 'ui',
                        close,
                        closeAllSame: isTooltip
                    })

                    !isTooltip &&
                        setPreviousActive(
                            document.activeElement as HTMLElement
                        );

                    lockBodyScroll && toggleHTMLScroll('add')

                    awayListeners &&
                        awayListener(close, awayListeners, 'add', rootRef);

                    (!isTooltip &&
                        transitionRef.current) && transitionRef.current.focus();

                    (props.onEnter) && props.onEnter(transitionRef.current)
                }}
                onEntered={() => {
                    (props.onEntered) && props.onEntered(transitionRef.current)

                    mounted && saveCloseCall()
                }}
                onExit={() => {
                    !isTooltip &&
                        restoreFocus(previousActive, rootRef);

                    (props.onExit) && props.onExit(transitionRef.current)
                }}
                onExited={async () => {
                    removeOverlayZIndex(
                        rootRef,
                        () => {
                            setRender(false);

                            !canRender && setZIndex("");

                            toggleHTMLScroll('remove');

                            (props.onExited) && props.onExited(transitionRef.current)

                            awayListener(close, awayListeners, 'remove', rootRef);
                        }
                    )
                }}
            >
                <div
                    ref={transitionRef}
                    role={role}
                    tabIndex={isTooltip ? -1 : 0}
                    className={
                        classes([
                            'OverlayContent',
                            className
                        ])
                    }
                    style={{
                        ...(style || {}),
                        // @ts-ignore
                        '--scale-enter-origin': transformOrigin
                    }}
                    onKeyDown={(e) => {
                        !isTooltip &&
                            trapFocus(e, close, rootRef)
                    }}
                    {...(overlayAttrs || {})}
                >
                    {children}
                </div>
            </CSSTransition>
        </div>,
        document.getElementById('ui-overlay') || document.body
    )
}

Overlay.defaultProps = {
    renderBackdrop: true,
    lockBodyScroll: true,
    role: 'dialog'
}

export default Overlay;
