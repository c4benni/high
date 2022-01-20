import React, { } from 'react';
import { ArrowRight } from '../../../../../components/Icon/Generic/ArrowRight';
import { PlusIcon } from '../../../../../components/Icon/Generic/Plus';
import IconWrapper from '../../../../../components/Icon/Logo/IconWrapper';
import Button from '../../../../../components/Inputs/Button/Button';

function Empty() {
    return <div
        className='grid justify-items-center pt-8 pb-6 px-3'
    >
        <p
            className='text-caption mb-6'
        >
            You don't belong to any room
        </p>

        <Button
            primary
            className={'h-[42px] mb-4'}
        >
            <IconWrapper>
                <PlusIcon />
            </IconWrapper>

            Create a room
        </Button>

        <Button
            title='Explore rooms'
            link
            primary
            append={
                <IconWrapper>
                    <ArrowRight />
                </IconWrapper>
            }
            className='link-arrow arrow-right justify-self-center'
        />
    </div>;
}

export default Empty;
