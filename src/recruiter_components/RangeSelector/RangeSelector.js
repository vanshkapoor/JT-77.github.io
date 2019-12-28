import React, {Component} from 'react';
import './RangeSelector.css';

class RangeSelector extends Component{

  constructor(props){
    super(props);
    this.state={
      val:0,
      submitted:false
    };
  }

  render(){
    let marginTop=this.props.previousBySameSender?4:0;
    let obj=this.props.messageObj;
    return (
      <div className={"direct-chat-msg msg_left row "+(this.props.messageBySender?"msg_right":"")}>
                        <div className={"direct-chat-info clearfix row "+
                        (this.props.messageBySender||this.props.previousBySameSender?"none":"")}> 
                        <span className="direct-chat-name pull-left">Fellow Bot</span> </div>
                        <div className="row"> 
                        {this.props.messageBySender?null:<img src={this.props.botimage} alt="" className="direct-chat-img"/>}
                            <div className="p message"  style={{marginTop:marginTop}}
                            // data-toggle="tooltip" 
                            data-placement={this.props.messageBySender?"left":"right"} 
                            title={new Date(obj.timestamp).toLocaleString()}
                            > 
                                <span className="message_box">
                                <span className="">{obj.label}</span> 
                                {this.state.submitted?null:(<div className="option-wrap">
                                <div><input type="range" min={obj.min} max={obj.max} step={obj.step}
                                onChange={(e)=>{this.setState({val:e.target.value})}}
                                defaultValue={this.props.val}
                                /></div>
                                <div className="range-val text-center">{this.state.val}</div>
                                </div>)}
                            </span>
                            {this.state.submitted?null:(<div className="multioption-submit-btn"
                            onClick={()=>this.submitRange()}
                            >Submit</div>)}
                            </div>
                        </div>
       </div>);
  }

    submitRange(){
      if(this.props.jobQnAModeOn){
        this.props.submitJOBQNAResponse(this.state.val);
      }
      else
      this.props.submitRangeSelectAnswer(this.props.messageObj,this.state.val);
      this.setState({submitted:true});
    }

}

export default RangeSelector;