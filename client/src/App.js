import React, {Component} from 'react';
import './App.css';
import {subscribeToTimer} from './api';

class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            timestamp: new Date()
        }

        subscribeToTimer(data => {
            this.setState({
                timestamp: new Date(data)
            })
        })
    }


    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Our awesome drawing app</h2>
                </div>
                hello {this.state.timestamp.toUTCString()}
            </div>
        );
    }
}

export default App;
