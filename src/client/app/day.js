import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

export default class DayView extends React.Component {
    handleMouseDown (e){
        var hourMarker = ReactDOM.findDOMNode(this.refs.hourMarker);
        var hourEvent = ReactDOM.findDOMNode(this.refs.hourEvent);


        var timeEvent = $('.time-event');
        var timeEventPosition = timeEvent.position();
        var topOfTimeEvent = timeEventPosition.top;
        var self = this;

        var scrollTopOfTimeEvent = $('.time-event').scrollTop();
        var clientY = e.clientY;
        var startTop = clientY - topOfTimeEvent + scrollTopOfTimeEvent;
        var startBlockTop = (Math.floor(startTop / 42)) * 42;
        console.log(startBlockTop);


        var clipWrapper = ReactDOM.findDOMNode(self.refs.clipWrapper);
        $(clipWrapper).show();
        $(clipWrapper).css({ top: `${startBlockTop}px` });

        $(hourMarker).on('mousemove',function (e) {
            var clientY = e.clientY;
            var relativeTop = clientY - topOfTimeEvent + scrollTopOfTimeEvent;
            var relativeHeight = relativeTop - startTop;
            // if(relativeHeight < 0){
            //     var startBlockTop = (Math.floor(relativeTop / 42)) * 42;
            //
            //
            //
            // }else{
                var clipHeight = Math.ceil(relativeHeight / 21)
                clipHeight *= 21;
            // }

            $(clipWrapper).height(clipHeight);
            //TODO 处理向上drag


        });
    }
    handleMouseUp (e) {
        var hourMarker = ReactDOM.findDOMNode(this.refs.hourMarker);
        $(hourMarker).off('mousemove');
        console.log('mouse up');
    }
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
            <section
                className="time-event"
            >
                <section className="hour-number">{hourNumberList}</section>
                <section className="hour-marker-event">
                    <section
                        ref="hourMarker"
                        className="hour-marker"
                        onMouseDown = {(e) => {this.handleMouseDown(e)}}
                        onMouseUp = {() => {this.handleMouseUp()}}
                    >{hourMarkerList}</section>
                    <section
                        className="hour-event"
                        ref="hourEvent"
                    ></section>
                    <div
                        className="clip-wrapper"
                        ref="clipWrapper"
                        style = {{
                            display:'none',
                            backgroundColor : '#7BD148',
                            position: 'absolute',
                        }}
                    ></div>
                </section>

            </section>
        );
    }
}
