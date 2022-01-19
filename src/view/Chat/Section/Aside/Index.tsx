import React from 'react';
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
                    'border-l chat-divide-color'
                ]
            ])
        }
    >

    </aside>;
}

export default Aside;
