import React, {Component} from 'react';
import swal from 'sweetalert2';
class MessageInput extends Component{

  constructor(props){
    super(props);
    this.state={
        text:"",
        selectModeOn:false
    };
  }

  
  componentWillReceiveProps(nextProps){
    if(nextProps.isBotActive && nextProps.currentQuestion.element=="Select"){
      this.setState({selectModeOn:true});
    }
    else if(nextProps.isBotActive){
      this.setState({selectModeOn:false});
    }
  }

  componentDidUpdate(){
    if(this.props.isBotActive && this.props.currentQuestion.element=="Location"){

      let subLocationOptions={
        types:['(regions)'],
        componentRestrictions:{"country":"in"}
       }
       if(window.google)
       {  
        window.subLocationAutoComplete = new window.google.maps.places.Autocomplete(document.getElementById('chat-input'),subLocationOptions);
       } 
    }
  }

  render(){
    let element="",placeholder="Type Here ...";
    try{
      element=this.props.currentQuestion.element;
     if(this.props.currentQuestion.placeholder)
      placeholder=this.props.currentQuestion.placeholder; 
    }
    catch(e){element="Question";}
    
    let type="text";
    switch(element){
      case "Question":type="text";
      case "Email":type="text";break;
      case "Number":type="number";break;
      case "Date":type="date";break;
      case "Time":type="time";break;
    }
    return (<div>
        <div className="box-footer">
                {this.props.userInputActive?(<form onSubmit={(e)=>{
                  e.preventDefault();
                  this.sendMessage();
                }}>
                    {!this.state.selectModeOn?(<div className="input-group">
                        <input id="chat-input" 
                        type={type} 
                        name="message" 
                        placeholder={placeholder} className="form-control" value={this.state.text}
                        onChange={(e)=>this.setState({text:e.target.value})}
                        list="list"
                        autoFocus
                        autoComplete={this.props.isBotActive && this.props.currentQuestion.type=="suggestion"?"on":"off"}/> 
                        <span className="input-group-btn">
                        <button  type="submit" className="btn btn-primary btn-flat" 
                        style={{padding:"6px 10px",borderRadius:"2px 2px 2px 0px"}}
                        >Send</button>
                        </span>
                        {this.props.isBotActive && this.props.currentQuestion.options?(
                          <datalist id="list">
                          {this.props.currentQuestion.options.map((obj,index)=>{
                            return <option value={obj} key={index}/>
                          })}
                          </datalist>
                        ):null}
                         </div>):(
                           <div>
                           <select className="form-control" 
                           style={{width:"calc(100% - 40px)",float:"left"}} name="" id="" value={this.state.text}
                           onChange={(e)=>this.setState({text:e.target.value})}>
                           <option value="">{placeholder}</option>
                            {this.props.isBotActive && this.props.currentQuestion.options.map((obj,index)=>(<option value={obj} key={index}>{obj}</option>))}
                           </select>
                           <button type="submit" className="btn btn-default" style={{padding:"6px 10px"}}> <i className="fa fa-check"></i> </button> 
                           </div>
                         )}
                </form>):(
                  <div>
                    <a href="javascript:void(0)" className="input-cover">You'll type here shortly</a>
                  </div>
                )}
            </div>
    </div>);
  }

  sendMessage(){
    let obj={
      label:this.state.text, 
      sender:this.props.currentCandidate.candidateEmail,
      // atob(localStorage.getItem("token")).split(":")[0],
      photoUrl:this.props.currentCandidate.image||"",
      element:"Statement",
      mediaUrl:"",      
      timestamp:Date.now(),
      "status":"unseen"
    }

    if(!this.state.text&&!document.getElementById("chat-input").value){
      if(this.props.currentQuestion.required||this.props.isBotActive){
        swal("Found Empty!","Input Cannot Be Empty","error");
        return;
      }
      else {
        this.state.text="-"
      }
    }
    
    if(this.props.isBotActive)
    { if(this.props.userInputActive
      &&(this.props.currentQuestion.element=="Question"||this.props.currentQuestion.element=="Number"
      ||this.props.currentQuestion.element==="Email"||this.props.currentQuestion.element=="Location"
      ||this.props.currentQuestion.element==="PhoneNumber"||this.props.currentQuestion.element=="Select"
      ||this.props.currentQuestion.element==="Date"||this.props.currentQuestion.element=="Time"))
      {
        if(this.props.jobQnAModeOn){
          this.props.submitJOBQNAResponse(this.state.text);
          return ;
        }

        if(this.props.nextQuestion.type!="text")
          this.props.disableUserInput();
      
        if(this.props.currentQuestion.element=="Question"||this.props.currentQuestion.element=="Suggest"){
          this.props.submitQuestionInputAnswer(this.props.currentQuestion,this.state.text);
        }
        else if(this.props.currentQuestion.element=="Email"){
          this.props.submitEmailInputAnswer(this.props.currentQuestion,this.state.text);
        }
        else if(this.props.currentQuestion.element=="Number"){
          this.props.submitNumberInputAnswer(this.props.currentQuestion,this.state.text);
        }
        
        else if(this.props.currentQuestion.element=="PhoneNumber"){
          this.props.submitPhoneNumberInputAnswer(this.props.currentQuestion,this.state.text);
        }
        else if(this.props.currentQuestion.element=="Location"){
          this.state.text=document.getElementById("chat-input").value;
          this.props.submitLocationInputAnswer(this.props.currentQuestion,this.state.text);
        }
        else if(this.props.currentQuestion.element=="Select"){
          this.props.submitSelectInputAnswer(this.props.currentQuestion,this.state.text);
        }

      }
    } 
    else
    {
    if(this.props.currentChat && this.props.currentChat.domain && this.props.currentChat.chatID)  
     try{ 
    let db=this.props.firebase.database();
    let messagesRef=db.ref(this.props.currentChat.domain+"/messages/"+this.props.currentChat.chatID);
    let chatRef=db.ref(this.props.currentChat.domain+"/chats/"+this.props.currentChat.chatID);
    messagesRef.push(obj);
    chatRef.child('lastmessage').set(obj);
     }
     catch(e){
       console.log(e);
       alert("Error sending message");
     }
    }  
    this.setState({text:""}); 
  }

  componentWillUpdate(){
    // console.log("message input",this.props);
  }

}

export default MessageInput;