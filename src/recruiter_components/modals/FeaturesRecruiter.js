import React, { Component } from 'react';
import CloseBtn from './Closebutton';
const $ =window.$;
class App extends Component {
  render() {
  return (
    <div id="feat-rec">
        <CloseBtn id="feat-rec"/>              
        <div className="modal-content">
          <div className="container">
            <div className="col-xs-12">
              <div className="row" style={{paddingTop:25}}>
                <div className="col-xs-12 col-sm-4">
                  <div className="thumbnail card">
                      <div className="person_photo text-center">
                        <img src="fellowbot.png"/>
                      </div>
                      <div className="product-heading text-center">Hiring Assistants</div>
                      <div className="person_testimonial tex-center"> Create your own hiring assistants who will engage with candidates and shortlist based on your hiring criterias. </div>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-4">
                <div className="thumbnail card">
                      <div className="person_photo text-center">
                        <img src="assets/image/chats.jpg"/>
                      </div>
                      <div className="product-heading text-center">Chat with Candidates</div>
                      <div className="person_testimonial tex-center">For the first time ever, Live Chat between Recruiters - Candidates. You can call only one at a time but you can chat with many.</div>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-4">
                <div className="thumbnail card">
                      <div className="person_photo text-center">
                        <img src="others.jpg" className="rt-90 img-cicle"/>
                      </div>
                      <div className="product-heading text-center">More Features</div>
                      <div className="person_testimonial tex-center"> - Followup Automation <br/> - Interview Remonders <br/> - Manage E2E flow <br/> - etc </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>);
  }

  componentDidMount(){
      $("#rec-feat").animatedModal({
        modalTarget:"feat-rec",  
        animatedIn:'zoomIn',
        animatedOut: 'bounceOut',
        color:'#fff'
    });
  }
}

export default App;
