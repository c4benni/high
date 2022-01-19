import React from 'react';
import { className } from '../../../../components/utils/main';
import useBreakpoint from '../../../../hooks/breakpoint';

function Header() {
    const [breakpoint] = useBreakpoint();

    return <header
        className={
            className([
                breakpoint.isMobile ? [] : [
                    'h-[48px] fixed top-0 w-[calc(100%-316px)] right-0 bg-inherit border-b chat-divide-color'
                ]
            ])
        }
    >

    </header>;
}

export default Header;
