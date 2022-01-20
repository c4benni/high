import React from 'react';
import Img from '../../../../components/Display/Img';
import Form from '../../../../components/Form/Form';
import { SearchIcon } from '../../../../components/Icon/Generic/Search';
import IconWrapper from '../../../../components/Icon/Logo/IconWrapper';
import TextField from '../../../../components/Inputs/TextField/TextField';
import { className } from '../../../../components/utils/main';
import useBreakpoint from '../../../../hooks/breakpoint';
import { classNames } from '../utils';

function Aside() {
    const [breakpoint] = useBreakpoint();

    return <aside
        className={
            className([
                breakpoint.isMobile ? [] : [
                    classNames.largeSideBars,
                    'border-l chat-divide-color mt-[48px] overflow-y-auto max-h-[calc(100vh-48px)] show-scrollbar-on-hover'
                ]
            ])
        }
    >
        <h2
            className='text-caption my-1 text-center'
        >
            Group info
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
            className='border-t mt-3 divide-border-default-color'
        >
            <p className='flex justify-between items-center text-caption px-3 mt-2'>
                <span className='uppercase font-bold'>
                    Members
                </span>

                1000
            </p>
        </div>

        <header
            className='p-3 pt-4 bg-inherit sticky -top-1 border-b divide-border-default-color'
        >
            {/* MAKE NAME REACTIVE */}
            <Form
                name='search-MAKE_REACTIVE!!!!!!'
                className='mx-auto w-full'
            >
                <TextField
                    label='Search'
                    // make this reactive too!!!!
                    placeholder='Search group'
                    hideLabel
                    className='text-sm'
                    wrapperClassName={[
                        'h-[40px] md:h-[28px]'
                    ]}
                    inputClassName={'pl-[32px] md:pl-[24px] border-none bg-gray-200 dark:bg-gray-900'}
                    append={
                        <IconWrapper
                            className={
                                className([
                                    'absolute w-[32px] md:w-[24px] justify-center flex pointer-events-none left-0',
                                ])
                            }
                        >
                            <SearchIcon />
                        </IconWrapper>
                    }
                />
            </Form>
        </header>

        <div className='h-[200vh] mt-4'>

        </div>
    </aside>;
}

export default Aside;
