import React from 'react';
import {render} from 'react-dom';
import DayView from './day';

class App extends React.Component {
    render() {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                width: '100%',
                height: '100%'
            }}>
                <p style={{height:60}}>Calendar</p>
                <DayView/>
            </div>
        );
    }
}

render(<App/>, document.getElementById('app'));