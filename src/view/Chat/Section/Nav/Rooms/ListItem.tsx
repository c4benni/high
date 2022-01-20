import React from 'react';
import Img from '../../../../../components/Display/Img';
import { HashIcon } from '../../../../../components/Icon/Generic/Hash';
import IconWrapper from '../../../../../components/Icon/Logo/IconWrapper';
import Button from '../../../../../components/Inputs/Button/Button';
import { className } from '../../../../../components/utils/main';
import { ImgProps } from '../../../../../components/utils/types';

type Props = {
    img: ImgProps;
    title: string;
    subtitle: string;
    tag?: string;
    active: boolean;
    onClick?: Function;
    densed?: boolean;
}

const dashedBordeColor = 'border-secondary-500 dark:border-secondary-700'

function ListItem(props: Props) {

    return <Button
        tag={props.tag}
        block
        className={[
            'bg-gray-200 dark:bg-[#303030] content-center overflow-visible group',
            props.densed ? [
                'py-3 px-4 justify-start'
            ] : [
                'px-4 py-2 md:px-2 gap-x-3 md:gap-x-2 h-[64px] md:h-[56px] grid-cols-[48px,1fr] md:grid-cols-[42px,1fr] grid-rows-2',
                {
                    'border border-dashed': props.active,
                    [dashedBordeColor]: props.active,
                }
            ],

        ]}
        onClick={
            (e: Event) => {
                props.onClick && props.onClick(e)
            }
        }
    >
        {
            props.active ?
                <div
                    className={
                        className([
                            `rounded-tr-sm absolute bg-inherit -z-10 rotate-45 fade-appear`,
                            !props.densed ? [
                                `border-t border-r border-dashed ${dashedBordeColor} w-[12px] h-[12px] right-[-6px]`
                            ] : [
                                'w-[8px] h-[8px] right-[-4px]'
                            ]
                        ])
                    }
                />
                : null
        }
        {
            !props.densed ?
                <Img
                    {...props.img}
                    className='row-start-1 row-end-3 col-start-1 col-end-2 self-center rounded-lg h-full'
                />
                : <IconWrapper
                    className='opacity-60'
                >
                    <HashIcon />
                </IconWrapper>
        }

        <p
            className={
                className([
                    'col-start-2 text-body truncate max-w-full',
                    {
                        'self-end': !props.densed,
                    }
                ])
            }
        >
            {props.title}
        </p>

        {
            !props.densed ?
                <p
                    className='row-start-2 col-start-2 text-caption font-normal truncate self-start'
                >
                    {props.subtitle}
                </p>
                : null
        }
    </Button>;
}

export default ListItem;
