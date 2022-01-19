import React from 'react';
import Form from '../../../../components/Form/Form';
import { SearchIcon } from '../../../../components/Icon/Generic/Search';
import IconWrapper from '../../../../components/Icon/Logo/IconWrapper';
import TextField from '../../../../components/Inputs/TextField/TextField';
import { className } from '../../../../components/utils/main';

function Header() {
    const disableInput = true;

    return <header
        className={
            className([
                'h-[56px] md:h-[48px] bg-inherit border-b chat-divide-color px-3 grid items-center',
            ])
        }
    >
        <Form
            name='search-MAKE_REACTIVE!!!!!!!!'
        >
            <TextField
                label='Search'
                placeholder='Search'
                hideLabel
                disabled={disableInput}
                className='text-sm'
                wrapperClassName={[
                    'h-[40px] md:h-[28px]'
                ]}
                inputClassName={'pr-[28px] border-none bg-gray-200 dark:bg-gray-900'}
                append={
                    <IconWrapper
                        className={
                            className([
                                'absolute w-[24px] pointer-events-none right-0',
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
