import React, { FormEvent, ReactNode } from 'react';
import Button from '../Inputs/Button/Button';
import { className } from '../utils/main';
import './main.css'

type SubmitButton = {
    submitText?: string,
    submitProps?: object,
}

interface FormProps extends SubmitButton {
    name: string;
    children: ReactNode;
    action?: string;
    className?: string
}

function Submit(props: SubmitButton) {
    const attemptSubmit = (e: Event) => {
        e.preventDefault();
    }
    return props.submitText ?
        (
            <Button
                primary
                {...props.submitProps}
                onClick={attemptSubmit}
                title={props.submitText}
            />
        )
        : null
}

function Form(props: FormProps) {

    const submit = (e: FormEvent) => {
        e.preventDefault()
    }

    return (
        <form
            action={props.action}
            onSubmit={submit}
            className={
                className([
                    'Form',
                    props.className || ''
                ])
            }
        >

            {props.children}

            <Submit
                submitProps={props.submitProps}
                submitText={props.submitText}
            />
        </form>
    );
}

Form.defaultProps = {
    action: '.',
    submitProps: {}
}

export default Form;
