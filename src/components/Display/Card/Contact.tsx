import React, { Fragment } from 'react';
import { className, ClassName } from '../../utils/main';
import { ImgProps } from '../../utils/types';
import Badge, { BadgeType } from '../Badge';
import Img from '../Img';

import './main.css'

type Props = {
    img: ImgProps;
    name: string;
    status?: string;
    className?: ClassName;
    style?: {
        [key: string]: string
    };
    badge?: {
        title: string;
        type: BadgeType
    }
    tag?: string;
    onClick?: Function;
    disabled?: boolean;
}

function ContactCard(props: Props) {
    return React.createElement(props.tag || 'div', {
        className: className([
            'ContactCard',
            {
                'grid-rows-2 items-center': props.status,
                'items-start': !props.status,
                'grid-cols-[auto,1fr,auto]': props.badge,
                'grid-cols-[auto,1fr]': !props.badge,
                'cursor-pointer fill-before before-interact before:text-primary-700 dark:before:text-primary-600': !props.disabled,
                'cursor-not-allowed': props.disabled
            },
            props.className
        ]),
        style: props.style,
        tabIndex: props.disabled ? '-1' : '0',
        onClick: props.onClick,
    }, [
        <Fragment
            key={'children-frag'}
        >
            <Img
                {...props.img}
                loading='eager'
                className={[
                    'w-[42px] h-[42px] rounded-full',
                    {
                        'row-start-2 mt-[-50%]': props.status
                    }
                ]}
            />

            <p
                className={
                    className([
                        'truncate max-w-full text-[0.9rem]',
                        {
                            'row-start-1 leading-none': props.status
                        }
                    ])
                }
            >
                {props.name}
            </p>

            {
                props.status ? <p
                    className={
                        className([
                            'row-start-2 self-start text-caption text-[0.85rem] truncate max-w-full'
                        ])
                    }
                >
                    {props.status}
                </p> : null
            }

            {props.badge ? <Badge
                type={props.badge.type}
                text={props.badge.title}
                className={'mt-1'}
            /> : null}
        </Fragment>
    ])
}

ContactCard.defaultProps = {
    tag: 'div'
}

export default ContactCard;
