import React, { } from 'react'
import AsGuest from './AsGuest';
import AuthWithEmail from './WithEmail';

export type AuthMethod = 'google' | 'email' | 'twitter' | 'github' | 'guest' | ''

type Props = {
    method: AuthMethod;
    onToggleForm: Function;
}

// filters the auth method to render an auth component
function AuthBottomSheetContent(props: Props) {

    const { method } = props;

    const Component = () => {
        switch (method) {
            case 'email':
                return <AuthWithEmail
                    onToggleForm={(e: string) => {

                        props.onToggleForm(e)
                    }}
                />
            case 'guest':
                return <AsGuest />
            default:
                return ''
        }
    }

    return (
        <>
            {
                Component()
            }
        </>
    )
}

export default AuthBottomSheetContent
