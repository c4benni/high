import React, { FormEvent, useEffect, useState } from 'react';
import { ClassName, className } from '../../utils/main';
import { Slot } from '../../utils/types';

import './main.css'

export type InputValue = string | number

type PropType = {
    label: string;
    type?: string;
    placeholder?: string;
    model?: InputValue;
    className?: ClassName;
    inputClassName?: ClassName;
    value?: string;
    onModel?: Function;
    prepend?: Slot;
    append?: Slot;
    [key: string]: any;
}

let instances = 0;

function TextField(props: PropType) {

    const [id, setId] = useState('')

    useEffect(() => {
        instances++;

        setId(`input-${instances}`)

    }, [props])

    const onInput = (e: FormEvent) => {
        if (typeof props.onInput == 'function') {
            props.onInput(e)
        }
        if (props.onModel) {
            const inputEl = e.target as HTMLInputElement;
            props.onModel(inputEl.value);
        }
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

            <div className='relative'>
                {
                    props.prepend
                }
                <input
                    type={props.type}
                    placeholder={props.placeholder}
                    value={props.value}
                    id={id}
                    onInput={onInput}
                    className={
                        className([
                            "TextField",
                            props.inputClassName || ''
                        ])
                    }
                />
                {
                    props.append
                }
            </div>
        </div>
    );
}

TextField.defaultProps = {
    type: 'text'
}

export default TextField;
