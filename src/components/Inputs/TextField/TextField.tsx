import React, { FormEvent, useEffect } from 'react';
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
    wrapperClassName?: ClassName;
    value?: string;
    onModel?: Function;
    prepend?: Slot;
    append?: Slot;
    hideLabel?: boolean;
    disabled?: boolean;
    [key: string]: any;
}

let instances = 0;

function TextField(props: PropType) {

    useEffect(() => {
        instances++;

    }, [props])

    const id = `input-${instances}`

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
                "TextFieldRoot",
                props.className || ''
            ])
        }>
            <label
                htmlFor={id}
                className={
                    className([
                        'text-sm xl:text-base text-gray-800 dark:text-gray-200',
                        {
                            'sr-only': props.hideLabel
                        }
                    ])
                }
            >
                {props.label}
            </label>

            <div className={
                className([
                    'TextFieldWrap',
                    {
                        'disabled fill-before': props.disabled
                    },
                    props.wrapperClassName
                ])
            }>
                {
                    props.prepend
                }
                <input
                    type={props.type}
                    placeholder={props.placeholder}
                    value={props.value}
                    id={id}
                    disabled={props.disabled}
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
