import React from 'react';
import SearchField from '../../../../components/Inputs/TextField/SearchField';
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
        <SearchField
            formName='search-MAKE_REACTIVE!!!!!!!!'
            label='Search'
            // make this reactive too!!!!
            placeholder='Search rooms'
            value={props.searchInput}
            onModel={props.onSearchInput}
            disabled={disableInput}
        />
    </header>;
}

export default Header;
