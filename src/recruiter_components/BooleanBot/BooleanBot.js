import React, {Component} from 'react';
import TextMessage from '../TextMessage/TextMessage';
import UserInfo from '../UserInfo/UserInfo';
import MessageList from './../MessageList/MessageList';
import BooleanInput from './BooleanInput';
import FeaturesCandidate from './../modals/FeaturesCandidate';
import FeaturesRecruiter from './../modals/FeaturesRecruiter';
import AboutTeam from './../modals/Team';
import Pricing from './../modals/Price';
import ContactUs from './../modals/ContactUs';
import Price from './../modals/Price';
import BookNow from './../modals/BookNow';
import swal from 'sweetalert';
// import dictionary from './../utils/UI';
const $=window.$;

class BooleanShell extends Component{

  constructor(props){
    super(props);
    this.state={
      openInfoBox:$(window).width()<=768?false:true,
      messages:[],
      userInputActive:false,
      answers:[],
      currentQuestionIndex:-1,
      count:15, 
      userImage:"fellowbot.png",
      botimage:"fellowbot.png",
      userObj:{}
    };
  }



   //initiate chat   
   initateChat(){
    let obj={
        "id": "775F61A9-4C55-45E5-BE0E-290B7861F364"
        , "element": "Statement"
        , "type": "statement"
        , "name": "Statement"
        , "required": false,
        timestamp:Date.now()
        , "label":"Hey Recruiter, I'm your Boolean Bot. I've been trained to test and assist you understand boolean in a Recruiter's context."
     },
     obj2={
        "id": "775F61A9-4C55-45E5-BE0E-290B7861F364"
        , "element": "Single Choice"
        , "type": "option"
        , "name": "Single Choice"
        , "required": false,
        timestamp:Date.now()
        , "label": "Before we get started I'd love to know a bit about you. Pls help me by authenticating yourself via LinkedIn.",
        action:[{
            val:"LinkedIn",
            action:"Login",
        },
        {
            val:"Facebook",
            action:"Login"
        }],
        "options": ['LinkedIn'
        // ,"Facebook"
    ],
            
    }; 
        let messages=JSON.parse(JSON.stringify(this.state.messages));
        let answers=JSON.parse(JSON.stringify(this.state.answers));
        let currentQuestionIndex=this.state.currentQuestionIndex;
            
        messages.push(obj);
        this.setState({
            currentQuestionIndex:0,
            messages
        })
        if(Object.keys(this.state.userObj).length==0)
        setTimeout(()=>{
            messages.push(obj2);
            this.setState({
                currentQuestionIndex:1,
                messages
            })  
        },1500);
        else {
            this.linkedinLogin(this.generateAnswerMessage("LinkedIn",true));
        }
    }


    facebookLogin(obj){
     var provider = new this.props.firebase.auth.FacebookAuthProvider();
     provider.addScope('user_birthday');
     provider.addScope('user_gender');
     provider.addScope('user_location');

     if(Object.keys(this.state.userObj).length==0){  
     this.props.firebase.auth().signInWithPopup(provider).then((result)=> {
        var token = result.credential.accessToken;
        let user = result.additionalUserInfo.profile,name=user.name;
        user.credential=result.credential;
        console.log(result);
        obj.label=`Wooaaahh, amazing. Now I know that Im talking to ${name}`;
        
        let messages=JSON.parse(JSON.stringify(this.state.messages));
        messages.push(this.generateAnswerMessage("Successfull Login With Facebook",true));
        this.setState({
            userObj:user,
            messages
        }); 
        this.setNextQuestion(obj);
            setTimeout(() => {

                this.setState({
                    userInputActive:true});
                this.setNextQuestion({
                            "element": "Statement"
                            ,timestamp:Date.now(),
                label:"Basically I'm trained with close to 1000 tech Jargons around UI, backend, devops, BigData (i.e) primarily around the digital tech stack.<br/>Just type the word which you're looking forward to"
            }); 
        },1500);
     this.setState({
         userObj:result
      });
     }).catch((error)=> {
        console.log(error);
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        obj.label=errorMessage;
        this.setState({
            userObj:error
        });
        this.setNextQuestion(obj);
            setTimeout(() => {
                this.setState({
                    userInputActive:true});
                this.setNextQuestion({
                            "element": "Statement"
                            ,timestamp:Date.now(),
                label:"Basically I'm trained with close to 1000 tech Jargons around UI, backend, devops, BigData (i.e) primarily around the digital tech stack.<br/>Just type the word which you're looking forward to"
            }); 
        },1500);
     });
     }
     else{
     let name=this.state.userObj.name||this.state.userObj.formattedName;
     obj.label=`Wooaaahh, amazing. Now I know that Im talking to ${name}`;   
     let messages=JSON.parse(JSON.stringify(this.state.messages));
     messages.push(this.generateAnswerMessage("Successfull Login With Facebook",true));
     this.setState({
         messages
     },()=>{
        this.setNextQuestion(obj);
     }); 
     setTimeout(() => {
      this.setState({userInputActive:true});
      this.setNextQuestion({
            "element": "Statement"
            ,timestamp:Date.now(),
            label:"Basically I'm trained with close to 1000 tech Jargons around UI, backend, devops, BigData (i.e) primarily around the digital tech stack.<br/>Just type the word which you're looking forward to"
        }); 
        },1500);
     }


    }


    generateAnswerMessage(answer,isForBot){
        let answerMessageObj={};
        if(isForBot)
        answerMessageObj={
            label:answer.toString(),
            element:"Statement",
            timestamp:Date.now()
        };
        else
        answerMessageObj={
            user:this.props.user,
            label:answer.toString(),
            element:"Statement",
            timestamp:Date.now()
        };

        return answerMessageObj;    
    }

    linkedinLogin(obj){
            if(!window.IN.User)
            {
                onError();
                return;
            }

            window.IN.Event.on(window.IN, "auth", getProfileData);
            
            function getProfileData() {
            window.IN.API.Profile("me").fields("id", "first-name", "last-name","maiden-name","formatted-name","industry","current-share","num-connections","num-connections-capped", "headline", "location","summary","specialties","positions", "picture-url", "public-profile-url", "email-address").result(displayProfileData).error(onError);
            }

        let that=this;
        // Handle the successful return from the API call
            function displayProfileData(data){
                var user = data.values[0];
                that.setState({userObj:user});
                let name=user.firstName;
                try{
                let company=user.positions.values[0].company.name||"";
                obj.label=`Cool, now I know it's ${name} from ${company}. So here you go...`; 
                }
                catch(e){
                    obj.label=`Wooaaahh, amazing. Now I know that Im talking to ${name}`;     
                }
                let messages=JSON.parse(JSON.stringify(that.state.messages));
                messages.push(that.generateAnswerMessage("Hurraayyy!! Successfully logged in via LinkedIn.",true));
                that.setState({
                    userObj:user,
                    messages
                },()=>{ 
                that.setNextQuestion(obj);
                });
                setTimeout(() => {
                    that.setState({
                        userInputActive:true});
                    that.setNextQuestion({
                        "element": "Statement"
                        , "type": "statement"
                        , "name": "Statement",
                        timestamp:Date.now(),
                        label:"Basically I'm trained with close to 1000 tech Jargons around UI, backend, devops, BigData (i.e) primarily around the digital tech stack.<br/>Just type the word which you're looking forward to"
                    });
                     
                },1500);
            }

            setTimeout(()=>{
               if(this.state.messages.length==2){
                onError();
               } 
            },25000)

            function onError(error) {
                console.log(error);
                obj.label=`OOps, Something went wrong. <br/> Lets continue...`;
                that.setNextQuestion(obj);
                setTimeout(() => {
                    
                    that.setState({
                        userInputActive:true});
                    that.setNextQuestion({
                        "element": "Statement"
                        , "type": "statement"
                        , "name": "Statement",
                        timestamp:Date.now(),
                        label:"Basically I'm trained with close to 1000 tech Jargons around UI, backend, devops, BigData (i.e) primarily around the digital tech stack.<br/>Just type the word which you're looking forward to"
                    }); 
                },20000);
                //  window.location.reload();
            }
            if(Object.keys(this.state.userObj).length==0){  
            window.IN.User.authorize((...args)=>{
            })
            } else{
                obj.label="Lets get started with the boolean content";    
                this.setState({userInputActive:true});
                this.setNextQuestion(obj);
            }

    }

    submitSingleChoiceAnswer(question,answer){
            let obj={
                timestamp:Date.now(),
                label:""
                , "element": "Statement"
                , "type": "statement"
                , "name": "Statement"
            };
            if(answer.toLowerCase()=="linkedin"){
                this.linkedinLogin(obj);
            }
            else if(answer.toLowerCase()=="facebook")
            this.facebookLogin(obj);
    } 


    setNextQuestion(answerMessageObj,again){
        let messages=JSON.parse(JSON.stringify(this.state.messages));
        let currentQuestionIndex=this.state.currentQuestionIndex;

            
        if(answerMessageObj)
            messages.push(answerMessageObj);     
            
 
            this.setState({
                messages,
                currentQuestionIndex:currentQuestionIndex+1
            }); 
    }

    


    submitQuestionInputAnswer(answer){
        answer=answer.toString();
        let answerMessageObj={
                user:this.props.user,
                label:answer[0].toUpperCase()+answer.substr(1,answer.length-1),
                element:"Statement",
                timestamp:Date.now()
        };
        this.setNextQuestion(answerMessageObj);
        let answerMessageObj2={
            label:this.searchInDictionary(answer),
            element:"Statement",
            timestamp:Date.now()
        };
        setTimeout(()=>{
           if(answerMessageObj2.label.substr(0,6)=="ooppss")
           this.setNextQuestion(answerMessageObj2);
           else
            this.setNextQuestion(answerMessageObj2,true);
        },200);
    }
      
  render(){
    return (
    <div className="current-chat">
      <div className="text-center header">
                
                <div className="blue pull-right dropdown" style={{paddingTop:5}}>
                    <a className="dropdown-toggle" style={{marginLeft:15,display:"block"}} 
                    type="button" id="dropdownMenu1" data-toggle="dropdown">
                            <i className="fa fa-plus"></i>
                    </a>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                            <li className="padd_5 text-center" style={{color:"#858C93"}}>For Recruiters</li>
                               
                               <li role="separator" className="divider"></li>
                                   <li><a href="#/" 
                                   onClick={()=>this.props.switchToTechChatBot()}>Chat Bot</a></li>
                          
                                   <li role="separator" className="divider">Upcoming</li>
   
                                   <li><a href="javascript:void(0);" 
                                   onClick={()=>{swal("Boolean Bot","Hey , I would go live shortly. I'll help you generate Boolean strings","info")}}
                                   >Boolean Bot <sup>coming soon</sup> </a></li>
                                   
                                   <li role="separator" className="divider">Upcoming</li>
                                   <li><a href="javascript:void(0);"
                                   onClick={()=>{swal("Sourcing BOT","Ooppss sorry, even I'm not ready yet. Will go live shortly.","info")}}
                                   >Sourcing Bot<sup>coming soon</sup></a></li>
                                </ul>
                </div>
                <div className="blue pull-right" style={{paddingTop:5}}>
                    <a onClick={()=>{this.setState({openInfoBox:!this.state.openInfoBox})}}
                        className="ripple-cont">
                          <i className="fa fa-info-circle"></i>
                          <div id="info-box" className="loading"></div>
                    </a>
                </div>
                <div  style={{margin:"-5px 0 0px -5px"}} className="pull-left">
                    <a onClick={()=>{
                        if(this.state.openInfoBox&&!this.props.isDeviceMobile)
                        this.setState({openInfoBox:!this.state.openInfoBox})
                        this.props.switchToTechChatBot()
                        }} className="btn" style={{color:"black",display:"inline-block"}}
                     href="#/"   
                        >
                    <i className="fa fa-arrow-left grey"></i></a>
                    <img src={this.state.userImage} alt="User" className="direct-chat-img hidden-xs" style={{width:45,height:45,marginTop:2}}/>
                </div>
                <h6 className="text-cap" dangerouslySetInnerHTML={{__html:this.props.user}}></h6>
                <p className="grey_col" style={{fontSize:12}}> <i className="fa fa-circle" style={{fontSize:12,color:"#0778BD"}}></i> Active now</p>
      </div>
     <div className={"paddinglr10 row "+(this.state.openInfoBox?"open-info":"")}>
                  
        <div className="direct-chat box-warning  direct-chat-warning" >
            <div className="box-body" id="messages-list">
                <div className="direct-chat-messages" style={{height:$(window).height()-155}}
                id="messages-list-cont">
                    
                    <MessageList messages={this.state.messages} 
                    enableUserInput={()=>this.setState({userInputActive:true})}
                    disableUserInput={()=>this.setState({userInputActive:false})}
                  submitSingleChoiceAnswer={this.submitSingleChoiceAnswer.bind(this)}
                    {...this.props} 
                    {...this.state}
                    />
                </div>
            
             <BooleanInput 
             {...this.props}
             {...this.state}
             disableUserInput={()=>this.setState({userInputActive:false})}
             submitQuestionInputAnswer={this.submitQuestionInputAnswer.bind(this)}
             userInputActive={this.state.userInputActive}
             updateAutoSelect={(val)=>this.updateAutoSelect(val)}
             /> 
            </div>                  
        </div>
        
        <div>   
           <UserInfo setState={(obj)=>this.setState(obj)} isDeviceMobile={this.props.isDeviceMobile}
           updateCurrentChat={this.props.updateCurrentChat}
           {...this.props}
           {...this.state}/>
        </div>     
        
    <FeaturesCandidate/>
    <FeaturesRecruiter/>
    <Price />
    <AboutTeam/>
    <ContactUs/>
    <BookNow {...this.props}
              setUserObj={obj=>this.setState({userObj:obj})}/>
        </div>
    </div>);
  }

  componentDidUpdate(prevProps,prevState){
    $("#messages-list-cont").scrollTop($("#messages-list-cont2").height());
    if(Object.keys(this.state.userObj).length>Object.keys(prevState.userObj).length){
        this.props.setUserObj(this.state.userObj);
    }  
  }
   
  componentWillReceiveProps(nextProps){
    if(Object.keys(this.state.userObj).length<Object.keys(nextProps.userObj).length){
        this.setState({userObj:nextProps.userObj});
    } 
  }

  componentDidMount(){
    this.initateChat();
    
    if(Object.keys(this.state.userObj).length<Object.keys(this.props.userObj).length){
        this.setState({userObj:this.props.userObj});
    }

    window.document.title="FellowApp : Boolean Assistant";
    $.ajax({
        url:window.origin+"/assets/UI.js",
        type:"GET"
    }).then((data)=>{
        console.log(data)
        if(typeof data == "String")
        data=JSON.parse(data);
        this.setState({dictionaryObj:data,
            keywordsList:Object.keys(data)
        });
    }).fail((err,x,xhr)=>{
        console.log(xhr);
        let a =JSON.parse(err.responseText);
        // console.log(a);
        this.setState({dictionaryObj:a,
        keywordsList:Object.keys(a)
        });
    });
   }
}

export default BooleanShell;    