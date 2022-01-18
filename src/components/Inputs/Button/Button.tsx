import React, { ReactNode } from 'react';
import { className } from '../../utils/main';
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

    const events = {} as { [key: string]: any };

    for (const key in props) {
        if (/on[A-Z]/.test(key)) {
            events[key] = props[key]
        }
    }

    return (
        React.createElement(tag, {
            ...events,
            tabIndex:
                props.disabled ? '-1' : !/button|a/.test(tag) ? '0' : undefined,
            disabled: props.disabled,
            // className: [
            //     'Button fill-before',
            //     props.size,
            //     props.link ? `link underline-effect${props.primary ? ' primary-text' : ''}` : '',
            //     props.primary && !props.link ? 'primary' : '',
            //     props.overlay ? 'border-[0.75px] border-white border-opacity-10 bg-white bg-opacity-10 hover:bg-opacity-20' : '',
            //     props.hidePlainFocus ? 'hide-plain-focus' : '',
            //     !props.link && (props.primary || props.secondary) ? 'filled' : 'no-bg',
            //     props.block ? 'grid w-full' : '',
            //     props.className
            // ].filter(Boolean).join(' '),
            className: className(
                [
                    'Button',
                    {
                        'link underline-effect': props.link,
                        'filled': !props.link,
                        'grid w-full': props.block
                    },
                    !props.link
                        ? [
                            'fill-before',
                            props.size,
                            {
                                icon: props.icon,

                                primary: props.primary,
                                'no-bg': !props.primary,
                                'hide-plain-focus': props.hidePlainFocus,

                                'border-[0.75px] border-white border-opacity-10 bg-white bg-opacity-10 hover:bg-opacity-20':
                                    props.overlay
                            }]
                        : {
                            'primary-text': props.primary
                        },
                    props.className || ''
                ]
            )
        }, [
            props.children || props.title
        ])
    );
}

Button.defaultProps = {
    size: 'md'
}

export default Button;
