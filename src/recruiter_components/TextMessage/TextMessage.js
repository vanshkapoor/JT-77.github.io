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
    let marginTop=this.props.previousBySameSender?4:20;
    // ||this.props.previousBySameSender
    let obj=this.props.messageObj;
    let spanForBot=<span className="message"     
    data-toggle={this.props.messageBySender?"tooltip":""} 
   data-placement={this.props.messageBySender?"left":"right"} 
      title={new Date(obj.timestamp).toLocaleString()}
      dangerouslySetInnerHTML={{__html: obj.label||obj.message}}
      ></span>;
      let spanForUser=<span className="message"     
      data-toggle={this.props.messageBySender?"tooltip":""} 
     data-placement={this.props.messageBySender?"left":"right"} 
        title={new Date(obj.timestamp).toLocaleString()}
         >{obj.label||obj.message}</span>
    return (
      <div className={"direct-chat-msg msg_left row "+(this.props.messageBySender?"msg_right":"")} style={{marginTop:marginTop}}>
                        <div className={"direct-chat-info clearfix row "+
                        (this.props.messageBySender||this.props.previousBySameSender?"none":"")}> 
                        <span className="direct-chat-name pull-left">{this.props.currentChat?this.props.currentChat.title||this.props.currentChat.recName:""}</span> </div>
                        <div className="row"> 
                        {this.props.messageBySender?null:<img src={obj.photoUrl||"assets/image/user.png"} alt="" className="direct-chat-img"/>}
                            <div className="p" > 
                                <span className="message_box">
                                {this.props.messageBySender?spanForUser:spanForBot}
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