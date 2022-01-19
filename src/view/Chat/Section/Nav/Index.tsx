import React from 'react';
import { className } from '../../../../components/utils/main';
import useBreakpoint from '../../../../hooks/breakpoint';
import { classNames } from '../utils';
import Header from './Header';
import Rooms from './Rooms/Index';

function Nav() {
    const [breakpoint] = useBreakpoint();

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

        <Header />

        <Rooms />

    </nav>;
}

export default Nav;
