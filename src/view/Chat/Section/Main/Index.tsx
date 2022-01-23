import React from 'react';
import Room from './Room';
import Textarea from './TextArea';

function Main() {
    return <main
        className='select-auto grid grid-rows-[1fr,auto] pt-[48px] max-h-screen dark:bg-[#111]'
    >

        <Room />

        <Textarea />
    </main>;
}

export default Main;
