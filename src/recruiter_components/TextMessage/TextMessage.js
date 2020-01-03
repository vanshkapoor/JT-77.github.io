import React, {Component} from 'react';
import './TextMessage.css';
const $=window.$;
class TextMessage extends Component{

  constructor(props){
    super(props);
    this.state={

    };
  }

  render(){
    let marginTop=this.props.previousBySameSender=="true"?4:20;
    // ||this.props.previousBySameSender=="true"
    let obj=this.props.messageObj;
    let spanForBot=<span className="message"     
    data-toggle={this.props.messageBySender=="true"?"tooltip":""} 
   data-placement={this.props.messageBySender=="true"?"left":"right"} 
      title={new Date(obj.timestamp).toLocaleString()}
      dangerouslySetInnerHTML={{__html: obj.label}}
      ></span>;
      let spanForUser=<span className="message"     
      data-toggle={this.props.messageBySender=="true"?"tooltip":""} 
     data-placement={this.props.messageBySender=="true"?"left":"right"} 
        title={new Date(obj.timestamp).toLocaleString()}
         >{obj.label}</span>
    return (
      <div className={"direct-chat-msg msg_left row "+(this.props.messageBySender=="true"?"msg_right":"")} style={{marginTop:marginTop}}>
                        <div className={"direct-chat-info clearfix row "+
                        (this.props.messageBySender=="true"||this.props.previousBySameSender=="true"?"none":"")}> 
                        <span className="direct-chat-name pull-left">Fellow Bot</span> </div>
                        <div className="row"> 
                        {this.props.messageBySender=="true"?null:<img src={this.props.botimage} alt="" className="direct-chat-img"/>}
                            <div className="p" > 
                                <span className="message_box">
                                {this.props.messageBySender=="true"?spanForUser:spanForBot}
                                </span>
                            </div>
                        </div>
       </div>);
  }

  componentDidMount(){
    
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    })
  }

}

export default TextMessage;