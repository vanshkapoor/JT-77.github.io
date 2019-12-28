import React, {Component} from 'react';

class ChatListBox extends Component{

  constructor(props){
    super(props);
    this.state={

    };
  }

  render(){
    let chat=this.props.chat;
    let date =new Date(chat.lastmessage.timestamp);
    var time =date.getHours()+":"+date.getMinutes();
    return (<div>
        
        <div className={"recent-chat-box row no-mrg "+this.props.chatStatus} 
          onClick={()=>this.props.updateCurrentChat(chat)}>
                           <img src={chat.lastmessage.photoUrl||"assets/image/user.png"} className="img-responsive img-circle" alt=""/>
                           <div className="recent-chat-message">
                               <h6>{chat.title||chat.recName}</h6>
                               <p>
                                 {/* <i className="fa fa-check"></i> */}
                               {chat.lastmessage.label||""}</p>
                           </div>
                           <div className="recent-chat-time">
                               <span className="time">{time!="NaN:NaN"?time:""}</span>
                               <span className="readAll"><i className="fa fa-cog"></i></span>
                           </div>
         </div>
    </div>);
  }

}

export default ChatListBox;