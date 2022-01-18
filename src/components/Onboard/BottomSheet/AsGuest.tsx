import React from 'react'
import Form from '../../Form/Form'
import { AlertIcon } from '../../Icon/Generic/Alert'
import IconWrapper from '../../Icon/Logo/IconWrapper'
import Button from '../../Inputs/Button/Button'
import TextField from '../../Inputs/TextField/TextField'
import AuthBottomSheetTitle from './Title'

function AsGuest() {
    return (
        <div className='px-3 xs:px-6 grid max-w-[580px] mx-auto'>
            <AuthBottomSheetTitle
                title='High guest!'
                subtitle='Enter a username or generate one below'
            />

            <Form
                name='guest-username'
                className='mt-6'
            >
                <TextField
                    label='Username'
                />

                <Button
                    title='Generate username'
                    link
                    tag='div'
                    primary
                    block
                    className='mt-3 mb-6 mx-0'
                />

                <Button
                    title='Continue'
                    primary
                    type='submit'
                    block
                />
            </Form>

            <div className='Alert warn my-12'>
                <IconWrapper>
                    <AlertIcon />
                </IconWrapper>

                <div>
                    <p>
                        Note that <em><strong>Guest accounts</strong></em> will be deleted automatically after <em><strong>48 hours</strong></em> of creation.
                    </p>
                    <p>
                        This feature is intended to enable new users explore the app easily.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AsGuest
