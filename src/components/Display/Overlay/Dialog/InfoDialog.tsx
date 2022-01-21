import { ReactNode } from 'react';
import Dialog from '.';
import { CloseIcon } from '../../../Icon/Generic/Close';
import Button from '../../../Inputs/Button/Button';
import { Slot } from '../../../utils/types';

type Props = {
    open: boolean;
    onToggle: (open: boolean) => void;
    children: Slot;
    title: ReactNode;
}

function InfoDialog(props: Props) {
    const { open, onToggle, children, title } = props

    return <Dialog
        open={open}
        onToggle={onToggle}
        className={'rounded-md max-w-[95vw] sm:max-w-sm md:max-w-md min-h-[180px] md:min-h-[200px] bg-white dark:bg-gray-800 shadow-2xl'}
    >
        <header
            className='flex justify-between p-3 items-center border-b default-border-color dark:border-b-[0.75px]'
        >
            <h2 className='text-title text-xl font-bold'>
                {title}
            </h2>

            <Button
                icon
                iconSlot={
                    <CloseIcon />
                }
                onClick={() => onToggle(false)}
            />
        </header>

        <div
            className='p-3 text-body'
        >
            {children}
        </div>
    </Dialog>
}

export default InfoDialog;
