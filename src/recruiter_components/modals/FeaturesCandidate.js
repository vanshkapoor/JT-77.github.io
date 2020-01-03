import React, { Component } from 'react';
import CloseBtn from './Closebutton';
const $ =window.$;
class App extends Component {
  render() {
  return (
    <div id="feat-cand">
        
        <CloseBtn id="feat-cand"/> 
                
        <div className="modal-content">
        <div className="container">
            <div className="col-xs-12">
              <div className="row" style={{paddingTop:25}}>
                <div className="col-xs-12 col-sm-4">
                  <div className="thumbnail card">
                      <div className="person_photo text-center">
                        <img src="assets/image/dead.jpeg"/>
                      </div>
                      <div className="product-heading text-center">No Dead Job Ads</div>
                      <div className="person_testimonial tex-center">No more dead job ads, Interact with a BOT to understand your basic fitment and also to know about the company and role. </div>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-4">
                <div className="thumbnail card">
                      <div className="person_photo text-center">
                        <img src="assets/image/chats.jpg"/>
                      </div>
                      <div className="product-heading text-center">Chat with Recruiters</div>
                      <div className="person_testimonial tex-center">Live one on one chat with Recruiters. Deal with live SPOCs than dead job ads.</div>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-4">
                <div className="thumbnail card">
                      <div className="person_photo text-center bg-blue">
                        <img src="others.jpg" className="rt-90 img-cicle"/>
                      </div>
                      <div className="product-heading text-center">Others</div>
                      <div className="person_testimonial tex-center">Quick interview Reminders, Rate your interview/Recruiter/Interviewer after interview and much more. We keep adding more Candidate Centric Features every month.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>);
  }

  componentDidMount(){
      $("#cand-feat").animatedModal({
        modalTarget:"feat-cand",  
        animatedIn:'zoomIn',
        animatedOut: 'bounceOut',
        color:'#fff'
    });
  }
}

export default App;
