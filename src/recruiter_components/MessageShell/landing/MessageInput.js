import React, {Component} from 'react';
import swal from 'sweetalert';
class MessageInput extends Component{

  constructor(props){
    super(props);
    this.state={
        text:""
    };
  }

  render(){
    return (<div>
        <div className="box-footer">
                {this.props.userInputActive?(<form onSubmit={(e)=>{
                  e.preventDefault();
                  this.sendMessage();
                }}>
                    <div className="input-group">
                        <input id="chat-input" type="text" name="message" 
                        placeholder="Type Here ..." className="form-control" value={this.state.text}
                        onChange={(e)=>this.setState({text:e.target.value})}
                        list="list"
                        autoComplete={this.props.currentQuestion.type=="suggestion"?"on":"off"}/> 
                        <span className="input-group-btn">
                        <button  type="submit" className="btn btn-primary btn-flat" 
                        style={{padding:"6px 10px",borderRadius:"2px 2px 2px 0px"}}
                        >Send</button>
                        </span>
                        {this.props.currentQuestion.tags?(
                          <datalist id="list">
                          {this.props.currentQuestion.tags.map((obj,index)=>{
                            return <option value={obj} key={index}/>
                          })}
                          </datalist>
                        ):null}
                         </div>
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
      user:this.props.user,
      photoUrl:"",
      element:"Statement",      
      timestamp:Date.now()
    }
    if(!this.state.text){
      if(this.props.currentQuestion.required){
        swal("Found Empty!","Input Cannot Be Empty","error");
        return;
      }
      else {
        this.state.text="-"
      }
    }
    if(this.props.booleanathonInitated){
      this.props.submitBooleanResponse(this.state.text);
    }
    else if(this.props.userInputActive
      &&(this.props.currentQuestion.type=="text"||this.props.currentQuestion.type=="suggestion")){
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
    }
    this.setState({text:""}); 
  }
}
export default MessageInput;