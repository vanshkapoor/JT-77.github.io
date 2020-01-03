import React, {Component} from 'react';
import './MessageList.css';
import TextMessage from '../TextMessage/TextMessage';
import SingleOption from '../SingleOption/SingleOption';
import MultiOptions from '../MultiOptions/MultiOptions';
import RangeSelector from '../RangeSelector/RangeSelector';
import FeedBack from '../Feedback/Feedback';
import TyingIndicator from '../TypingIndicator/TypingIndicator';
// import DatePicker from '../DatePicker/DatePicker';
// import TimePicker from '../TimePicker/TimePicker';
// import NumberInput from '../NumberInput/NumberInput';

const $=window.$;

const ChatDate=(props)=>{return (
    <div className="direct-chat-msg msg_left row" style={{padding:15}}>
    <div className="chat-date text-center"> 
        <p> {new Date().toLocaleDateString()}</p>
    </div>
    </div>
);}

class MessageList extends Component{

  constructor(props){
    super(props);
    this.state={

    };
  }

  render(){
    let previousSender="";
    return (<div 
    id="messages-list-cont2"
    >
                    <ChatDate/>
                   {this.props.messages.map((obj,index)=>
                   { let messageBySender=(obj.user!=undefined);
                     let previousBySameSender=(previousSender==obj.user);
                     previousSender=obj.user;
                    
                     if(index==0){
                       previousBySameSender="false";
                     }

                     return this.returnMessageElement(obj,messageBySender.toString(),
                     previousBySameSender.toString(),index,this.props.botimage,this.props)}
                   )}
    </div>);
  }


  returnMessageElement(obj,messageBySender,previousBySameSender,index,botimage,props){
    // console.log(obj.element,messageBySender,previousBySameSender);
    switch(obj.element){
      case "Single Choice":return <SingleOption messageObj={obj} 
                    submitSingleChoiceAnswer={this.props.submitSingleChoiceAnswer}
                                    messageBySender={messageBySender}  
                                    botimage={botimage}
                                    {...props}
                                    previousBySameSender={previousBySameSender} key={index}
                                    />;

      case "Statement":return <TextMessage messageObj={obj} 
                                messageBySender={messageBySender} 
                                botimage={botimage}
                                previousBySameSender={previousBySameSender} key={index}/>;

      case "Question":return <TextMessage messageObj={obj}
                                        messageBySender={messageBySender} botimage={botimage} 
                                        previousBySameSender={previousBySameSender} key={index}/>;

      case "Multi Choice":return <MultiOptions messageObj={obj}   
                  submitMultipleChoiceAnswer={this.props.submitMultipleChoiceAnswer}       
                              messageBySender={messageBySender}        botimage={botimage}
                               previousBySameSender={previousBySameSender} key={index}/>;

      case "Email":return <TextMessage messageObj={obj}            
                            messageBySender={messageBySender}      botimage={botimage}
                        previousBySameSender={previousBySameSender} key={index}/>;

      case "Suggest":return <TextMessage messageObj={obj}              
                          messageBySender={messageBySender}         botimage={botimage}
                   previousBySameSender={previousBySameSender} key={index}/>;

      case "Range":return <RangeSelector messageObj={obj}  
      submitRangeSelectAnswer={this.props.submitRangeSelectAnswer}          
                            messageBySender={messageBySender}   botimage={botimage}
                           previousBySameSender={previousBySameSender} key={index}/>;

      case "Contact":return <TextMessage messageObj={obj}       
                                messageBySender={messageBySender}   botimage={botimage} 
                               previousBySameSender={previousBySameSender} key={index}/>;

      case "Number":return <TextMessage messageObj={obj}           
                             messageBySender={messageBySender}      botimage={botimage}    
                     previousBySameSender={previousBySameSender} key={index}/>;

      case "Rating":return <TextMessage messageObj={obj}               
                         messageBySender={messageBySender}     botimage={botimage}         
             previousBySameSender={previousBySameSender} key={index}/>;

      case "Date Picker":return <TextMessage messageObj={obj}           
                             messageBySender={messageBySender}       botimage={botimage}  
                      previousBySameSender={previousBySameSender} key={index}/>;

      case "Links":return <TextMessage messageObj={obj}               
                         messageBySender={messageBySender}      botimage={botimage}      
               previousBySameSend er={previousBySameSender} key={index}/>;
      default:return null;
    }
  }

  componentDidMount(){
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    })
  }

}

export default MessageList;