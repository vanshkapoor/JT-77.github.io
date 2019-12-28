import React, {Component} from 'react';
import './MessageList.css';
import TextMessage from '../TextMessage/TextMessage';
import SingleOption from '../SingleOption/SingleOption';
import MultiOptions from '../MultiOptions/MultiOptions';
import RangeSelector from '../RangeSelector/RangeSelector';
import FeedBack from '../Feedback/Feedback';
import TyingIndicator from '../TypingIndicator/TypingIndicator';
const $=window.$;

const ChatDate=(props)=>{return (
    <div className="direct-chat-msg msg_left row" style={{padding:15}}>
    <div className="chat-date text-center"> 
        <p> {new Date().toLocaleDateString()}</p>
    </div>
    </div>
);}

class MessageList extends Component{



  render(){
    let previousSender="";
    return (<div 
  
      id="messages-list-cont2">
      
                    <ChatDate/>
                   {this.props.messages.map((obj,index)=>
                   { if(!obj.sender)obj.sender="";
                     if(!this.props.currentCandidate.candidateEmail)
                     this.props.currentCandidate.candidateEmail="";
                     let messageBySender=(obj.sender.trim()==this.props.currentCandidate.candidateEmail.trim());
                     let previousBySameSender=(previousSender==obj.sender.trim());
                     previousSender=obj.sender.trim();
                    //  console.log(obj,messageBySender,previousBySameSender,previousSender)
                     if(index==0){
                        previousBySameSender=false;
                     }
                     if(!messageBySender && this.props.isBotActive)
                       obj.photoUrl="fellowbot.png";
                     return this.returnMessageElement(obj,messageBySender,
                     previousBySameSender,index,this.props)}
                   )}
    </div>);
  }

  
  returnMessageElement(obj,messageBySender,previousBySameSender,index,props){
    // console.log(obj.element,messageBySender,previousBySameSender);
    switch(obj.element){
      case "Single Choice":return <SingleOption messageObj={obj} 
                                    submitSingleChoiceAnswer={this.props.submitSingleChoiceAnswer}
                                    messageBySender={messageBySender}   
                                    {...props}
                                    previousBySameSender={previousBySameSender} key={index}
                                    />;

      case "Statement":return <TextMessage messageObj={obj} 
                                messageBySender={messageBySender} 
                                previousBySameSender={previousBySameSender} key={index}/>;

      case "Question":return <TextMessage messageObj={obj}
                                        messageBySender={messageBySender}  
                                        previousBySameSender={previousBySameSender} key={index}/>;

      case "Multi Choice":return <MultiOptions messageObj={obj}   
                  submitMultipleChoiceAnswer={this.props.submitMultipleChoiceAnswer}       
                              messageBySender={messageBySender}   
                              {...props}     
                               previousBySameSender={previousBySameSender} key={index}/>;

      case "Email":return <TextMessage messageObj={obj}            
                            messageBySender={messageBySender} 
                            {...props}     
                        previousBySameSender={previousBySameSender} key={index}/>;

      case "Suggest":return <TextMessage messageObj={obj}              
                          messageBySender={messageBySender}         
                          {...props}
                   previousBySameSender={previousBySameSender} key={index}/>;

      case "Range":return <RangeSelector messageObj={obj}  
      submitRangeSelectAnswer={this.props.submitRangeSelectAnswer}          
                            messageBySender={messageBySender} 
                            {...props}  
                           previousBySameSender={previousBySameSender} key={index}/>;

      case "Contact":return <TextMessage messageObj={obj}     
      {...props}   
                                messageBySender={messageBySender}    
                               previousBySameSender={previousBySameSender} key={index}/>;

      case "Number":return <TextMessage 
                            messageObj={obj}           
                            {...props} 
                             messageBySender={messageBySender}          
                     previousBySameSender={previousBySameSender} key={index}/>;

      case "Rating":return <TextMessage messageObj={obj}               
                         messageBySender={messageBySender} 
                         {...props}              
             previousBySameSender={previousBySameSender} key={index}/>;

      case "Date Picker":return <TextMessage messageObj={obj}           
                             messageBySender={messageBySender}         
                             {...props} 
                      previousBySameSender={previousBySameSender} key={index}/>;

      case "Links":return <TextMessage messageObj={obj}               
                         messageBySender={messageBySender} 
                         {...props}            
               previousBySameSend er={previousBySameSender} key={index}/>;
      default:return <TextMessage messageObj={obj}           
          messageBySender={messageBySender}
          {...props}           
          previousBySameSender={previousBySameSender} key={index}/>;
    }
  }

  componentDidMount(){
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    })
  }

}

export default MessageList;