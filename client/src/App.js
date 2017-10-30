import React, {Component} from 'react';
import './App.css';
import DrawingForm from './components/DrawingForm';
import DrawingList from './components/DrawingList';
import Drawing from './components/Drawing';


class App extends Component {

    constructor(props) {
        super(props)

        this.state = {}

    }

    selectDrawing = (drawing) => {
        this.setState({
            selectedDrawing: drawing
        })
    }


    render() {
        let ctrl = (
            <div>
                <DrawingForm/>
                <DrawingList selectDrawing={this.selectDrawing}/>
            </div>
        );

        if (this.state.selectedDrawing) {
            ctrl = (
                <Drawing drawing={this.state.selectedDrawing}
                         key={this.state.selectedDrawing.id}></Drawing>
            )
        }


        return (
            <div className="App">
                <div className="App-header">
                    <h2>Our awesome drawing app</h2>
                </div>
                {ctrl}

            </div>

        );
    }
}

export default App;
