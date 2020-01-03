import React, {Component} from 'react';
import TextMessage from '../TextMessage/TextMessage';
import UserInfo from '../UserInfo/UserInfo';
import MessageList from './../MessageList/MessageList';
import TechInput from './TechInput';
import FeaturesCandidate from './../modals/FeaturesCandidate';
import FeaturesRecruiter from './../modals/FeaturesRecruiter';
import AboutTeam from './../modals/Team';
import Pricing from './../modals/Price';
import ContactUs from './../modals/ContactUs';
import Price from './../modals/Price';
import BookNow from './../modals/BookNow';
import swal from 'sweetalert';
import dictionary from './../utils/UI';
const $=window.$;


function mobileAndTabletcheck(){
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};   
class MessageShell extends Component{

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
      dictionaryObj:{},
      keywordsList:[],
      matchedSugesstion:[],
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
        , "label": "Hey Recruiter, I'm your Fellow Tech Bot. I've been trained to help you understand tech in a Recruiter's context."
     },
     /*obj2={
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
        },-
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
   }*/


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
        let that=this;
            if(!window.IN.User)
            {
                onError();
                return;
            }

            window.IN.Event.on(window.IN, "auth", getProfileData);
            
            function getProfileData() {
            window.IN.API.Profile("me").fields("id", "first-name", "last-name","maiden-name","formatted-name","industry","current-share","num-connections","num-connections-capped", "headline", "location","summary","specialties","positions", "picture-url", "public-profile-url", "email-address").result(displayProfileData).error(onError);
            }

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
                // console.log(that);   
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
                },2000);
                //  window.location.reload();
            }
            if(Object.keys(this.state.userObj).length==0){  
            window.IN.User.authorize((...args)=>{
            })
            } else {
                obj.label="Basically I'm trained with close to 1000 tech Jargons around UI, backend, devops, BigData (i.e) primarily around the digital tech stack.<br/>Just type the word which you're looking forward to";    
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
        // let answers=JSON.parse(JSON.stringify(this.state.answers));
        let currentQuestionIndex=this.state.currentQuestionIndex;

        // console.log(answerMessageObj);
            
        if(answerMessageObj)
            messages.push(answerMessageObj);     
            
            if(again)
             this.followUpMessage(); 

            this.setState({
                messages,
                currentQuestionIndex:currentQuestionIndex+1
            }); 
    }

    
    followUpMessage(){
        setTimeout(()=>{
            this.setNextQuestion({
             label:"Hope the answer helped. Shoot out more tech jargons & learn it the Recruiter way",
             element:"Statement",
             photoUrl:"",
             timestamp:Date.now()
         })
        },1000);
    }

    updateAutoSelect(val){
        if(val){
        let length=val.length,list=this.state.keywordsList,matchedSugesstion=[];
        // if(val.length<=2){
        // let beginChar=val.charCodeAt(0);
        // for(let x in list){
        //     if(list[x].charCodeAt(0)<=beginChar){
        //         if(list[x].charAt(0)==val.charAt(0)){
        //              if(list[x].substr(0,length)===val){
        //                  matchedSugesstion.push(list[x]);
        //              }   
        //         }
        //     }
        //     else{
        //         break;
        //     }
        // }
        // }
        // else{
        for(let x in list){
            if(list[x].toString().indexOf(val.toLowerCase())>=0){
                // console.log(list[x].toString().indexOf(val.toLowerCase()),list[x],val);
                matchedSugesstion.push(list[x])
                if(matchedSugesstion.length>=15)
                 break;
            }
        }
        // }
        this.setState({matchedSugesstion});
        
        }

        else if(this.state.matchedSugesstion.length){
            this.setState({matchedSugesstion:[]});
        }
    }

    searchInDictionary(val){
        let html='';
        if(this.state.dictionaryObj[val.toLowerCase()]){
           let obj=this.state.dictionaryObj[val.toLowerCase()];
        //    console.log(obj);
           html=this.ObjToString(obj); 
        }
        else {
            html="ooppss sorry, I'm not sure of that word. I'm being trained with more tech jargons. Meanwhile you can try with terms around digital tech stack (UI, backend, BigData)."
        }
        return html;
    }

    ObjToString(obj){
        let {skillName,explanation,primaryFamily,secondaryFamily,synonyms,
            versions,similarTech,type,booleanSynonyms}=obj,str="";
        
        if(Object.keys(obj).length==3){
        str=`<div>
            <h4 class='text-cap'>${skillName} </h4>
            <div style='font-size:14px;'>${explanation}</div>`; 
         if(synonyms.length>0)str+=`<div><i class='grey'>Synonyms</i> : ${synonyms.toString()}</div>`;
         str+=`</div>`;
         return str;
        }    
        
        str=`<div>
           <h4 class='text-cap'>${skillName} </h4>
           <div style='font-size:14px;'>${explanation}</div>`; 
        if(versions.length>0)str+=`<div style='font-size:13px;'><i>Versions</i> : ${versions.toString()}</div>`;
        if(primaryFamily)str+=`<div style='font-size:12px;'><span class='grey'><i>Primary Family </i></span>: ${primaryFamily}</div>`;
        if(secondaryFamily.length>0)str+=`<div style='font-size:12px;'><span class='grey'><i>Secondary Family</i> </span>:${secondaryFamily.toString()}</div>`;
        if(type)str+=`<div><i class='grey'>Type</i> : ${type}</div>`;
        if(synonyms.length>0)str+=`<div><i class='grey'>Synonyms</i> : ${synonyms.toString()}</div>`;
        if(similarTech.length>0)str+=`<div><i class='grey'>Similar Tech</i> : ${similarTech.toString()}</div>`;
        try{
            if(booleanSynonyms.length>0)str+=`<div><i class='grey'>Boolean Synonyms</i> : ${booleanSynonyms.toString()}</div>`;    
        }
        catch(e){}
        str+=`</div>`;

        return str;
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
            label:this.searchInDictionary(answer.toLowerCase()),
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
                id="messages-list-cont"
                >
                    
                    <MessageList messages={this.state.messages} 
                    enableUserInput={()=>this.setState({userInputActive:true})}
                    disableUserInput={()=>this.setState({userInputActive:false})}
             s      submitSingleChoiceAnswer={this.submitSingleChoiceAnswer.bind(this)}
                    {...this.props} 
                    {...this.state}
                    />
                    
                </div>
            
             <TechInput 
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
        // debugger;
        this.props.setUserObj(this.state.userObj);
    }  
  }
   
  componentWillReceiveProps(nextProps){
    if(Object.keys(this.state.userObj).length<Object.keys(nextProps.userObj).length){
        // debugger;
        this.setState({userObj:nextProps.userObj});
   } 
  }

  componentDidMount(){
    this.initateChat();
    
    if(Object.keys(this.state.userObj).length<Object.keys(this.props.userObj).length){
        // debugger;
        this.setState({userObj:this.props.userObj});
    }

    this.setState({dictionaryObj:dictionary,
        keywordsList:Object.keys(dictionary)});
    window.document.title="FellowApp : Technical Assistant";
    // $.ajax({
    //     url:window.origin+"/assets/UI.js",
    //     type:"GET"
    // }).then((data)=>{
    //     // console.log(data)
    //     if(typeof data == "String")
    //     data=JSON.parse(data);
    //     this.setState({dictionaryObj:data,
    //         keywordsList:Object.keys(data)
    //     });
    // }).fail((err,x,xhr)=>{
    //     console.log(xhr);
    //     let a =JSON.parse(err.responseText);
    //     // console.log(a);
    //     this.setState({dictionaryObj:a,
    //     keywordsList:Object.keys(a)
    //     });
    // });
   }
}

export default MessageShell;    