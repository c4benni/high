import React, { useMemo, useState } from 'react';
import Tooltip from '../../../../../components/Display/Overlay/Tooltip';
import Form from '../../../../../components/Form/Form';
import { AttachmentIcon } from '../../../../../components/Icon/Generic/Attachment';
import { SendIcon } from '../../../../../components/Icon/Generic/SendIcon';
import Button from '../../../../../components/Inputs/Button/Button';
import TextField from '../../../../../components/Inputs/TextField/TextField';

const buttonClasses = 'self-center w-[38px] h-[38px]'

function Textarea() {
    const [message, setMessage] = useState('')

    const validMessage = useMemo(() => message.trimStart().length, [message]);

    return <Form
        name='send-message'
        className={
            [
                'grid grid-flow-col grid-cols-[auto,1fr,auto] p-2 gap-x-2 border chat-border-color dark:border-gray-800 min-h-fit max-w-full rounded-md mb-2 mx-2 bg-true-gray-100 dark:bg-[#202020]',
            ]
        }
    >
        <Tooltip
            title='Add attachment'
            activator={({ ref, events }) => {
                return <Button
                    ref={ref}
                    {...events}
                    icon
                    iconSlot={
                        <AttachmentIcon />
                    }
                    className={[buttonClasses, 'text-xl']}
                    type='button'
                />
            }}
        />

        <TextField
            label='Send message'
            hideLabel
            type={'textarea'}
            placeholder='Type a message...'
            wrapperClassName={'h-fit min-h-[42px]'}
            inputClassName={
                'max-h-[200px] min-h-[38px] md:min-h-[42px] resize-none rounded-sm'
            }
            value={message}
            onModel={setMessage}
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
                    className={[
                        buttonClasses,
                        'text-white text-lg',
                        {
                            'rotate-90': !validMessage,
                            'opacity-100': validMessage
                        }
                    ]}
                    type='submit'
                    disabled={!validMessage}
                    primary
                />
            }}
        />
    </Form>;
}

export default Textarea;
