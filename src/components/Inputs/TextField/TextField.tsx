import React, { useEffect, useState } from 'react';

type PropType = {
    label: string,
    type?: string
}

let instances = 0;

const classes = {
    root: 'inline-grid gap-y-1',
    label: 'text-gray-800 dark:text-gray-200',
    input: 'h-[38px] rounded-md border border-gray-300 dark:border-gray-700 border-opacity-70 outline-none ring-offset-2 ring-primary-700 dark:ring-primary-500 focus:ring-[2px] px-2',
}

function TextField(props: PropType) {

    const [id, setId] = useState('')

    useEffect(() => {
        instances++;

        setId(`input-${instances}`)
    }, [])

    return (
        <div className={classes.root}>
            <label htmlFor={id} className={classes.label}>
                {props.label}
            </label>

            <input
                type={props.type}
                id={id}
                className={classes.input}
            />
        </div>
    );
}

TextField.defaultProps = {
    type: 'text'
}

export default TextField;
