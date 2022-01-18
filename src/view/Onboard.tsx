import React from 'react'
import Img from '../components/Display/Img'
import SignIn from '../components/Onboard/SignIn'
import { className } from '../components/utils/main';

import useBreakpoint from '../hooks/breakpoint'

function Onboard() {
    const [breakpoint] = useBreakpoint();

    return (
        <div
            className={
                className([
                    'grid grid-flow-col h-full items-start isolate md:grid-cols-[auto,1fr]',
                    {
                        dark: breakpoint.isMobile
                    }
                ])
            }
        >
            <SignIn className='min-w-full md:min-w-[550px] my-12' />

            <div className={
                className([
                    'flex-1 md:col-span-3 lg:col-span-2 xl:col-span-5 h-full fixed md:sticky top-0 w-full -z-10 md:z-auto overflow-hidden max-h-screen xl:rounded-r-lg',
                    {
                        'fill-after after:z-10 isolate after:bg-black after:bg-opacity-[0.85]': breakpoint.isMobile
                    }
                ])
            }>
                <Img
                    alt='splash image'
                    // publicId="highChat/splash/daniel-korpai-r73OFSry5AI-unsplash"
                    publicId='highChat/splash/jen-p-FoG8lotg7AA-unsplash_bff4c7.jpg'
                    className='h-full object-cover object-top w-full'
                />
            </div>
        </div>
    )
}

export default Onboard
