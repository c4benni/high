import React, { Fragment, useState } from 'react'
import IconWrapper from '../../../components/Icon/Logo/IconWrapper'
import Button from '../../../components/Inputs/Button/Button'
import { className } from '../../../components/utils/main'
import useBreakpoint from '../../../hooks/breakpoint'
import { navLinks } from './utils'

function Nav() {
    const [breakpoint] = useBreakpoint();

    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <nav
            key={`moblie-${breakpoint.isMobile}`}
            className={
                className([
                    'bg-inherit h-[48px] xs:h-[56px] md:h-full w-full md:w-[72px] md:col-start-1 md:col-end-2 fixed md:relative bottom-0 md:bottom-auto left-0 md:left-auto md:px-1 isolate',
                    {
                        'z-10': breakpoint.isMobile
                    }
                ])
            }
        >
            <ul
                className={
                    className([
                        'grid grid-flow-col md:grid-flow-row h-full fill-before relative before:bg-primary-700 dark:before:bg-primary-500 before:rounded-lg before:transform-gpu before:transition-transform',
                        !breakpoint.isMobile ? [
                            'grid-rows-[repeat(3,auto),1fr] gap-y-4 py-6 before:h-[56px] before:left-auto before:-right-1 before:w-1 before:my-6 before:z-10',
                            {
                                'before:translate-y-[calc(100%+1rem)]': activeIndex === 1,
                                'before:translate-y-[calc(200%+2rem)]': activeIndex === 2,
                                'before:translate-y-[calc(100vh-4rem-200%)]': activeIndex === 3,
                                'before:translate-y-[calc(100vh-3rem-100%)]': activeIndex === 4,
                            }
                        ] : [
                            'grid-cols-[repeat(5,1fr)] before:h-[2px] before:w-[20vw]',
                            {
                                'before:translate-x-[100%]': activeIndex === 1,
                                'before:translate-x-[200%]': activeIndex === 2,
                                'before:translate-x-[300%]': activeIndex === 3,
                                'before:translate-x-[400%]': activeIndex === 4,
                            }
                        ]
                    ])
                }
            >
                {
                    navLinks.map((link, key) => {
                        return <Fragment
                            key={`frag-${key}`}
                        >
                            <li
                                key={`link-${key}`}
                                className={
                                    className([
                                        {
                                            'h-[56px]': !breakpoint.isMobile
                                        }
                                    ])
                                }
                            >
                                <Button
                                    className={
                                        className([
                                            'grid-flow-row gap-y-1 text-[0.75rem] h-[56px] px-1 w-full justify-items-center content-end font-normal',
                                            {
                                                'before:text-primary-700 dark:before:text-primary-500': key === activeIndex
                                            },
                                            !breakpoint.isMobile ? [
                                                'ring-offset-0',
                                                {
                                                    'before:opacity-10 overflow-visible before:rounded-r-none hover:before:opacity-5 active:before:opacity-20': key === activeIndex
                                                }
                                            ] : [
                                                'rounded-none no-active-effect ring-0 ring-offset-0',
                                                {
                                                    'before:opacity-5 active:before:opacity-20': key === activeIndex,
                                                }
                                            ]
                                        ])
                                    }
                                    onClick={
                                        () => {
                                            setActiveIndex(key);
                                        }
                                    }
                                >
                                    <IconWrapper
                                        className='text-xl opacity-80'
                                    >
                                        {
                                            link.icon
                                        }
                                    </IconWrapper>

                                    {
                                        link.title
                                    }
                                </Button>
                            </li>

                            {
                                key === 2 && !breakpoint.isMobile ?
                                    <li
                                        key={`spacer-${key}`}
                                        className='pointer-events-none' aria-hidden='true' />
                                    : null
                            }
                        </Fragment>
                    })
                }
            </ul>
        </nav>
    )
}

export default Nav
