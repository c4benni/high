import React from 'react'
import Section from './Section/Index'
import Nav from './Nav/Index'

function ChatIndexPage() {
    return (
        <article
            className='min-h-full h-full grid grid-flow-row md:grid-flow-col grid-rows-[1fr,auto] md:grid-rows-1 md:grid-cols-[auto,1fr] bg-true-gray-200 dark:bg-[#111] no-select'
        >
            <Nav />
            <Section />
        </article>
    )
}

export default ChatIndexPage
