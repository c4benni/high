import React from 'react';
import ContactCard from '../../../../../components/Display/Card/Contact';
import FlatList from '../../../../../components/Display/Flatlist';
import Img from '../../../../../components/Display/Img';
import SearchField from '../../../../../components/Inputs/TextField/SearchField';

function Room() {
    return <>
        <h2
            className='text-caption my-3 uppercase text-center'
        >
            Room info
        </h2>

        <div
            className='h-[200px] mx-4 rounded-xl overflow-hidden isolate border border-gray-400 dark:border-gray-500'
        >
            <Img
                alt=''
                publicId='highChat/avatar/room/uploading-4_ayt8n8.png'
                className='object-cover h-full'
            />
        </div>

        <p className='text-caption mt-3 px-3 text-center'>
            Group created on 11/04/2022
        </p>

        <div
            className='border-t mt-3 default-border-color'
        >
            <p className='flex justify-between items-center text-caption px-3 mt-2'>
                <span className='uppercase font-bold'>
                    Members
                </span>

                1000
            </p>
        </div>

        <header
            className='p-3 pt-4 bg-inherit sticky -top-1 border-b default-border-color z-1'
        >
            <SearchField
                formName='search-MAKE_REACTIVE!!!!!!'
                label='Search'
                // make this reactive too!!!!
                placeholder='Search group'
            />
        </header>

        <FlatList
            className={'mt-3'}
            scrollingElement='#aside-scroll'
            itemSize={62}
            bench={5}
            // gap={10}
            data={Array.from({
                length: 100000
            }, (_, i) => ({
                img: {
                    publicId: 'samples/people/boy-snow-hoodie.jpg',
                    alt: ''
                },
                name: i === 0 ? 'Some Admin' : 'Random User',
                status: i % 5 !== 0 ? undefined : 'Available',
                badge: i === 0 ? {
                    title: 'Admin',
                    type: 'success'
                } : undefined,
                className: 'px-3'
            }))}
            render={
                ({
                    data, key, style
                }) => {
                    return <ContactCard
                        key={key}
                        img={data.img}
                        name={data.name}
                        status={data.status}
                        badge={data.badge}
                        className={data.className}
                        style={style}
                        tag='li'
                    />
                }
            }
        />
    </>
}

export default Room;
