import React, { Component } from 'react';
import './SingleOption.css';
const $=window.$;
class SingleOption extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedAnswer:""
    };
  }

  render() {
    
    let marginTop=this.props.previousBySameSender=="true"?4:0;
    let obj=this.props.messageObj;
    return (<div>
      <div className={"direct-chat-msg msg_left row "+(this.props.messageBySender=="true"?"msg_right":"")}>
                        <div className={"direct-chat-info clearfix row "+
                        (this.props.messageBySender=="true"||this.props.previousBySameSender=="true"?"none":"")}> 
                        <span className="direct-chat-name pull-left">Fellow Bot</span> </div>
                        <div className="row"> 
                        {this.props.messageBySender=="true"?null:<img src={this.props.botimage} alt="" className="direct-chat-img"/>}
                            <div className="p message"  style={{marginTop:marginTop}}
                            // data-toggle="tooltip" 
                            // data-placement={this.props.messageBySender=="true"?"left":"right"} 
                            title={new Date(obj.timestamp).toLocaleString()}
                            > 
                                <span className="message_box">
                                <span className="" 
                                dangerouslySetInnerHTML={{__html:obj.label}}
                                ></span> 
                                {this.state.selectedAnswer?null:(<div className="option-wrap">
                                {
                                obj.options.map((opt,index)=>{
                                 return <div key={index}><div className={"comment-option bubble-animate "+
                                 (this.state.selectedAnswer==opt?"select":"no-select")}
                                  
                                 onClick={()=>this.selectMessage(opt)}
                                 dangerouslySetInnerHTML={{__html:opt}}></div></div> 
                                })  
                                }
                                </div>)}
                                
                            </span>
                            </div>
                        </div>
       </div>
    </div>);
    
  }

  selectMessage(opt){
    this.setState({selectedAnswer:opt});
    if(this.props.booleanathonInitated){
      this.props.submitBooleanResponse({label:opt,
      question:this.props.messageObj});
    }
    else
    this.props.submitSingleChoiceAnswer(this.props.messageObj,opt);
  }

}

export default SingleOption;