import React, { useMemo } from 'react';
import useBreakpoint from '../../../hooks/breakpoint';
import { HorizontalDots } from '../../Icon/Generic/HorizontalDots';
import { ReactionIcon } from '../../Icon/Generic/Reaction';
import Button from '../../Inputs/Button/Button';
import { className } from '../../utils/main';
import { ReactionType } from '../../utils/types';
import Tooltip from '../Overlay/Tooltip';

type Props = {
    sender: boolean;
    onSetReaction: (reaction: ReactionType) => void;
    hasReaction: boolean;
}

function ChatActions(props: Props) {
    const { sender, onSetReaction, hasReaction } = props;

    const [breakpoint] = useBreakpoint();

    const xxs = breakpoint.is === 'xxs'

    const actions = useMemo(() => {
        return [{
            title: 'Reaction',
            icon: <ReactionIcon />,
            onClick: () => onSetReaction('exclaim')
        },
        {
            title: 'More',
            icon: <HorizontalDots />
        }]
    }, [onSetReaction])

    return <div
        className={
            className([
                'flex w-fit items-end mb-1 ChatAction opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-transform transform-gpu',
                {
                    'mr-2 order-1': sender,
                    'ml-2 order-2': !sender,
                    'flex-col-reverse': xxs,
                },
                !hasReaction ? {
                    'translate-x-[30px]': sender,
                    'translate-x-[-30px]': !sender
                } : ''
            ])
        }
    >
        {
            actions.map((action, key) => {
                return <Tooltip
                    key={action.title}
                    title={action.title}
                    activator={({ ref, events }) => {
                        return <Button
                            ref={ref}
                            {...events}
                            icon
                            iconSlot={
                                action.icon
                            }
                            className={{
                                'mr-2 h-16 w-[120px]': key === 0 && !xxs,
                                'mt-2': key === 0 && xxs
                            }}
                            onClick={action.onClick}
                        />
                    }}
                />
            })
        }
    </div>;
}

export default ChatActions;
