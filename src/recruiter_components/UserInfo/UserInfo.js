import React, {Component} from 'react';
// import UpcomingTasks from './../RightPanels/UpcomingTasks';
// import ChatBlock from './../RightPanels/ChatBlock';
// import AboutJob from './../RightPanels/AboutJob';
import Feedback from './../RightPanels/Feedback';
import ChatBlock from './../RightPanels/ChatBlock';
import AboutJob from './../RightPanels/AboutJob';

class UserInfo extends Component{

  constructor(props){
    super(props);
    this.state={

    };
  }

  render(){
      let title=(this.props.currentChat.title||this.props.currentChat.recName);
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
                                <img src={this.props.currentChat.lastmessage?this.props.currentChat.lastmessage.photoUrl||"assets/image/user.png":"assets/image/user.png"} alt=""
                                 className="img-responsive img-circle" style={{width:40,height:40,margin:5}}/>
                            </div>
                            <div className="info pull-left" style={{width:"calc(100% - 60px)"}}> 
                                <h5 className="blue cap black-span" style={{marginTop:18}} 
                                dangerouslySetInnerHTML={{__html:title}}
                                ></h5> 
                            </div>
                            </div>
                        <div>
                        <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true" style={{paddingTop:10}}>
                            
                        {/* <ul className="nav-links">
                            
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
                        </ul> */}
                            {this.props.isBotActive?null:
                            <ChatBlock 
                                currentCandidate={this.props.currentCandidate}
                                currentJob={this.props.currentJob}
                                currentRecruiter={this.props.currentRecruiter}
                                id="2"
                            />}
                            
                            {this.props.currentJob.jobID==this.props.currentChat.jobId||this.props.isBotActive?
                            <AboutJob id="3"
                                currentCandidate={this.props.currentCandidate}
                                currentJob={this.props.currentJob}
                                currentRecruiter={this.props.currentRecruiter}
                            />:null}
                            {this.props.isBotActive?null:<Feedback id="4"
                                currentCandidate={this.props.currentCandidate}
                                currentJob={this.props.currentJob}
                                currentRecruiter={this.props.currentRecruiter}
                            />}
                            {/* <UpcomingTasks id="1"/> */}
                            </div>
                        <div className="border-bottom"></div>
                        <div className="contactus text-center padd_8">
                                  <h5 style={{fontSize:16}}>Follow Us On</h5>
                                    <div>
                                    <section>
                                      <SocialLinks/>
                                        </section>
                                    </div>
                        </div>
                        
            </div>
                        {/* </div> */}
                    </div>
       </div>);
  }

}

const SocialLinks= ()=>(  <div className="social_icons">

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

</div>)


export default UserInfo;