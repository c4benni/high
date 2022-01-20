import React from 'react';
import { HashIcon } from '../../../../components/Icon/Generic/Hash';
import { HorizontalDots } from '../../../../components/Icon/Generic/HorizontalDots';
import { InviteIcon } from '../../../../components/Icon/Generic/Invite';
import IconWrapper from '../../../../components/Icon/Logo/IconWrapper';
import Button from '../../../../components/Inputs/Button/Button';

function Heading() {
    return <div
        className='grid grid-flow-col grid-cols-[auto,auto,1fr,auto] items-center pl-3 pr-1'
    >
        <h1 className='whitespace-nowrap grid grid-flow-col gap-x-1 items-center font-semibold text-title text-lg'>
            <IconWrapper>
                <HashIcon />
            </IconWrapper>

            Group name
        </h1>

        <span
            className='mx-3 h-[60%] bg-gray-300 dark:bg-gray-700 opacity-80 w-[1px]'
        />

        <h2
            className='truncate cursor-pointer text-gray-600 dark:text-gray-300 hover:opacity-80 transition-opacity active:opacity-70 justify-self-start max-w-full'
        >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse itaque aspernatur aperiam voluptatum, nihil recusandae cum atque natus. Tempore, hic ipsam. Obcaecati ex at reiciendis quis pariatur aliquam libero aperiam?
        </h2>

        <div
            className='ml-3'
        >
            <Button
                icon
                htmlTitle='Send an invite'
                iconSlot={
                    <InviteIcon />
                }
                className={'mr-2'}
            />

            <Button
                icon
                htmlTitle='More'
                iconSlot={
                    <HorizontalDots />
                }
            />
        </div>
    </div>
}

export default Heading;