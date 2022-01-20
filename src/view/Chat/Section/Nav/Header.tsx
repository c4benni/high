import React from 'react';
import Form from '../../../../components/Form/Form';
import { SearchIcon } from '../../../../components/Icon/Generic/Search';
import IconWrapper from '../../../../components/Icon/Logo/IconWrapper';
import TextField from '../../../../components/Inputs/TextField/TextField';
import { className } from '../../../../components/utils/main';

type Props = {
    searchInput: string;
    onSearchInput: Function
}

function Header(props: Props) {
    const disableInput = false;

    return <header
        className={
            className([
                'h-[56px] md:h-[48px] bg-inherit border-b chat-divide-color px-3 grid items-center',
            ])
        }
    >
        <Form
            name='search-MAKE_REACTIVE!!!!!!!!'
            className='mx-auto w-full'
        >
            <TextField
                label='Search'
                // make this reactive too!!!!
                placeholder='Search rooms'
                value={props.searchInput}
                onModel={props.onSearchInput}
                hideLabel
                disabled={disableInput}
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
                                {
                                    'opacity-70': !disableInput
                                }
                            ])
                        }
                    >
                        <SearchIcon />
                    </IconWrapper>
                }
            />
        </Form>
    </header>;
}

export default Header;
