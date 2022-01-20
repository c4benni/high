import React, { Fragment } from 'react';
import AppLoader from '../../Display/Loader';
import IconWrapper from '../../Icon/Logo/IconWrapper';
import { ClassName, className } from '../../utils/main';
import { Slot } from '../../utils/types';
import './main.css'


type ButtonProps = {
    children?: Slot;
    append?: Slot;
    prepend?: Slot;
    iconSlot?: Slot;
    disabled?: boolean;
    type?: string;
    tag?: string;
    outlined?: boolean;
    htmlTitle?: string;
    title?: string;
    link?: boolean;
    block?: boolean;
    filled?: boolean;
    size?: 'sm' | 'md' | 'lg';
    hidePlainFocus?: boolean;
    icon?: boolean;
    primary?: boolean;
    overlay?: boolean;
    loading?: boolean;
    [key: string]: any;
    className?: ClassName;
    onClick?: Function;
}

function Button(props: ButtonProps) {

    const tag = props.tag || 'button'

    const events = {} as { [key: string]: any };

    for (const key in props) {
        if (/^on[A-Z]/.test(key)) {
            events[key] = props[key]
        }
    }

    return (
        React.createElement(tag, {
            ...events,
            title: props.htmlTitle,
            tabIndex:
                props.disabled ? '-1' : !/button|a/.test(tag) ? '0' : undefined,
            disabled: props.disabled,
            className: className(
                [
                    'Button',
                    {
                        'link underline-effect': props.link,
                        'filled': !props.link,
                        'grid w-full': props.block,
                        'outlined fill-after': props.outlined,
                        'opacity-60 disabled cursor-not-allowed before:invisible after:invisible grayscale': props.disabled
                    },
                    !props.link
                        ? [
                            'fill-before',
                            props.size,
                            {
                                icon: props.icon,
                                primary: props.primary && !props.outlined,
                                'primary-text': props.outlined,
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
            <Fragment
                key={'children-frag'}
            >
                {
                    props.icon && props.iconSlot ?
                        <IconWrapper>
                            {props.iconSlot}
                        </IconWrapper>
                        :
                    (props.children || [
                        <Fragment
                            key={'inner-frag'}
                        >
                            {props.prepend}
                            {props.title}
                            {props.append}
                        </Fragment>
                    ])
                }
                {

                    props.loading ? (
                        <AppLoader
                            key={'loader'}
                            className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
                        />
                    ) : null
                }
            </Fragment>
        ])
    );
}

Button.defaultProps = {
    size: 'md',
}

export default Button;
