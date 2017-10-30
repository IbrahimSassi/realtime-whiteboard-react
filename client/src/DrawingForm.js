import React from 'react';
import {createdDrawing} from './api';


export class DrawingForm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            drawingName: ''
        }
    }


    handleSubmit = (event) => {
        event.preventDefault()
        createdDrawing(this.state.drawingName)
        this.setState({
            drawingName: ''
        })
    }

    render() {
        return (
            <div className="Form">
                <form onSubmit={this.handleSubmit}>
                    <input type="text"
                           className="Form-drawingInput"
                           required
                           value={this.state.drawingName}
                           onChange={(evt) => {
                               this.setState({
                                   drawingName: evt.target.value
                               })
                           }}/>
                    <input type="submit" value="Create drawing" className="Form-drawingInput"/>
                </form>
            </div>
        );
    }
}

export default DrawingForm;