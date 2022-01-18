import React, { FormEvent, useEffect, useState } from 'react';
import { ClassName, className } from '../../utils/main';

import './main.css'

export type InputValue = string | number

type PropType = {
    label: string;
    type?: string;
    placeholder?: string;
    model?: InputValue;
    className?: ClassName
}

let instances = 0;

function TextField(props: PropType) {

    const [id, setId] = useState('')

    const [value, setValue] = useState<InputValue>()

    useEffect(() => {
        instances++;

        setId(`input-${instances}`)

        if (/string|boolean|number/.test(typeof props.model)) {
            // @ts-ignore;
            setValue(props.model);
        }
    }, [props])

    const onInput = (e: FormEvent) => {
        // setValue(e.target.value)
    }

    return (
        <div className={
            className([
                "inline-grid gap-y-1",
                props.className || ''
            ])
        }>
            <label htmlFor={id} className="text-sm xl:text-base text-gray-800 dark:text-gray-200">
                {props.label}
            </label>

            <input
                type={props.type}
                placeholder={props.placeholder}
                value={value}
                id={id}
                onInput={onInput}
                className="TextField"
            />
        </div>
    );
}

TextField.defaultProps = {
    type: 'text'
}

export default TextField;
