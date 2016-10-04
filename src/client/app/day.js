import React from 'react';

export default class DayView extends React.Component {
    render() {
        var hourNumberList = [];
        for (var i=0; i < 24; i++) {
            hourNumberList.push(<div key={i} style={{height:42}}><div className="tg-time-pri" style={{height:42}}>{i}:00</div></div>);
        }
        var hourMarkerList = [];
        for (var i=0; i < 24; i++) {
            hourMarkerList.push(<div key={i} className="tg-markercell"><div className="tg-dualmarker"></div></div>);
        }
        return (
            <section className="time-event" style={{
                overflow: 'scroll'
            }}>
                <section className="hour-number">{hourNumberList}</section>
                <section className="hour-marker">{hourMarkerList}</section>
            </section>
        );
    }
}
