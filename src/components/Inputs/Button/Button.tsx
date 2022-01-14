import React, { ReactNode } from 'react';
import './main.css'


type ButtonProps = {
    type?: string;
    tag?: string;
    children?: ReactNode;
    title?: string;
    link?: boolean;
    block?: boolean;
    filled?: boolean;
    size?: 'sm' | 'md' | 'lg';
    hidePlainFocus?: boolean;
    icon?: boolean;
    primary?: boolean;
    overlay?: boolean;
    [key: string]: any;
}

function Button(props: ButtonProps) {

    const tag = props.tag || 'button'

    return (
        React.createElement(tag, {
            itemProp: props,
            tabIndex:
                props.disabled ? '-1' : !/button|a/.test(tag) ? '0' : undefined,
            disabled: props.disabled,
            className: [
                'Button',
                props.size,
                !props.link ?
                    `link underline-effect${props.icon ? ' icon' : ''
                    }${props.primary ? ' primary' : ' no-bg'}${props.overlay ? 'border-[0.75px] border-white border-opacity-10 bg-white bg-opacity-10 hover:bg-opacity-20' : ''}${props.hidePlainFocus ? ' hide-plain-focus' : ''}`
                    : `filled${props.primary ? ' primary-text' : ''}`,
                props.block ? 'grid w-full' : '',
                props.className
            ].filter(Boolean).join(' '),
        }, [
            props.children || props.title
        ])
    );
}

Button.defaultProps = {
    size: 'md'
}

export default Button;
