import React, { useState } from 'react';
import { ChevronRight } from '../../Icon/Generic/ChevronRight';
import IconWrapper from '../../Icon/Logo/IconWrapper';
import { className, ClassName } from '../../utils/main';
import { Slot } from '../../utils/types';

import './main.css'

type Props = {
    summary?: Slot;
    summaryText?: string;
    summaryAppend?: Slot;
    children: Slot;
    className?: ClassName;
    summaryClassName?: ClassName;
    open: boolean;
    onToggle?: Function;
    disabled?: boolean;
}

function Accordion(props: Props) {
    // used to avoid fade-appear from triggering on render if props.open;
    const [toggled, setToggled] = useState(false);

    return <section
        className={
            className([
                'Accordion',
                props.className
            ])
        }
    >
        {
            props.summary || <button
                className={
                    className([
                        'grid gap-x-1 pr-2 items-center justify-items-start grid-flow-col text-[0.825rem] uppercase text-gray-500 dark:hover:text-gray-400 hover:text-gray-600 font-semibold grid-cols-[auto,1fr]',
                        props.summaryClassName
                    ])
                }
                onClick={() => {
                    setToggled(true)
                    props.onToggle && props.onToggle(!props.open)
                }}
            >
                <IconWrapper
                    className={
                        className([
                            'transform-gpu transition-transform',
                            {
                                'rotate-90': props.open
                            }
                        ])
                    }
                >
                    <ChevronRight />
                </IconWrapper>

                {props.summaryText}

                {
                    props.summaryAppend
                }
            </button>
        }

        {
            props.open ?
                <div
                    className={
                        className([
                            'mt-2',
                            {
                                'fade-appear': toggled,
                            }
                        ])
                    }
                >
                    {
                        props.children
                    }
                </div>
                : null
        }
    </section>;
}

export default Accordion;
