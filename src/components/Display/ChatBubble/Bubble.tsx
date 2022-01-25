import React, { useMemo, useState } from 'react';
import { className as classes, ClassName } from '../../utils/main';
import { GetReaction } from '../../utils/types';
import ChatActions from './ChatActions';
import Reaction from './Reaction';

type Props = {
    message: string;
    receiver: boolean;
    sender: boolean;
    subsequent?: boolean;
    className?: ClassName;
    renderImg?: boolean;
}

function Bubble(props: Props) {
    const { message, receiver, subsequent, sender, className, renderImg } = props;

    const getRadius = useMemo(() => {
        const hasNewLine = /\n/.test(message);

        const returnValue = (newLine: string, normal: string) => {
            if (hasNewLine) {
                return newLine
            }

            return normal
        }

        if (message.length < 10) {
            return returnValue('rounded-lg', 'rounded-md')
        }

        if (message.length < 75) {
            return returnValue('rounded-xl', 'rounded-lg')
        }

        if (message.length < 250) {
            return returnValue('rounded-2xl', 'rounded-xl')
        }

        return 'rounded-3xl'
    }, [message])

    const [reaction, setReaction] = useState<GetReaction | null>(null);

    return <div
        className={
            classes([
                'flex h-full',
                {
                    'justify-end justify-self-end': sender,
                    'justify-start justify-self-start': receiver
                },
                renderImg ? {
                    'col-start-2': receiver,
                    'col-start-1': sender
                } : '',
            ])
        }
    >
        {
                <Reaction
                    sender={sender}
                type={reaction?.type || ''}
            />
        }

        <div
            className={
                classes([
                    'Bubble group dark:group-hover:brightness-110 group-hover:brightness-95 transition-transform',
                    receiver ? [
                        'bg-true-gray-100 dark:bg-[#202020] justify-self-start order-1',
                        {
                            'rounded-tl-[1px]': !subsequent,
                            'translate-x-[-30px]': !reaction
                        }
                    ] : [
                        'bg-primary-600 dark:bg-primary-400 text-white dark:text-[#111] justify-self-end order-2',
                        {
                            'rounded-br-[1px]': !subsequent,
                            'rounded-tr-[1px]': subsequent,
                            'translate-x-[30px]': !reaction
                        }
                    ],
                    getRadius,
                    className
                ])
            }
        >
            {
                !subsequent && !sender ?
                    // make anchor tag!!!
                    <span
                        className={
                            classes([
                                'hover:underline hover:opacity-95 group-hover:opacity-80 font-bold text-sm opacity-60 mb-[2px] transition-opacity cursor-pointer',
                                {
                                    'justify-self-start': receiver,
                                    // 'justify-self-end': sender,
                                }
                            ])
                        }
                    >
                        Unique user
                    </span>
                    : null
            }
            {message}
        </div>

        <ChatActions
            sender={sender}
            onSetReaction={setReaction}
            hasReaction={!!reaction}
        />
    </div>
}

export default Bubble;
