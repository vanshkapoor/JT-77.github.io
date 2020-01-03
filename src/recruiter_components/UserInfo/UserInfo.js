import React, {Component} from 'react';
// import UpcomingTasks from './../RightPanels/UpcomingTasks';
import Feedback from './../RightPanels/Feedback';
// import ChatBlock from './../RightPanels/ChatBlock';
// import AboutJob from './../RightPanels/AboutJob';
import Demo from './../RightPanels/Demo';

class UserInfo extends Component{

  constructor(props){
    super(props);
    this.state={

    };
  }

  render(){
    return (
      <div className="current-chat-profile" style={{height:"calc(100vh - 100px)",overflowY:"auto"}}>
                    <div className="padd-lr-8">
                        <div className="visible-xs-inline pull-left none">
                        <a onClick={()=>{
                            this.props.setState({openInfoBox:false})
                            }} className="btn visible-xs-block" style={{color:"black"}}>
                    <i className="fa fa-times"></i></a>
                       </div>
                       <div className="row padd_8 no-mrg border-bottom hidden-xs">
                            <div className="pull-left">
                                <img src={this.props.userImage} alt=""
                                 className="img-responsive img-circle" style={{width:40,height:40,margin:5}}/>
                            </div>
                            <div className="info pull-left" style={{width:"calc(100% - 60px)"}}> 
                                <h5 className="blue cap black-span" style={{marginTop:18}} 
                                dangerouslySetInnerHTML={{__html:this.props.user}}
                                ></h5> 
                            </div>
                            </div>
                        <div>
                        {/* <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true" style={{paddingTop:10}}> */}
                            
                            {/* <Demo name="Home"/> */}
                        <ul className="nav-links">
                            
                            <li>
                                <a id="rec-feat" href="#feat-rec" className="row no-mrg">
                                    <div className="icon text-center"><i className="fa fa-briefcase"></i></div>
                                    <div className="title">Features - <i>Recruiters</i></div>
                                </a>
                            </li>
                            <li>
                                <a id="cand-feat" href="#feat-cand"  className="row no-mrg">
                                    <div className="icon text-center"><i className="fa fa-briefcase"></i></div>
                                    <div className="title">Features - <i>Candidates</i></div>
                                </a>
                            </li>
                            <li>
                                <a id="modal-team" href="#team" className="row no-mrg">
                                    <div className="icon text-center"><i className="fa fa-user"></i></div>
                                    <div className="title">About Team</div>
                                </a>
                            </li>
                            <li>
                                <a id="modal-price" href="#price" className="row no-mrg">
                                    <div className="icon text-center"><i className="fa fa-money"></i></div>
                                    <div className="title">Pricing</div>
                                </a>
                            </li>
                            <li>
                                <a id="modal-contact" href="#contact" className="row no-mrg">
                                    <div className="icon text-center"><i className="fa fa-phone"></i></div>
                                    <div className="title">Contact Us</div>
                                </a>
                            </li>
                        </ul>
                        <div className="border-bottom"></div>
                        <div className="contactus text-center padd_8">
                                  <h5 style={{fontSize:16}}>Follow Us On</h5>
                                    <div>
                                    <section>
                                        <div className="social_icons">

                                            <a href="https://facebook.com/FellowApp" className="social_icons--link social_icons--link-facebook" target="_blank">
                                            <svg className="social_icons--icon icon icon-facebook" fill="#3C5A99" 
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                <path d="M20.9,2H3.1C2.5,2,2,2.5,2,3.1v17.8C2,21.5,2.5,22,3.1,22h9.6v-7.7h-2.6v-3h2.6V9c0-2.6,1.6-4,3.9-4c1.1,0,2.1,0.1,2.3,0.1v2.7l-1.6,0c-1.3,0-1.5,0.6-1.5,1.5v1.9h3l-0.4,3h-2.6V22h5.1c0.6,0,1.1-0.5,1.1-1.1V3.1C22,2.5,21.5,2,20.9,2z"/>
                                            </svg>
                                            </a>

                                            <a href="https://twitter.Com/FellowAppCo" className="social_icons--link social_icons--link-twitter" target="_blank">
                                            <svg className="social_icons--icon icon icon-twitter" fill="#1DA1F2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                <path d="M7.9,20.9c8.3,0,12.8-6.9,12.8-12.8c0-0.2,0-0.4,0-0.6c0.9-0.6,1.6-1.4,2.3-2.3c-0.8,0.4-1.7,0.6-2.6,0.7c0.9-0.6,1.6-1.4,2-2.5c-0.9,0.5-1.8,0.9-2.9,1.1c-0.8-0.9-2-1.4-3.3-1.4c-2.5,0-4.5,2-4.5,4.5c0,0.4,0,0.7,0.1,1c-3.8-0.2-7.1-2-9.3-4.7C2.1,4.6,1.9,5.3,1.9,6.2c0,1.6,0.8,2.9,2,3.8c-0.7,0-1.4-0.2-2-0.6c0,0,0,0,0,0.1c0,2.2,1.6,4,3.6,4.4C5.1,13.9,4.7,14,4.3,14c-0.3,0-0.6,0-0.8-0.1C4,15.7,5.7,17,7.7,17C6.1,18.3,4.2,19,2.1,19c-0.4,0-0.7,0-1.1-0.1C3,20.2,5.4,20.9,7.9,20.9"/>
                                            </svg>
                                            </a>

                                            <a href="javascript:void(0)" className="social_icons--link social_icons--link-google_plus" target="_blank">
                                            <svg className="social_icons--icon icon icon-googleplus" fill="#DC4E41" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                <path d="M1,12C0.9,8.4,4,5.1,7.6,5c1.8-0.2,3.6,0.6,5,1.7c-0.6,0.6-1.2,1.2-1.8,1.8C9.7,7.8,8.2,7.3,6.7,7.8C4.4,8.4,3,11.2,3.9,13.4c0.7,2.4,3.6,3.7,5.8,2.7c1.2-0.4,1.9-1.5,2.3-2.6c-1.3,0-2.7,0-4,0c0-0.8,0-1.6,0-2.4c2.2,0,4.5,0,6.7,0c0.1,1.9-0.2,4-1.4,5.6c-1.7,2.2-4.9,2.9-7.5,2C3,17.7,0.9,14.9,1,12L1,12z"/>
                                                <path d="M19,9c0.7,0,1.3,0,2,0c0,0.7,0,1.3,0,2c0.7,0,1.3,0,2,0c0,0.7,0,1.3,0,2c-0.7,0-1.3,0-2,0c0,0.7,0,1.3,0,2c-0.7,0-1.3,0-2,0c0-0.7,0-1.3,0-2c-0.7,0-1.3,0-2,0c0-0.7,0-1.3,0-2c0.7,0,1.3,0,2,0C19,10.3,19,9.7,19,9z"/>
                                            </svg>
                                            </a>

                                            {/* <a href="#" className="social_icons--link social_icons--link-instagram" target="_blank">
                                            <svg className="social_icons--icon icon icon-instagram" fill="#D93175" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                <path d="M12,3.8c2.7,0,3,0,4,0.1c1,0,1.5,0.2,1.9,0.3C18.4,4.4,18.7,4.6,19,5c0.3,0.3,0.6,0.7,0.7,1.1C19.9,6.5,20.1,7,20.1,8c0,1.1,0.1,1.4,0.1,4s0,3-0.1,4c0,1-0.2,1.5-0.3,1.9c-0.2,0.5-0.4,0.8-0.7,1.1c-0.3,0.3-0.7,0.6-1.1,0.7c-0.4,0.1-0.9,0.3-1.9,0.3c-1.1,0-1.4,0.1-4,0.1s-3,0-4-0.1c-1,0-1.5-0.2-1.9-0.3C5.6,19.6,5.3,19.4,5,19c-0.3-0.3-0.6-0.7-0.7-1.1C4.1,17.5,3.9,17,3.9,16c0-1.1-0.1-1.4-0.1-4s0-3,0.1-4c0-1,0.2-1.5,0.3-1.9C4.4,5.6,4.6,5.3,5,5c0.3-0.3,0.7-0.6,1.1-0.7C6.5,4.1,7,3.9,8,3.9C9,3.8,9.3,3.8,12,3.8 M12,2C9.3,2,8.9,2,7.9,2.1c-1.1,0-1.8,0.2-2.4,0.5C4.8,2.8,4.2,3.1,3.7,3.7C3.1,4.2,2.8,4.8,2.5,5.4C2.3,6.1,2.1,6.8,2.1,7.9C2,8.9,2,9.3,2,12c0,2.7,0,3.1,0.1,4.1c0,1.1,0.2,1.8,0.5,2.4c0.3,0.7,0.6,1.2,1.2,1.8c0.6,0.6,1.1,0.9,1.8,1.2c0.6,0.2,1.4,0.4,2.4,0.5C8.9,22,9.3,22,12,22s3.1,0,4.1-0.1c1.1,0,1.8-0.2,2.4-0.5c0.7-0.3,1.2-0.6,1.8-1.2c0.6-0.6,0.9-1.1,1.2-1.8c0.2-0.6,0.4-1.4,0.5-2.4c0-1.1,0.1-1.4,0.1-4.1s0-3.1-0.1-4.1c0-1.1-0.2-1.8-0.5-2.4c-0.3-0.7-0.6-1.2-1.2-1.8c-0.6-0.6-1.1-0.9-1.8-1.2c-0.6-0.2-1.4-0.4-2.4-0.5C15.1,2,14.7,2,12,2L12,2z"/>
                                                <path d="M12,6.9c-2.8,0-5.1,2.3-5.1,5.1s2.3,5.1,5.1,5.1s5.1-2.3,5.1-5.1S14.8,6.9,12,6.9z M12,15.3c-1.8,0-3.3-1.5-3.3-3.3c0-1.8,1.5-3.3,3.3-3.3c1.8,0,3.3,1.5,3.3,3.3C15.3,13.8,13.8,15.3,12,15.3z"/>
                                                <circle cx="17.3" cy="6.7" r="1.2"/>
                                            </svg>
                                            </a> */}

                                            {/* <a href="javascript:void(0)" className="social_icons--link social_icons--link-youtube" target="_blank">
                                            <svg className="social_icons--icon icon icon-youtube" fill="#CD201F" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                <path d="M22.8,7.6c0,0-0.2-1.5-0.9-2.2c-0.8-0.9-1.8-0.9-2.2-0.9C16.6,4.3,12,4.3,12,4.3h0c0,0-4.6,0-7.7,0.2C3.9,4.5,2.9,4.5,2.1,5.4C1.4,6.1,1.2,7.6,1.2,7.6S1,9.4,1,11.2v1.7c0,1.8,0.2,3.6,0.2,3.6s0.2,1.5,0.9,2.2c0.8,0.9,1.9,0.8,2.4,0.9c1.8,0.2,7.5,0.2,7.5,0.2s4.6,0,7.7-0.2c0.4-0.1,1.4-0.1,2.2-0.9c0.7-0.7,0.9-2.2,0.9-2.2s0.2-1.8,0.2-3.6v-1.7C23,9.4,22.8,7.6,22.8,7.6z M9.7,14.9V8.7l5.9,3.1L9.7,14.9z"/>
                                            </svg>
                                            </a> */}

                                        </div>
                                        </section>
                                    </div>
                        </div>
                        
            </div>
                        {/* </div> */}
                    </div>
       </div>);
  }

}

export default UserInfo;