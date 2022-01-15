import React, { ReactNode } from 'react'

import './main.css'

type DividerProps = {
    children?: ReactNode;
    text?: string;
    [key: string]: any;
}

function Divider(props: DividerProps) {

    return (
        <div
            className={['Divider', props.className || ''].filter(Boolean).join(' ')}
        >
            {props.text || props.children}
        </div>
    )
}

export default Divider
