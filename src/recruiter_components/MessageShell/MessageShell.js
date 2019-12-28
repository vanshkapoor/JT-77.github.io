import React, {Component} from 'react';
import './MessageShell.css';
import TextMessage from '../TextMessage/TextMessage';
import UserInfo from '../UserInfo/UserInfo';
import MessageList from './../MessageList/MessageList';
import MessageInput from './MessageInput';
import URL from './../utils/apis';
import swal from 'sweetalert2';
import {emailValidationCheker,phoneNumberValidationCheck} from './../utils/helper';
const $=window.$;


window.Stack=function(){
    this.arr=[];
}
window.Stack.prototype.push=function(elem){
    if(this.arr.length>0)
    this.arr.unshift(elem);
}
window.Stack.prototype.pop=function(){
    this.arr.splice(0,1);
}
window.Stack.prototype.length=function(){
    return this.arr.length;
}
window.Stack.prototype.peek=function(){
    return this.arr[0];
}
   


class MessageShell extends Component{

  constructor(props){
    super(props);
    this.state={
        openInfoBox:$(window).width()<=768?false:true,
        messages:[],
        userInputActive:true,
        // currentChatId:"",
        userImage:"fellowbot.png",
        botimage:"fellowbot.png",
        currentChat:{},
        count:15,
        userObj:{}
    };
  }

  componentWillReceiveProps(nextProps){
    
    if(this.state.currentChat.chatID!=nextProps.currentChat.chatID){
        this.removeListeners();
        this.setState({
            // currentChatId:nextProps.currentChat.chatID,
            currentChat:nextProps.currentChat,
            messages:[],
            },
        ()=>{
            this.addListeners(nextProps.currentChat.chatID)
        }) ;         
    }
  }
   
   sendPushNotification(message){
    $.ajax({
        type:"post",
        url: "https://fcm.googleapis.com/fcm/send",
        "contentType": "application/json",
        "headers":{"Authorization": "key= AIzaSyCBDMoaerPNiSnd0-seI4KADSVujkCWi3A"},
        data:JSON.stringify({
          "notification": {
            "title":this.props.currentChat.title,
            "body":message,
            "icon": "assets/image/user.png",
            "click_action":window.origin
          },
          "to":"dt1lDq_tSds:APA91bGqnfjSqxH4B3G6E44o1-oEntan8f0CaZ6AiBPfj1Rg9R3ODnwxiK-hmL_-C5uoMpspElQ7doM0_KWrx7AeK996NSjnaeKbPTEDC8EPsc-WtTTzNGiqZQmzWeT_l2-geN1HTTqY"
        })
        }).done((data)=>{
            console.log((data));
        }).fail((e,ee,xhr)=>{
               console.log(xhr);
        }); 
   } 

   appendList(obj){
    let messages=JSON.parse(JSON.stringify(this.state.messages));
    messages.push(obj);
    this.setState({messages:messages});
  }
  
  updateList(obj,index) {
    let messages=JSON.parse(JSON.stringify(this.state.messages));
    messages[index]=obj;
    this.setState({messages:messages});
  };


   addListeners(chatId){
    if(!chatId)return ;
    let db=this.props.firebase.database();
    let messageRef=db.ref(this.props.currentChat.domain+"/messages/"+chatId);
    // let messageRef=db.ref("vlsconsulting/messages/Botags9mJRlsEWIA9KV");
    this.removeListeners();

    messageRef.limitToLast(this.state.count).on('value',
       (snapshot)=>{
           let data=snapshot.val();
           let arr=[];
           for(var x in data)
           arr.push(data[x])
           
            if(!document.hasFocus()&&x==this.state.count-1)
                this.sendPushNotification(data.message);  
            console.log(arr);
            this.setState({messages:arr});
           
            // console.log(snapshot.val());  
            // // attach add listener
            // let redundantCounter=0;
            // messageRef.limitToLast(5).on('child_added',
            // (snapshot)=>{
            //     if(redundantCounter==0)return;
            //     ++redundantCounter;
            //     console.log(redundantCounter);
            //     let data=snapshot.val();
            //     if(!document.hasFocus())
            //         this.sendPushNotification(data.message);             
            //     console.log("child added",data)
            //     this.appendList(data)});
       });
    //   messageRef.limitToLast(this.state.count).on('child_changed', setMessage);
   }

   removeListeners(){
     if(!this.state.currentChat.chatID) return;  
     let db=this.props.firebase.database();
     db.ref(this.state.currentChat.domain+"/messages/"+this.state.currentChat.chatID).off();
   }

      
  render(){
    return (
    <div className="current-chat">
      <div className="text-center header">
                
                <div className="blue pull-right" style={{paddingTop:5}}>
                    <a onClick={()=>{this.setState({openInfoBox:!this.state.openInfoBox})}}>
                    <i className="fa fa-info-circle"></i></a>
                </div>
                <div  style={{margin:"-5px 0 0px -5px"}} className="visible-xs-inline pull-left">
                    <img src="assets/image/left-arrow.png" style={{width:25,height:25,padding:"5px !important",color:"black"}} 
                    onClick={()=>{
                        if(this.state.openInfoBox)
                        this.setState({openInfoBox:!this.state.openInfoBox})
                        else // if(this.props.isDeviceMobile)
                            this.props.updateCurrentChat({})
                        }} className="btn visible-xs-inline-block"/>
                    {/* <i className="fa fa-arrow-left"></i> */}
                    <img src={this.props.currentChat.lastmessage?this.props.currentChat.lastmessage.photoUrl||"assets/image/user.png":"assets/image/user.png"} alt="User" className="direct-chat-img" 
                        style={{width:45,height:45,marginTop:2}}/>
                </div>
                <h6 className="text-cap" dangerouslySetInnerHTML={{__html:this.props.currentChat.recName||"Guest"}}></h6>
                <p className="grey_col" style={{fontSize:12}}> <i className="fa fa-circle" style={{fontSize:12,color:"#0778BD"}}></i> Active now</p>
      </div>
     <div className={"paddinglr10 row "+(this.state.openInfoBox?"open-info":"")}>
                  
        <div className="direct-chat box-warning  direct-chat-warning" >
            <div className="box-body" id="messages-list">
                <div className="direct-chat-messages" style={{height:'calc(100vh - 155px'}} 
                id="messages-list-cont">
                    
                    <MessageList 
                    currentChat={this.props.currentChat}
    currentRecruiter={this.props.currentRecruiter}
    isBotActive={this.props.isBotActive}
                    firebase={this.props.firebase}
                    currentCandidate={this.props.currentCandidate}
                    currentJob={this.props.currentJob}
                    messages={this.state.messages}
                    botimage={this.props.botimage}
                    // currentQuestion={this.state.currentQuestion}
                    userInputActive={this.state.userInputActive}
                    />
                    
                </div>
            
             <MessageInput 
             currentChat={this.props.currentChat}
             isBotActive={this.props.isBotActive}
    currentRecruiter={this.props.currentRecruiter}
    firebase={this.props.firebase}
             currentCandidate={this.props.currentCandidate}
             currentJob={this.props.currentJob}
             userInputActive={this.state.userInputActive}
             currentChatId={this.props.currentChat.chatID}/> 
            </div>                  
        </div>
       
        <div>   
           <UserInfo setState={(obj)=>this.setState(obj)}
             currentChat={this.props.currentChat}
             isBotActive={this.props.isBotActive}
    currentRecruiter={this.props.currentRecruiter}
    currentCandidate={this.props.currentCandidate}
             currentJob={this.props.currentJob}
            isDeviceMobile={this.props.isDeviceMobile}
            updateCurrentChat={this.props.updateCurrentChat}/>
        </div>     
        
        </div>
    </div>);
  }

  componentDidUpdate(){
      $("#messages-list-cont").scrollTop($("#messages-list-cont2").height());
      console.log("message shell",this.state)
  }
   
  componentDidMount(){
      this.addListeners(this.props.currentChat.chatID)
  }


}

export default MessageShell;    