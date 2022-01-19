import React from 'react';
import { className } from '../../../../components/utils/main';

function Header() {
    return <header
        className={
            className([
                'h-[48px] bg-inherit border-b chat-divide-color',
            ])
        }
    >

    </header>;
}

export default Header;
