import React, { useState } from 'react'
import Divider from '../Display/Divider'
import Button from '../Inputs/Button/Button'
import { AnonIcon } from '../Icon/Generic/Anon'
import IconWrapper from '../Icon/Logo/IconWrapper'
import oauth from './authOptions'
import { AppLogo } from '../Icon/Logo/AppLogo'
import { className } from '../utils/main'
import useBreakpoint from '../../hooks/breakpoint'
// import AuthBottomSheet from './AuthBottomSheet'
import BottomSheet from '../Display/Dialog/BottomSheet'

type Props = {
    className?: string;
}


function SignIn(props: Props) {

    const [breakpoint] = useBreakpoint();

    const [dialog, $dialog] = useState(false);


    const buttonClass = className([
        'justify-start gap-x-2 shadow-sm bg-white pl-[1rem] max-w-[212px] xl:max-w-[250px]',
        {
            'dark:bg-true-gray-800': !breakpoint.isMobile,
            'text-gray-800': breakpoint.isMobile
        }
    ])

    return (
        <>
            <div
                className={[
                    'grid justify-items-center',
                    props.className
                ].filter(Boolean).join(' ')}
            >

                <div
                    className='grid justify-items-center gap-y-3 mb-4 md:mb-8'
                >
                    <IconWrapper
                        className="text-6xl"
                    >
                        <AppLogo />
                    </IconWrapper>

                    <p className='text-caption font-semibold italic'>
                        Simple • Fast • Secured
                    </p>
                </div>

                <h1
                    className='text-2xl md:text-4xl font-extrabold text-title mb-6'
                >
                    Sign in to say High
                </h1>

                <div className='w-full px-6 grid'>
                    <div
                        className='inline-grid gap-y-3 justify-self-center mt-2'
                    >
                        {
                            oauth.map((auth) => {
                                return <Button
                                    key={auth.title}
                                    block
                                    className={buttonClass}
                                    onClick={() => {
                                        $dialog(true);
                                    }}
                                >
                                    <span className='w-[24px] flex items-center justify-center'>
                                        {auth.icon}
                                    </span>
                                    Continue with {auth.title}
                                </Button>
                            })
                        }
                    </div>

                    <Divider text='or' className="my-8" />

                    <Button
                        className={`${buttonClass} justify-self-center`}
                        block
                    >
                        <span className='w-[24px] flex items-center justify-center'>
                            <AnonIcon />
                        </span>

                        Continue as guest
                    </Button>

                    <p className='mt-3 text-caption text-center'>
                        You will only have access to the global chat room.
                    </p>
                </div>

            </div>

            {/* <AuthBottomSheet
                open={dialog}
                onClose={() => $dialog(false)}
            /> */}

            <BottomSheet
                open={dialog}
                onModel={(e: boolean) => {
                    $dialog(e)
                }}
            />
        </>
    )
}

export default SignIn
