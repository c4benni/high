import React, { useMemo, useRef, useState } from 'react';
import useBreakpoint from '../../../hooks/breakpoint';
import { HorizontalDots } from '../../Icon/Generic/HorizontalDots';
import { ReactionIcon } from '../../Icon/Generic/Reaction';
import Button from '../../Inputs/Button/Button';
import { className, reactions } from '../../utils/main';
import { GetReaction } from '../../utils/types';
import Popover from '../Overlay/Popover';
import Tooltip from '../Overlay/Tooltip';

type Props = {
    sender: boolean;
    onSetReaction: (reaction: GetReaction | null) => void;
    hasReaction: boolean;
}

function ChatActions(props: Props) {
    const { sender, onSetReaction, hasReaction } = props;

    const [breakpoint] = useBreakpoint();

    const xxs = breakpoint.is === 'xxs'

    const reactionRef = useRef(null);

    const moreRef = useRef(null)

    const [reactionPopover, setReactionPopover] = useState(false);
    // const [reactionPopover, setm] = useState(false);

    const [selectedReaction, setSelectedReaction] = useState<GetReaction | null>()


    const actions = useMemo(() => {
        return [{
            title: 'Reaction',
            icon: <ReactionIcon />,
            onClick: () => {
                setReactionPopover(true)
            },
            ref: reactionRef,
            reaction: true
        },
        {
            title: 'More',
            icon: <HorizontalDots />,
            ref: moreRef
        }]
    }, [setReactionPopover])

    return <div
        className={
            className([
                'flex w-fit items-end mb-1 ChatAction group-hover:opacity-100 group-focus-within:opacity-100 transition-transform transform-gpu',
                {
                    'mr-2 order-1': sender,
                    'ml-2 order-2': !sender,
                    'flex-col-reverse': xxs,
                    'opacity-0': !reactionPopover,
                    'opacity-100': reactionPopover
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
                    activator={({ ref, events, toggle }) => {
                        ref.current = action.ref.current

                        const Btn = <Button
                            ref={action.ref}
                            {...events}
                            icon
                            iconSlot={
                                action.icon
                            }
                            className={{
                                'mr-2': key === 0 && !xxs,
                                'mt-2': key === 0 && xxs
                            }}
                            onClick={() => {
                                action.onClick?.();

                                toggle(false)
                            }}
                        />

                        return action.reaction ?
                            <Popover
                                arrowSize={10}
                                open={reactionPopover}
                                onToggle={setReactionPopover}
                                activator={({ ref: popOverRef }) => {
                                    popOverRef.current = action.ref.current

                                    return Btn
                                }
                                }
                            >
                                <ul
                                    className='p-1 rounded-md grid grid-flow-col gap-x-1 items-center'
                                >
                                    {
                                        reactions.map((item) => {
                                            return item.emoji ?
                                                <Tooltip
                                                    key={item.title}
                                                    title={item.title}
                                                    activator={({ ref: reactionItemRef, events }) => {
                                                        return <Button
                                                            ref={reactionItemRef}
                                                            {...events}
                                                            tag='li'
                                                            role='menuitem'
                                                            key={item.title}
                                                            icon
                                                            onClick={() => {
                                                                if (item.type === selectedReaction?.type) {
                                                                    onSetReaction(null)

                                                                    setSelectedReaction(null)
                                                                } else {
                                                                    onSetReaction(item)

                                                                    setSelectedReaction(item)
                                                                }
                                                            }}
                                                            className={[
                                                                {
                                                                    'text-error-600 dark:text-error-500': item.type === 'love',
                                                                    'text-warning-600 dark:text-warning-400': item.type === 'exclaim',
                                                                    'ring-[2px]': item.type === selectedReaction?.type
                                                                }
                                                            ]}
                                                        >
                                                            {item.emoji}
                                                        </Button>
                                                    }}
                                                />
                                                : null
                                        })
                                    }
                                </ul>
                            </Popover> : Btn
                    }}
                />
            })
        }
    </div>;
}

export default ChatActions;
