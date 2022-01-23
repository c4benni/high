import React from 'react';
import { ClassName, className as classes } from '../../utils/main';
import { Slot } from '../../utils/types';

type Props = {
    children: Slot;
    className?: ClassName
}

function ChatBubbleWrapper(props: Props) {
    return <div
        className={
            classes([
                'h-screen grid content-start p-3',
                props.className
            ])
        }
    >
        {props.children}
    </div>;
}

export default ChatBubbleWrapper;
