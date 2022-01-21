import React, { useState } from 'react'
import { Image, Placeholder, } from 'cloudinary-react';
import { className, ClassName } from '../utils/main';

export type ImgProps = {
    publicId?: string;
    src?: string;
    alt: string;
    className?: ClassName;
    width?: string | number;
    height?: string | number;
    loading?: 'lazy' | 'eager',
    [key: string]: any;
}

function Img(props: ImgProps) {
    const [loaded, $loaded] = useState<Boolean | null>(false);

    return (
        <Image
            {...props}
            className={className([
                {
                    invisible: loaded === false
                },
                props.className
            ])}
            loading={props.loading}
            quality={70}
            decoding='async'
            onLoad={() => {
                $loaded(true)
            }}
            onError={() => {
                $loaded(false)
            }}
        >
            <Placeholder
                type="predominant" />
        </Image>
    )
}

Img.defaultProps = {
    loading: 'lazy'
}

export default Img
