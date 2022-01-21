import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group';
import './main.css'

import { nextTick } from '../../../../utils/main';
import Backdrop from './Backdrop';
import { removeOverlayZIndex, restoreFocus, setOverlayZindex, toggleHTMLScroll, trapFocus } from '../utils';

import springScale from '../../../transitions/spring/scale.module.css';
import { ClassName, className as classes } from '../../../utils/main';

// renders nothing unless active;
// on close, `render` will delay to turn false till
// animationend event has fired;
// on open, render will be true on nextTick;

type Props = {
    open: boolean;
    onToggle: (open: boolean) => void;
    children: ReactNode;
    duration?: number | {
        enter: number;
        leave: number;
    };
    className?: ClassName;
}

function Dialog(props: Props) {

    const { open, onToggle, duration, className, children } = props;

    const close = () => onToggle(false)

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

        return defaultDuration[open ? 'enter' : 'leave']
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

    useEffect(() => {
        if (open) {
            nextTick(() => {
                setRender(true);
            })
        }
    }, [setRender, open])

    if (!canRender) {
        return null
    }

    return ReactDOM.createPortal(
        <div
            ref={rootRef}
            className='Dialog'
            style={{
                zIndex
            }}
        >

            <Backdrop
                open={render && open}
                duration={getDuration}
                onToggle={onToggle}
            />
            <CSSTransition
                nodeRef={transitionRef}
                in={render && open}
                timeout={getDuration}
                classNames={springScale}
                unmountOnExit
                onEnter={async () => {
                    setOverlayZindex(rootRef, setZIndex)
                    setPreviousActive(document.activeElement as HTMLElement);
                    toggleHTMLScroll('add')

                    transitionRef.current && transitionRef.current.focus()
                }}
                onExit={() => {
                    restoreFocus(previousActive, rootRef)
                }}
                onExited={async () => {
                    removeOverlayZIndex(
                        rootRef,
                        () => {
                            setRender(false);

                            !canRender && setZIndex("");

                            toggleHTMLScroll('remove');
                        }
                    )
                }}
            >
                <div
                    ref={transitionRef}
                    tabIndex={0}
                    className={
                        classes([
                            'DialogContent',
                            className
                        ])
                    }
                    onKeyDown={(e) => {
                        trapFocus(e, close, rootRef)
                    }}
                >
                    {children}
                </div>
            </CSSTransition>
        </div>,
        document.getElementById('ui-overlay') || document.body
    )
}

export default Dialog;
