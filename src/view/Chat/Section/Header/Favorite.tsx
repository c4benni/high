import React, { useState } from 'react';
import Tooltip from '../../../../components/Display/Overlay/Tooltip';
import { StarIcon } from '../../../../components/Icon/Generic/Star';
import Button from '../../../../components/Inputs/Button/Button';

function Favorite() {
    const [state, setState] = useState(false);

    return <Tooltip
        title='Add to Favorite'
        activator={({ ref, events, attrs }) => {
            return <Button
                ref={ref}
                {...events}
                {...attrs}
                icon
                className={{
                    'text-warning-500': state,
                    'text-gray-600 dark:text-gray-300': !state
                }}
                onClick={() => {
                    setState(!state)
                }}
                iconSlot={
                    <StarIcon />
                }
            />
        }}
    />
}

export default Favorite;
