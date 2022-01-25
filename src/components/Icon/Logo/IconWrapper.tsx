import React, { ReactNode } from 'react'
import { ClassName, className } from '../../utils/main'

type IconWrapperProps = {
    children?: ReactNode;
    className?: ClassName;
    [key: string]: any;
}

function IconWrapper(props: IconWrapperProps) {
    return (
        <span
            className={className([
                'IconWrapper',
                props.className || ''
            ])}
        >
            {props.children}
        </span>
    )
}

export default IconWrapper
