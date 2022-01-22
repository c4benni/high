import React from 'react';
import Room from './Room';
import TextArea from './TextArea';

function Main() {
    return <main
        className='select-auto grid grid-rows-[1fr,auto] pt-[48px] max-h-screen'
    >

        <Room />

        <TextArea />
    </main>;
}

export default Main;
