import React, { createElement, FormEvent, useEffect, useState } from 'react';
import { uid } from '../../../utils/main';
import { ClassName, className } from '../../utils/main';
import { Slot } from '../../utils/types';

import './main.css'

export type InputValue = string | number

export type TextFieldType = React.HTMLInputTypeAttribute | 'textarea'

type PropType = {
    label: string;
    type?: TextFieldType;
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

function TextField(props: PropType) {

    const [id, setUid] = useState('')

    useEffect(() => {
        setUid(`i-${uid()}`)
    }, [setUid])

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
                {
                    createElement(props.type === 'textarea' ? 'textarea' : 'input', {
                        type: props.type !== 'textarea' ? props.type : undefined,
                        placeholder: props.placeholder,
                        value: props.value,
                        id,
                        disabled: props.disabled,
                        onInput,
                        className:
                            className([
                            "TextField",
                            props.inputClassName || ''
                        ])

                    })
                }
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
