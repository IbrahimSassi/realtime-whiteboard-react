import React, {Component} from 'react';
import './App.css';
import DrawingForm from './components/DrawingForm';
import DrawingList from './components/DrawingList';


class App extends Component {

    constructor(props) {
        super(props)

        this.state = {}

    }


    handleChange = (event) => {
        this.setState({
            search: event.target.value
        })
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Our awesome drawing app</h2>
                </div>

                <DrawingForm/>
                <DrawingList/>
            </div>

        );
    }
}

export default App;
