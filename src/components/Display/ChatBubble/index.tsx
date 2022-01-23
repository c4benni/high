import React, { useMemo } from 'react';
import useBreakpoint from '../../../hooks/breakpoint';
import { useChatAside } from '../../../hooks/utils';
import { ClassName, className as classes } from '../../utils/main';
import { BadgeType } from '../Badge';
import Bubble from './Bubble';
import ChatImg from './ChatImg';

import './main.css'

export type ChatBubbleType = BadgeType | 'default';
export type ChatBubbleRole = 'sender' | 'receiver';

type Props = {
    type?: ChatBubbleType;
    role: ChatBubbleRole;
    className?: ClassName;
    message: string;
    subsequent?: boolean;
    isFirstMessage?: boolean;
    hideImage?: boolean;
}

function ChatBubble(props: Props) {
    const { type = 'default', role, className, message, subsequent, isFirstMessage, hideImage } = props;

    const [breakpoint] = useBreakpoint();

    const [showAside] = useChatAside();

    const largeViewPort = useMemo(() => {
        if (!/^lg$|^xl$/.test(breakpoint.is || '')) {
            return false
        }

        if (breakpoint.is === 'xl') {
            return true
        }

        if (!showAside.visible) { return true }

    }, [breakpoint, showAside])

    const receiver = role === 'receiver';
    const sender = role === 'sender'

    const renderImg = !hideImage && largeViewPort && !sender

    const writeUpWithImgCols = renderImg ? [
        {
            'col-start-2': receiver,
            'col-start-1': sender
        }
    ] : '';

    return <div
        className={
            classes([
                'ChatBubble group',
                {
                    'mt-[2px]': subsequent,
                    'mt-3 md:mt-4': !subsequent && !isFirstMessage,
                    sender,
                    receiver,
                    'grid-rows-[auto,1fr]': !subsequent,
                    'gap-x-1': renderImg
                },
                receiver ? [
                    {
                        'grid-cols-[32px,1fr]': renderImg,
                    }
                ] : [
                    {
                        'grid-cols-[1fr,32px]': renderImg,
                    }
                ],
            ])
        }
    >

        {
            !subsequent ?
                <>
                    {
                        renderImg ?
                            <ChatImg
                                sender={sender}
                            />
                            : null
                    }

                    <span
                        className={
                            classes([
                                'text-caption text-[0.8rem] self-end',
                                {
                                    'justify-self-start ml-1': receiver,
                                    'justify-self-end mr-1': sender,
                                },
                                writeUpWithImgCols
                            ])
                        }
                    >
                        17:33
                    </span>
                </>
                : null
        }

        <Bubble
            message={message}
            receiver={receiver}
            sender={sender}
            className={className}
            subsequent={subsequent}
            renderImg={renderImg}
        />
    </div>;
}

export default ChatBubble;
