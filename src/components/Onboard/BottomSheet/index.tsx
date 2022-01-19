import React, { ReactEventHandler, useState, } from 'react'
import { useNavigate } from 'react-router-dom'
import useBreakpoint from '../../../hooks/breakpoint';
import BottomSheet from '../../Display/Dialog/BottomSheet'
import { CloseIcon } from '../../Icon/Generic/Close';
import IconWrapper from '../../Icon/Logo/IconWrapper';
import Button from '../../Inputs/Button/Button';
import AuthBottomSheetContent, { AuthMethod } from './Content';

type Props = {
    open: boolean;
    onModel: Function;
    method: AuthMethod
}

function AuthBottomSheet(props: Props) {

    const [breakpoint] = useBreakpoint();

    const [reOpenForm, setReOpenForm] = useState('')

    const { open, onModel, method } = props;

    const navigate = useNavigate();

    return (
        <BottomSheet
            open={open}
            height={window.innerHeight - (breakpoint.isMobile && breakpoint.orientation === 'portrait' ? 16 : 0)}
            onModel={(e: boolean) => {
                onModel(e)
            }}
            onAfterLeave={() => {
                if (reOpenForm) {
                    onModel(true);

                    navigate(`?form=${reOpenForm}`, {
                        replace: true
                    })

                    requestAnimationFrame(() => { setReOpenForm('') })
                } else {
                    navigate('', {
                        replace: true
                    })
                }
            }}
            onBeforeEnter={() => {
                setReOpenForm('')
            }}
            style={{
                '--height': breakpoint.isMobile ? 'calc(100vh + 100px)' : '90vh'
            }}
            bottom={
                breakpoint.isMobile ? undefined : '5vh'
            }
        >
            {
                ({ bind, close }: { bind: ReactEventHandler, close: Function }) => {
                    const rootHeight = `calc(${window.innerHeight}px - ${breakpoint.orientation === 'landscape' ? '0px' : '16px'})`;

                    return (
                        <div
                            className='grid grid-rows-[auto,1fr,auto] md:grid-rows-1 h-full relative md:shadow-2xl'
                            style={{
                                maxHeight: rootHeight,
                            }}
                        >
                            {
                                breakpoint.isMobile ?
                                    <div
                                        {...bind}
                                        className='h-[32px] rounded-t-[inherit] grid items-center justify-center group'
                                        onTouchStart={() => { }}
                                    >
                                        <span
                                            className='w-9 h-1 rounded-lg bg-gray-300 dark:bg-gray-600 group-active:bg-gray-500 dark:group-active:'
                                        >

                                        </span>
                                    </div>
                                    : null
                            }

                            <div className='w-full h-full overflow-y-auto'
                            >
                                <div
                                    className='min-h-full'
                                >
                                    <AuthBottomSheetContent
                                        method={method}
                                        onToggleForm={(e: string) => {
                                            setReOpenForm(e)
                                            props.onModel(false);
                                        }}
                                    />
                                </div>
                            </div>

                            {
                                breakpoint.isMobile ?
                                    <div
                                        className='h-[48px] w-full border-t-[0.75px] divide-border-default-color p-1'
                                    >
                                        <Button block className='h-full rounded-none text-error-700 dark:text-error-400 uppercase ring-error-700 dark:ring-error-400'
                                            onClick={
                                                () => {
                                                    onModel(false)
                                                }
                                            }
                                        >
                                            Close
                                        </Button>
                                    </div>
                                    : <Button
                                        icon
                                        className='absolute top-0 right-0 text-sm m-2 before:opacity-5 active:before:opacity-20 hover:before:opacity-10'
                                        onClick={
                                            () => {
                                                onModel(false)
                                            }
                                        }
                                    >
                                        <IconWrapper className='-mt-[2px]'>
                                            <CloseIcon />
                                        </IconWrapper>
                                    </Button>
                            }
                        </div>
                    )
                }
            }
        </BottomSheet>
    )
}

export default AuthBottomSheet
