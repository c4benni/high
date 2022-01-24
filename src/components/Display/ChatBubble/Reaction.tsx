import { useMemo } from 'react';
import Button from '../../Inputs/Button/Button';
import { className as classes, getReaction } from '../../utils/main';
import { ReactionType } from '../../utils/types';
import Tooltip from '../Overlay/Tooltip';

type Props = {
    sender: boolean;
    type: ReactionType
}

function Reaction(props: Props) {
    const { sender, type } = props;

    const reaction = useMemo(() => getReaction(type), [type]);

    return <div
        className={
            classes([
                'flex h-full w-[30px] items-center justify-center',
                {
                    'pr-1 order-1': !sender,
                    'pl-1 order-3': sender
                }
            ])
        }
    >
        <Tooltip
            title={reaction.title}
            activator={({ ref, events }) => {
                // @ts-ignore
                return <Button
                    ref={ref}
                    {...events}
                    aria-label={reaction.title}
                    disabled={!type}
                    tabIndex={0}
                    className={
                        [
                            'rounded-full p-[0.5px] min-w-[1.5rem] min-h-[1.5rem] h-[auto] transition-opacity md:hover:before:opacity-10 active:before:opacity-20 md:active:before:opacity-20 cursor-pointer fill-before before:transition-opacity before:opacity-0 before:bg-current relative before:-z-1 isolate',
                            {
                                'text-error-600 dark:text-error-500': type === 'love',
                                'text-warning-600 dark:text-warning-400': type === 'exclaim'
                            }
                        ]
                    }
                >
                    {reaction.emoji}
                </Button>
            }}
        />
    </div>
}

export default Reaction;
