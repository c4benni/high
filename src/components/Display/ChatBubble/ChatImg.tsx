import React, { useState } from 'react';
import useBreakpoint from '../../../hooks/breakpoint';
import { eventKey } from '../../../utils/eventKey';
import { CloseIcon } from '../../Icon/Generic/Close';
import Button from '../../Inputs/Button/Button';
import { className } from '../../utils/main';
import Img from '../Img';
import Overlay from '../Overlay/Overlay';
import Tooltip from '../Overlay/Tooltip';

type Props = {
    sender: boolean;
}

function ChatImg(props: Props) {
    // const { sender } = props;

    const [lightHouse, setLightHouse] = useState(false);

    const [breakpoint] = useBreakpoint();

    return <>
        <Img
            publicId='samples/people/kitchen-bar.jpg'
            alt=''
            tabIndex={0}
            className={[
                'w-[32px] h-[32px] rounded-full row-start-1 mb-[-100%] hover:opacity-80 transition-opacity active:opacity-70 cursor-pointer',
                'justify-self-start col-start-1',
                {
                    // 'justify-self-start col-start-1': !sender,
                    // 'justify-self-end col-start-2': sender,
                    'opacity-0': lightHouse
                }
            ]}
            onClick={() => {
                setLightHouse(true)
            }}
            onKeyDown={(e: KeyboardEvent) => {
                if (/spacebar|enter/.test(eventKey(e))) {
                    e.preventDefault()
                }
            }}
            onKeyUp={(e: KeyboardEvent) => {
                if (/spacebar|enter/.test(eventKey(e))) {
                    e.preventDefault()
                    setLightHouse(true)
                }
            }}
        />

        <Overlay
            open={lightHouse}
            onToggle={setLightHouse}
            backdropBackground='bg-black bg-opacity-70'
            duration={breakpoint.is === 'xl' ? 0 : {
                leave: 250,
                enter: 450
            }}
            style={{
                '--spring-scale-exit-ease': 'ease',
                '--spring-scale-exit': '0.9'
            }}
        >
            <div
                className={
                    className([
                        'relative transition-opacity',
                        { 'opacity-0': !lightHouse }
                    ])
                }
            >
                <Img
                    publicId='samples/people/kitchen-bar.jpg'
                    alt=''
                    className={[
                        'max-h-[95vh] rounded-lg border border-gray-600 shadow-2xl dark:border-gray-700'
                    ]}
                />

                <Tooltip
                    title='Close'
                    activator={({ ref, events }) => {
                        return <Button
                            ref={ref}
                            {...events}
                            icon
                            iconSlot={
                                <CloseIcon />
                            }
                            onClick={() => {
                                setLightHouse(false)
                            }}
                            className={
                                [
                                    'absolute top-0 right-[-42px] text-white',
                                    {
                                        invisible: !lightHouse
                                    }
                                ]
                            }
                        />
                    }}
                />
            </div>
        </Overlay>
    </>
}

export default ChatImg;
