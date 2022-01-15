import React from 'react'
import SignIn from '../components/Onboard/SignIn'

function Onboard() {
    return (
        <div
            className='grid grid-flow-col h-full items-start isolate'
        >
            <SignIn />

            <div className='bg-success-600 flex-1 md:col-span-3 lg:col-span-2 xl:col-span-5 h-full fixed md:relative top-0 md:top-auto w-full -z-10 md:z-auto'>

            </div>
        </div>
    )
}

export default Onboard
