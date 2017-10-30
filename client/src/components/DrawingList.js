import React from 'react';
import {subscribeToDrawings} from '../api';


export class DrawingList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            drawings: []
        }

        subscribeToDrawings((drawings) => {
            this.setState(prevState => ({
                drawings: prevState.drawings.concat([drawings])
            }))
        })
    }


    render() {

        const drawings = this.state.drawings.map((drawing) => (
            <li className="DrawingList-item" key={drawing.id}>
                {drawing.name}
            </li>
        ))

        return (
            <ul className="DrawingList">
                {drawings}
            </ul>
        );
    }
}

export default DrawingList;