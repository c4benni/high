import React from 'react';

import { ClassName, className } from '../../../../components/utils/main';
import useBreakpoint from '../../../../hooks/breakpoint';
import { classNames } from '../utils';
import Room from './Room/Index';

type Props = {
    className?: ClassName
}

function Aside(props: Props) {
    const [breakpoint] = useBreakpoint();

    return <aside
        id='aside-scroll'
        className={
            className([
                breakpoint.isMobile ? [] : [
                    classNames.largeSideBars,
                    'border-l chat-border-color mt-[48px] overflow-y-auto max-h-[calc(100vh-48px)] show-scrollbar-on-hover relative isolate'
                ],
                props.className
            ])
        }
    >   
        <Room />        
    </aside>;
}

export default Aside;
