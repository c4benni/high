import React from 'react';
import Tooltip from '../../../../../components/Display/Overlay/Tooltip';
import { PlusIcon } from '../../../../../components/Icon/Generic/Plus';
import { SendIcon } from '../../../../../components/Icon/Generic/SendIcon';
import Button from '../../../../../components/Inputs/Button/Button';
import TextField from '../../../../../components/Inputs/TextField/TextField';

function Textarea() {
    return <div
        className='grid grid-flow-col grid-cols-[auto,1fr,auto]'
    >
        <Tooltip
            title='Add attachment'
            activator={({ ref, events }) => {
                return <Button
                    ref={ref}
                    {...events}
                    icon
                    iconSlot={
                        <PlusIcon />
                    }
                />
            }}
        />

        <TextField
            label='Send message'
            hideLabel
            type={'textarea'}
        />

        <Tooltip
            title='Send'
            activator={({ ref, events }) => {
                return <Button
                    ref={ref}
                    {...events}
                    icon
                    iconSlot={
                        <SendIcon />
                    }
                />
            }}
        />
    </div>;
}

export default Textarea;
