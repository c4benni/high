import React from 'react'
import { className } from '../../../components/utils/main'
import useBreakpoint from '../../../hooks/breakpoint'
import Aside from './Aside/Index'
import Header from './Header'
import Main from './Main/Index'
import Nav from './Nav/Index'

function Section() {
    const [breakpoint] = useBreakpoint();

    return (
        <section
            className={
                className([
                    'bg-white dark:bg-true-gray-800 grid relative md:ml-1',
                    !breakpoint.isMobile ? [
                        'grid-flow-col grid-cols-[240px,1fr,240px] h-[calc(100%-0px)] self-end rounded-tl-lg overflow-hidden'
                    ] : []
                ])
            }
        >
            <Nav />

            <Header />

            <Main />

            <Aside />

        </section>
    )
}

export default Section
