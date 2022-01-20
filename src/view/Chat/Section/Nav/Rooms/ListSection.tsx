import React, { useState } from 'react';
import Accordion from '../../../../../components/Display/Accordion';
import IconWrapper from '../../../../../components/Icon/Logo/IconWrapper';
import Button from '../../../../../components/Inputs/Button/Button';
import { Slot } from '../../../../../components/utils/types';
import ListItem from './ListItem';

type Props = {
    actionText?: string;
    actionIcon?: Slot;
    expanded: boolean;
    title: string;
    // replace this with router link match;
    hasActive: boolean;
    // remove this when router is ready;
    itemClick: Function;
    densed?: boolean
}

function ListSection(props: Props) {
    const [expand, setExpand] = useState(props.expanded);

    return <Accordion
        open={expand}
        onToggle={setExpand}
        summaryText={props.title}
        summaryAppend={
            !expand && props.hasActive ?
                <div
                    className='bg-secondary-500 dark:bg-secondary-700 w-[8px] h-[8px] rounded-full fade-appear relative'
                ></div>
                : null
        }
    >
        <ul
            className='px-3 md:pr-0'
        >
            <ListItem
                img={{
                    alt: 'something',
                    publicId: 'highChat/avatar/room/uploading-4_ayt8n8.png'
                }}
                densed={props.densed}
                subtitle='Fashion'
                title='My unique room'
                tag='li'
                active={props.hasActive}
                onClick={props.itemClick}
            />
        </ul>

        {
            props.actionText ? <div
                className='px-3 mt-4 mx-auto grid justify-center'
            >
                <Button
                    primary
                    outlined
                    size='sm'
                >
                    <IconWrapper>
                        {props.actionIcon}
                    </IconWrapper>

                    {props.actionText}
                </Button>
            </div> : null
        }
    </Accordion>
}


export default ListSection;
