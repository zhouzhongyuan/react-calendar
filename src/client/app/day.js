import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

var flag = false;
var topOfTimeEvent;
var scrollTopOfTimeEvent;
var startTop;
var clipHeight;
var clickFlag = true;
export default class DayView extends React.Component {
    handleMouseDown (e){
        clickFlag = true;
        flag = true;
        clipHeight = 0;
        topOfTimeEvent = 0;
        scrollTopOfTimeEvent = 0;
        startTop = 0;

        //取得鼠标点击点距离scrllable time-event的距离
        var timeEvent = $('.time-event');
        var timeEventPosition = timeEvent.position();
        topOfTimeEvent = timeEventPosition.top;
        var self = this;
        scrollTopOfTimeEvent = $('.time-event').scrollTop();
        var clientY = e.clientY;
        startTop = clientY - topOfTimeEvent + scrollTopOfTimeEvent;
        var startBlockTop = (Math.floor(startTop / 21)) * 21;
        var clipWrapper = ReactDOM.findDOMNode(self.refs.clipWrapper);
        $(clipWrapper).css({ top: `${startBlockTop}px` });
        $(clipWrapper).height(0);
        $(clipWrapper).show();
    }
    handleMouseMove(e) {
        if (flag){
            clickFlag = false;
            var clientY = e.clientY;
            var relativeTop = clientY - topOfTimeEvent + scrollTopOfTimeEvent;
            var relativeHeight = relativeTop - startTop;

            clipHeight = Math.ceil(relativeHeight / 21)
            clipHeight *= 21;
            var clipWrapper = ReactDOM.findDOMNode(this.refs.clipWrapper);
            $(clipWrapper).height(clipHeight);
        }
    }
    handleMouseUp (e) {
        flag = false;
    }
    handleHourMarkerClick(e) {
        if (clickFlag){
            //取得鼠标点击点距离scrllable time-event的距离
            var timeEvent = $('.time-event');
            var timeEventPosition = timeEvent.position();
            topOfTimeEvent = timeEventPosition.top;
            var self = this;

            scrollTopOfTimeEvent = $('.time-event').scrollTop();
            var clientY = e.clientY;
            startTop = clientY - topOfTimeEvent + scrollTopOfTimeEvent;
            var startBlockTop = (Math.floor(startTop / 21)) * 21;

            var clipWrapper = ReactDOM.findDOMNode(self.refs.clipWrapper);
            $(clipWrapper).css({ top: `${startBlockTop}px` });
            $(clipWrapper).height(42);
            $(clipWrapper).show();
        }
    }


    handleClipWrapperMouseUp(e){
        flag = false;
        var hourMarker = ReactDOM.findDOMNode(this.refs.hourMarker);
    }
    handleClipWrapperClick(e) {
        var clipWrapper = ReactDOM.findDOMNode(this.refs.clipWrapper);
        $(clipWrapper).height(0);
        $(clipWrapper).hide();
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
                <section className="hour-number">
                    {hourNumberList}
                </section>
                <section className="hour-marker-event">
                    <section
                        ref="hourMarker"
                        className="hour-marker"
                        onMouseDown = {(e) =>   {this.handleMouseDown(e)}}
                        onMouseMove = {(e) =>   {this.handleMouseMove(e)}}
                        onMouseUp = {(e) =>     {this.handleMouseUp(e)}}
                        onClick = {(e) =>     {this.handleHourMarkerClick(e)}}

                    >
                        {hourMarkerList}
                    </section>
                    <section
                        className="hour-event"
                        ref="hourEvent"
                    ></section>
                    <div
                        className="clip-wrapper"
                        ref="clipWrapper"
                        onClick = {(e) =>     {this.handleClipWrapperClick(e)}}
                        onMouseUp = {(e) =>     {this.handleClipWrapperMouseUp(e)}}
                    ></div>
                </section>

            </section>
        );
    }
}
