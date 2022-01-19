import React from 'react'
import { className, ClassName } from '../utils/main'
type Props = {
    className?: ClassName;
}
function AppLoader(props: Props) {
    return (
        <div className={
            className([
                "loadingio-spinner-spinner-f2twgxfimmb",
                props.className || ''
            ])
        }>
            <div className='ldio-yna0his6739'>
                {
                    Array.from({ length: 8 }, (_, i) => i).map((i) => {
                        return <div
                            key={i}
                        />
                    })
                }
            </div>
        </div>
    )
}

export default AppLoader
