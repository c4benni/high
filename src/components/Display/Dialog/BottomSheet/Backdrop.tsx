import React from 'react'
import { className } from '../../../utils/main'

type Props = {
    onClose: Function;
    active: boolean;
    canRender: boolean
}

function BottomSheetBackdrop(props: Props) {
    return (
        props.canRender ?
            <div
                className={
                    className([
                        'transition-opacity bg-black bg-opacity-50 md:bg-opacity-70 fixed w-full h-full left-0 top-0 fade-appear',
                        {
                            'opacity-100': props.active,
                            'opacity-0': !props.active
                        }
                    ])
                }

                onClick={() => {
                    props.onClose()
                }}
            />
            : null
    )
}

export default BottomSheetBackdrop
