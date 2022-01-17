import React, { useState } from 'react'
import { Image, Placeholder, } from 'cloudinary-react';

export type ImgProps = {
    publicId?: string;
    src?: string;
    alt: string;
    className?: string;
    width?: string | number;
    height?: string | number;
    [key: string]: any;
}

function Img(props: ImgProps) {
    const [loaded, $loaded] = useState<Boolean | null>(false);

    return (
        <Image
            {...props}
            className={[
                loaded === false ? 'invisible' : '',
                props.className
            ].filter(Boolean).join(' ')}
            loading="lazy"
            quality={70}
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

export default Img
