import React, { useState } from 'react';
import { className } from '../../../../components/utils/main';
import useBreakpoint from '../../../../hooks/breakpoint';
import { classNames } from '../utils';
import Header from './Header';
import Rooms from './Rooms/Index';

function Nav() {
    const [breakpoint] = useBreakpoint();

    const [searchInput, setSearchInput] = useState('');

    return <nav
        className={
            className([
                breakpoint.isMobile ? [] : [
                    classNames.largeSideBars,
                    'border-r chat-divide-color'
                ]
            ])
        }
    >

        <Header
            searchInput={searchInput}
            onSearchInput={setSearchInput}
        />

        <Rooms
            filter={searchInput}
        />

    </nav>;
}

export default Nav;
