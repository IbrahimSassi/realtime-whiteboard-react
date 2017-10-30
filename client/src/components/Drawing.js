import React from 'react';
import Canvas from 'simple-react-canvas';
import {publishLine, subscribeToDrawingLines} from '../api';


export class Drawing extends React.Component {
    constructor(props, context) {
        super(props, context);


        this.state = {
            lines: []
        }
    }


    componentDidMount() {
        subscribeToDrawingLines(this.props.drawing.id, (line) => {
            this.setState(prevState => {
                return {
                    lines: [...prevState.lines, line]
                }
            })
        })
    }

    handleDraw = (line) => {
        publishLine({drawingId: this.props.drawing.id, line})
    }


    render() {

        return (
            this.props.drawing ? (
                <div className="Drawing">
                    <div className="Drawing-title">{this.props.drawing.name}</div>
                    <Canvas drawingEnabled={true}
                            onDraw={this.handleDraw}
                            lines={this.state.lines}
                    ></Canvas>
                </div>

            ) : null
        );
    }
}

export default Drawing;