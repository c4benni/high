import React from 'react';
import ChatBubble from '../../../../../components/Display/ChatBubble';
import ChatBubbleWrapper from '../../../../../components/Display/ChatBubble/Wrapper';

const message = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo a perspiciatis itaque pariatur? Porro itaque maiores aut qui, tempora consequuntur rem magni. Minus delectus ea illo optio, deserunt aperiam tenetur?'

function Room() {
    return <div className='overflow-y-auto max-h-full'>
        <ChatBubbleWrapper>
            <ChatBubble
                role='receiver'
                message={message}
                isFirstMessage
            />

            <ChatBubble
                role='sender'
                message={message}
            />
            <ChatBubble
                role='sender'
                message={message}
                subsequent
            />
        </ChatBubbleWrapper>
    </div>;
}

export default Room;
