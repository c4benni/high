import React, { ReactNode } from 'react'
import { ClassName, className } from '../utils/main'

import './main.css'

type DividerProps = {
    children?: ReactNode;
    text?: string;
    className?: ClassName;
    [key: string]: any;
}

function Divider(props: DividerProps) {

    return (
        <div
            className={className(['Divider', props.className || ''])}
        >
            {props.text || props.children}
        </div>
    )
}

export default Divider
