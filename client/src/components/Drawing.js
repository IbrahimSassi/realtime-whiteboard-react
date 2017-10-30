import React from 'react';
import Canvas from 'simple-react-canvas';


export class Drawing extends React.Component {
    constructor(props, context) {
        super(props, context);
    }


    render() {

        return (
            this.props.drawing ? (
                <div className="Drawing">
                    <div className="Drawing-title">{this.props.drawing.name}</div>
                    <Canvas drawingEnabled={true}></Canvas>
                </div>

            ) : null
        );
    }
}

export default Drawing;