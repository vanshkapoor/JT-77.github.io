import React, { Component } from 'react';
import CloseBtn from './Closebutton';
const $ =window.$;
class App extends Component {
  render() {
  return (
    <div id="team">
       
       <CloseBtn id="team"/> 
                
        <div className="modal-content">
        <div className="container">
            <div className="col-xs-12 col-md-14">
              <div className="row">
                <div className="col-xs-12 col-sm-4">
                  <div className="thumbnail card">
                      <div className="person_photo img-circle text-center">
                        <img src="assets/image/ahfaq.jpg"/>
                      </div>
                      <div className="person_testimonial tex-center">Ashfaq is a known consultant & trainer in the Recruitment Industry. He comes with an immense experience of training & consulting Agencies, Corporates & Startups in setting up recruiting strategies. He has trained & consulted more than 2000+ recruiters across India.</div>
                      <div className="hr">
                          <hr/> 
                      </div>
                      <div className="text-right">
                      <div className="person_name">Ashfaq Ahmed</div>
                      <div className="person_role">Founder</div>
                      </div>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-4">
                <div className="thumbnail card"> 
                      <div className="person_photo img-circle text-center">
                        <img src="assets/image/arpit.jpeg"/>
                      </div>
                      <div className="person_testimonial tex-center">FullStack Engineer who enjoys building products of scale & is a Polyglot.</div>
                      <div className="hr">
                          <hr/> 
                      </div>
                      <div className="text-right">
                      <div className="person_name">Arpit Sharma</div>
                      <div className="person_role">Full Stack Engineer</div>
                      </div>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-4">
                <div className="thumbnail card">
                      <div className="person_photo img-circle text-center">
                        <img src="assets/image/himanshu.jpeg"/>
                      </div>
                      <div className="person_testimonial tex-center">A JavaScript Magician who can code any JS & build anything on the UI. He loves building simple and user driven products on the FrontEnd. </div>
                      <div className="hr">
                          <hr/> 
                      </div>
                      <div className="text-right">
                      <div className="person_name">Himanshu Khosla</div>
                      <div className="person_role">Web Developer</div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>);
  }

  componentDidMount(){
      $("#modal-team").animatedModal({
        modalTarget:"team",  
        animatedIn:'zoomIn',
        animatedOut: 'bounceOut',
        color:'#fff'
    });
  }
}

export default App;
