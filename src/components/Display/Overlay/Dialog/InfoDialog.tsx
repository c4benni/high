import { ReactNode, useMemo } from 'react';
import { uid } from '../../../../utils/main';
import { CloseIcon } from '../../../Icon/Generic/Close';
import Button from '../../../Inputs/Button/Button';
import { Slot } from '../../../utils/types';
import Overlay from '../Overlay';
import Tooltip from '../Tooltip';

type Props = {
    open: boolean;
    onToggle: (open: boolean) => void;
    children: Slot;
    title: ReactNode;
}

function InfoDialog(props: Props) {
    const { open, onToggle, children, title } = props

    const id = useMemo(() => `infoDialog-${uid()}`, [])

    return <Overlay
        open={open}
        onToggle={onToggle}
        className={'rounded-md max-w-[92.5vw] sm:max-w-sm md:max-w-md min-h-[180px] md:min-h-[200px] bg-white dark:bg-gray-800 shadow-2xl dark:shadow-none dark:border default-border-color border-opacity-0 dark:border-opacity-40'}
        dialogAttrs={{
            'aria-labelledby': id
        }}
    >
        <header
            className='grid grid-flow-col grid-cols-[1fr,auto] justify-between p-3 items-center border-b default-border-color dark:border-b-[0.75px] gap-x-1'
        >
            <h2
                id={id}
                className='text-title text-xl font-bold truncate'>
                {title}
            </h2>

            <Tooltip
                title='Close dialog'
                activator={({ ref, events }) => {
                    return <Button
                        ref={ref}
                        {...events}
                        icon
                        iconSlot={
                            <CloseIcon />
                        }
                        onClick={() => onToggle(false)}
                    />
                }}
            />
        </header>

        <div
            className='p-3 text-body'
        >
            {children}
        </div>
    </Overlay>
}

export default InfoDialog;
