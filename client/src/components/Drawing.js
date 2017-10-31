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
        subscribeToDrawingLines(this.props.drawing.id, (linesEvent) => {
            this.setState(prevState => {
                return {
                    lines: [...prevState.lines, ...linesEvent.lines]
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
                    <div className="Drawing-title">{this.props.drawing.name} {this.state.lines.length}</div>
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