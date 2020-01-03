import React, { Component } from 'react';
import CloseBtn from './Closebutton';
const $ =window.$;
class App extends Component {
  render() {
  return (
    <div id="contact">
        
        <CloseBtn id="contact"/> 
                
        <div className="modal-content">
        <div className="container">
            <div className="col-xs-12">
              <div className="row" style={{paddingTop:25}}>
                <div className="col-xs-6 hidden-xs circle-cont">
                  <div className="circle">Contact <br/> Us:</div>
                </div>
                <div className="visible-xs-block hidden-sm">
                <h2 className="text-center">Contact Us:</h2>
                </div>
                <div className="col-xs-12 col-sm-6 no-padd">
                  <div className="thumbnail card">
                      <div className="person_photo text-center">
                        {/* <img src="assets/image/ahfaq.jpg"/> */}
                      </div>
                      <div className="product-heading text-center">Ashfaq Ahmed</div>
                      <hr/>
                      <div className="row no-mrg person_testimonial text-center">
                      <div className="col-xs-12 no-padd">
                      <div className="row" style={{padding:"20px 0px"}}>
                      <div className="col-xs-2"><i className="fa fa-envelope"></i></div> 
                      <div className="col-xs-10 text-right"> ashfaq@fellowapp.co </div></div>
                      <div className="row" style={{padding:"20px 0px"}}>
                      <div className="col-xs-2"><i className="fa fa-mobile-phone"></i></div>
                      <div className="col-xs-10 text-right"> +91-956-601-7151</div></div>
                      </div></div>
                  </div>
                </div>
          </div>
         </div>
        </div>
      </div>
    </div>);
  }

  componentDidMount(){
      $("#modal-contact").animatedModal({
        modalTarget:"contact",  
        animatedIn:'zoomIn',
        animatedOut: 'bounceOut',
        color:'#fff'
    });
  }
}

export default App;
