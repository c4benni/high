import React from 'react';
import List from './List';
// import Empty from './Empty';

type Props = {
    filter: string;
}

function Rooms(props: Props) {
    return <div>
        <List filter={props.filter} />
    </div>;
}

export default Rooms;
