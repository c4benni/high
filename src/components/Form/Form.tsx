import React, { FormEvent, ReactNode } from 'react';
import Button from '../Inputs/Button/Button';
import './main.css'

type SubmitButton = {
    submitText?: string,
    submitProps?: object,
}

interface FormProps extends SubmitButton {
    name: string,
    children: ReactNode,
    action?: string
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
            >
                {props.submitText}
            </Button>
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
            className='Form'
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
