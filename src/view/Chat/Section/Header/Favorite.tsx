import React, { useState } from 'react';
import { StarIcon } from '../../../../components/Icon/Generic/Star';
import Button from '../../../../components/Inputs/Button/Button';

function Favorite() {
    const [state, setState] = useState(false);

    return <Button
        icon
        htmlTitle='More'
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
}

export default Favorite;
