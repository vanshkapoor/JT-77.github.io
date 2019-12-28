import React, { Component } from 'react';
import CloseBtn from './../modals/Closebutton';
const $ =window.$;
class App extends Component {
  render() {
    let width=$(window).width()<500?$(window).width():500;
    let height=width;
  return (
    <div id="video-disp">
        
        <CloseBtn id="video-disp"/> 
                
        <div className="modal-content text-center">
          <video src="video.mp4" width={width} height={height} controls></video>  
        </div>
    </div>);
  }

  componentDidMount(){
      $("#disp-video").animatedModal({
        modalTarget:"video-disp",  
        animatedIn:'zoomIn',
        animatedOut: 'bounceOut',
        color:'#fff'
    });
  }
}

export default App;

