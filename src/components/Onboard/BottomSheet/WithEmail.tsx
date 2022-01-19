import React, { useMemo } from 'react'
import { useQuery } from '../../../hooks/utils'
import Divider from '../../Display/Divider'
import Form from '../../Form/Form'
import Button from '../../Inputs/Button/Button'
import TextField from '../../Inputs/TextField/TextField'
import AuthBottomSheetTitle from './Title'

type Props = {
    onToggleForm: Function
}

function AuthWithEmail(props: Props) {

    const queryForm = useQuery().get('form')
    const isForgotPassword = queryForm === 'forgot-password';
    const isSignUp = queryForm === 'sign-up';
    const isSignIn = queryForm === 'sign-in' || !queryForm;


    const TextFields = useMemo(() => {
        const password = {
            label: 'Password',
            type: 'password'
        }

        const emailOrUsername = {
            label: 'Email or username',
        }

        const signUp = [
            {
                label: 'Username',
            },
            {
                label: 'Email',
                type: 'email'
            },
            password,
            // {
            //     ...password,
            //     label: 'Confirm password'
            // }
        ];

        const signIn = [
            emailOrUsername,
            password
        ]

        const forgotPassword = [
            emailOrUsername
        ]

        return isSignUp ? signUp : isForgotPassword ? forgotPassword : signIn
    }, [isSignUp, isForgotPassword])

    const submitButton = useMemo(() => {
        if (isForgotPassword) {
            return {
                title: 'Send recovery link',
            }
        }
        if (isSignUp) {
            return {
                title: 'Sign up'
            }
        }
        return {
            title: 'Sign in'
        }
    }, [
        isForgotPassword, isSignUp
    ])

    const altAction = useMemo(() => {
        const signIn = {
            actionTitle: 'Sign in',
            to: 'sign-in'
        }

        if (isForgotPassword) {
            return {
                caption: 'Have your credentials?',
                ...signIn
            }
        }
        if (isSignUp) {
            return {
                caption: 'Already have an account?',
                ...signIn
            }
        }
        return {
            caption: 'Need an account?',
            actionTitle: 'Sign up',
            to: 'sign-up'
        }
    }, [
        isForgotPassword, isSignUp
    ])

    return (
        <div className='px-3 xs:px-6 grid'>

            <AuthBottomSheetTitle
                title='High there!'
                subtitle={
                    isForgotPassword ?
                        `Let's help you recover your password` :
                        isSignIn ?
                            'Do you have an account with us?'
                            : 'Create a new account quickly ⚡'
                }
            />

            <div
                className='mx-auto grid w-full max-w-[580px]'
            >
                <Form
                    name='find-account'
                    className='mt-6'
                >

                    {

                        TextFields.map((input, key) => {
                            return <TextField
                                key={`input-${key}`}
                                label={input.label}
                                // @ts-ignore
                                type={input?.type || 'text'}
                                className={{
                                    'pt-3 md:pt-4': key > 0
                                }}
                            />
                        })
                    }

                    <Button
                        title={
                            submitButton.title
                        }
                        primary
                        block
                        className='mt-6'
                        type='submit'
                    />
                </Form>

                {
                    isSignIn ?
                        <Button
                            block
                            title='Forgot password?'
                            className="primary-text mt-4"
                            onClick={() => {
                                props.onToggleForm('forgot-password')
                            }}
                        />
                        : null
                }
            </div>

            <Divider
                text='or'
                className='my-8'
            />

            <p className='pb-12 text-center'>
                {
                    altAction.caption
                } <Button
                    link
                    title={
                        altAction.actionTitle
                    }
                    primary
                    onClick={() => {
                        props.onToggleForm(
                            altAction.to
                        )
                    }}
                />
            </p>
        </div>
    )
}

export default AuthWithEmail
