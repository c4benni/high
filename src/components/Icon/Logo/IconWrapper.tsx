import React, { ReactNode } from 'react'

type IconWrapperProps = {
    children?: ReactNode;
    className?: string;
    [key: string]: any;
}

function IconWrapper(props: IconWrapperProps) {
    return (
        <span
            className={[
                'IconWrapper',
                props.className || ''
            ].filter(Boolean).join(' ')}
        >
            {props.children}
        </span>
    )
}

export default IconWrapper
