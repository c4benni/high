import React, { useMemo, useState } from 'react';
import { ArrowRight } from '../../../../../components/Icon/Generic/ArrowRight';
import { PlusIcon } from '../../../../../components/Icon/Generic/Plus';
import IconWrapper from '../../../../../components/Icon/Logo/IconWrapper';
import Button from '../../../../../components/Inputs/Button/Button';
import { className } from '../../../../../components/utils/main';
import ListItem from './ListItem';
import ListSection from './ListSection';

type Props = {
    filter: string;
}

const listItems = [
    'My favorite room',
    'Public room',
    'Master room',
    'Ng Room'
]

function List(props: Props) {
    const [currentActive, setCurrentActive] = useState('');

    const { filter } = props;

    const filteredList = useMemo(() => listItems.filter(x => {
        const searchRegExp = new RegExp(filter, 'i');

        return searchRegExp.test(x)
    }), [filter])

    return <div
        className={
            className([
                'py-6 px-3 grid',
                {
                    'gap-y-8': !props.filter,
                    'gap-y-4': props.filter
                }
            ])
        }
    >
        {
            props.filter ?

                (
                    filteredList.length ?
                        filteredList.map((x, i) => {
                            return <ListItem
                                key={i}
                                img={{
                                    alt: 'something',
                                    publicId: 'highChat/avatar/room/uploading-4_ayt8n8.png'
                                }}
                                subtitle='Fashion'
                                title={x}
                                tag='li'
                                active={currentActive === x}
                                onClick={() =>
                                    setCurrentActive(x)
                                }
                            />
                        })
                        :
                        <div>
                            <p className='text-center text-body'>
                                No room to match your search
                            </p>

                            <div className='grid gap-y-6 md:gap-y-4 justify-center mt-6'>
                                <Button
                                    primary
                                    size='sm'
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
                            </div>

                        </div>
                ) :

                ['Favorites', 'My Rooms', `Rooms I'm in`].map((x, i) => {
                    return <ListSection
                        key={x}
                        densed={i === 0}
                        expanded={i === 0}
                        actionIcon={
                            <PlusIcon />
                        }
                        actionText={
                            i === 1 ? 'Create a room' : undefined
                        }
                        hasActive={currentActive === x}
                        title={x}
                        itemClick={() => {
                        }}
                    />
                })
        }
    </div>;
}

export default List;
