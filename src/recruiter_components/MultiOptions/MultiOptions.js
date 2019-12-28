import React, { Component } from 'react';
import './MultiOptions.css';

class MultiOptions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ans:[],
      submitted:false
    };
  }

  render() {
    let marginTop=this.props.previousBySameSender?4:0;
    let obj=this.props.messageObj;
    return (<div>
      <div className={"direct-chat-msg msg_left row "+(this.props.messageBySender?"msg_right":"")}>
                        <div className={"direct-chat-info clearfix row "+
                        (this.props.messageBySender||this.props.previousBySameSender?"none":"")}> 
                        <span className="direct-chat-name pull-left">Demo 1</span> </div>
                        <div className="row"> 
                        {this.props.messageBySender?null:<img src={obj.photoUrl} alt="" className="direct-chat-img"/>}
                            <div className="p message"  style={{marginTop:marginTop}}
                            // data-toggle="tooltip" data-placement={this.props.messageBySender?"left":"right"} 
                            title={new Date(obj.timestamp).toLocaleString()}
                            > 
                                <span className="message_box">
                                <span className="">{obj.label}</span> 
                                {this.state.submitted?null:(<div>
                                {obj.options.map((opt,index)=>{
                                  let selected=(this.state.ans.indexOf(opt)>=0?true:false);
                                  return <div className="option-wrap" key={index}>
                                <div className={"comment-multioption bubble-animate "+
                                          (selected?"multioption-checked":" ")} 
                                        onClick={()=>this.selectOption(opt,selected)}
                                        >{opt}
                                    </div></div>
                                  }
                                )}
                                </div>
                                )}
                            </span>
                            {this.state.submitted?null:(<div className="multioption-submit-btn" 
                            onClick={()=>this.submitAnswer()}>Submit</div>)}
                            </div>
                        </div>
       </div>
    </div>);
  }

  selectOption(opt,selected){
    let ans=JSON.parse(JSON.stringify(this.state.ans));
    if(selected){
      let index=ans.indexOf(opt);
      ans.splice(index,1);
      console.log(this.state.ans, ans);
    }
    else
    ans.push(opt);
    this.setState({ans});
  }

  submitAnswer(){
    this.setState({submitted:true});
    if(this.props.jobQnAModeOn){
      this.props.submitJOBQNAResponse(this.state.ans.toString());
    }
    else
    this.props.submitMultipleChoiceAnswer(this.props.messageObj,this.state.ans.toString());
  }

}

export default MultiOptions;