import { AppLogo } from '../../Icon/Logo/AppLogo'

type Props = {
    title: string;
    subtitle: string;
}

function AuthBottomSheetTitle(props: Props) {
    return (
        <>
            <div className='mt-6 text-4xl flex justify-center items-center'>
                <AppLogo />
            </div>

            <div className='text-center'>
                <h2
                    className='text-3xl font-bold mt-3 mb-2 text-title'
                >
                    {props.title}
                </h2>

                <h3
                    className='text-caption'
                >
                    {
                        props.subtitle
                    }
                </h3>
            </div>
        </>
    )
}

export default AuthBottomSheetTitle
