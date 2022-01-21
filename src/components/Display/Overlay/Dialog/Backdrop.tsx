import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ClassName, className } from '../../../utils/main';
import fade from '../../../transitions/fade.module.css';

type Props = {
    open: boolean;
    onToggle: (arg: boolean) => void;
    duration: number;
    background?: ClassName;
}

function Backdrop(props: Props) {
    const {
        open, onToggle,
        background = 'bg-black bg-opacity-50',
        duration
    } = props;

    const rootRef = useRef(null)

    return <CSSTransition
        in={open}
        classNames={fade}
        unmountOnExit
        timeout={duration}
        nodeRef={rootRef}
    >
        <div
            ref={rootRef}
            className={
                className([
                    'h-full w-full absolute left-0 top-0',
                    background
                ])
            }
            onClick={() => {
                onToggle(!open)
            }}
            style={{
                // @ts-ignore
                '--fade-duration': `${duration + 16}ms`,
            }}
        />
    </CSSTransition>
}

export default Backdrop;
