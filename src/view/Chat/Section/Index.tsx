import React, { useEffect } from 'react'
import { className } from '../../../components/utils/main'
import useBreakpoint from '../../../hooks/breakpoint'
import { useChatAside } from '../../../hooks/utils'
import Aside from './Aside/Index'
import Header from './Header'
import Main from './Main/Index'
import Nav from './Nav/Index'


// to add fade-appear on aside after it has been toggled;
// on large devices
let asideToggled = -1

function Section() {

    const [breakpoint] = useBreakpoint();

    const [showAside] = useChatAside()

    useEffect(() => {
        if ((!showAside || showAside) && (asideToggled < 1)) {
            asideToggled += 1
        }
    }, [
        showAside
    ])

    return (
        <section
            className={
                className([
                    'bg-white dark:bg-true-gray-800 grid relative md:ml-1',
                    !breakpoint.isMobile ? [
                        'grid-flow-col h-[calc(100%-0px)] self-end rounded-tl-lg overflow-hidden',
                        {
                            'grid-cols-[240px,1fr,240px]': showAside.visible,
                            'grid-cols-[240px,1fr]': !showAside.visible
                        }
                    ] : []
                ])
            }
        >
            <Nav />

            <Header />

            <Main />

            {
                showAside.visible ?
                    <Aside
                        className={{
                            'fade-appear': asideToggled && !breakpoint.isMobile
                        }}
                    />
                    : null
            }

        </section>
    )
}

export default Section
