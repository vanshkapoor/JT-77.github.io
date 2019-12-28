
/* 

get previous chat --done
ask quesetions
store response

*/

import React, {Component} from 'react';
import './MessageShell.css';
import TextMessage from '../TextMessage/TextMessage';
import UserInfo from '../UserInfo/UserInfo';
import MessageList from './../MessageList/MessageList';
import MessageInput from './MessageInput';
import {a as QuestionObj} from './../utils/questions2';
import URL from './../utils/apis';
import swal from 'sweetalert2';
import {emailValidationCheker,phoneNumberValidationCheck, getNewChatId,generateJobId} from './../utils/helper';
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

const LoadingMessg={
    label:"Loading FellowBot... <br/>Please wait for a sec, FellowBot is gathering your profile.",
    element:"Statement",
    timestamp:Date.now(),
    photoUrl:"fellowbot.png",
    sender:""
}

class BotShell extends Component{

  constructor(props){
    super(props);
    this.state={
        //openInfoBox:$(window).width()<=768?false:true,
        //hasQuestionaireStarted:false,
        messages:[LoadingMessg],
        //userInputActive:false,
        answers:[],
        //currentQuestion:{},
        currentQuestionIndex:-1,
        //nextQuestion:{},
        //questions:QuestionObj.questions,
        jobQuestions:[],
        // currentChatId:"",
        userImage:"fellowbot.png",
        botimage:"fellowbot.png",
        responses:{},
        count:15,
        cand:{},
        //currentQnaIndex:-1,
        //jobQnAModeOn:false,
        //enteredDetails:{
            // currentCtc:2,
            // currentNoticePeriod:2,
            // exp:1,

        //}
    };
  }

  componentWillReceiveProps(nextProps){
     this.checkAndInitChat(nextProps);
     
  }
   
   checkAndInitChat(nextProps){
    let currentCandidate=nextProps.currentCandidate,
    currentRecruiter=nextProps.currentRecruiter,
    currentJob=nextProps.currentJob;
    // console.log(currentCandidate,currentJob,currentRecruiter);      
    if(Object.keys(currentCandidate).length>0 
        &&Object.keys(currentRecruiter).length>0
        &&Object.keys(currentJob).length>0
        &&this.state.messages.length===1
        &&nextProps.botShellMessages.length===0
    ){
        if(nextProps.revisit){
            if(Array.isArray(nextProps.bot_chats) && nextProps.bot_chats.length>0)
                {
                    this.loadBotChats(nextProps.bot_chats);
                    alert("todo handle revisit messages showing");
                    setTimeout(() => {
                        // this.initateChat(nextProps);
                    }, 1500);
                }
            else this.initateChat(nextProps);
        }
    }
    else if(nextProps.botShellMessages.length>this.state.messages.length)
    {
        this.setState({messages:nextProps.botShellMessages});
    }
   }
    

   initateChat(props){
    let messages=JSON.parse(JSON.stringify(this.state.messages)),
    name="Guest",rec_name="Mr. Recruiter";
    try{
    name=props.currentCandidate.candidateName;
    rec_name=props.currentRecruiter.name;
    }
    catch(e){
        return ;
    }
    messages[0]=(this.generateAnswerMessage(`Hi ${name}, glad to have you here.`,true));
    this.setState({messages});

    setTimeout(() => {
        let messages=JSON.parse(JSON.stringify(this.state.messages));  
        messages.push(this.generateAnswerMessage(`I will be your hiring assistant here to help, guide &amp; direct you (live chat) to your Fellow Recruiter –
        ${rec_name} in a while.`,true));
        this.setState({messages});
          setTimeout(() => {
            let messages=JSON.parse(JSON.stringify(this.state.messages));  
            let o={
                label:"Let me first brief you about the opportunity. Can we get started?",
                photoUrl:this.state.botimage
                ,"element": "Single Choice"
                ,options:["Sure"]};
                messages.push(o);
            this.setState({messages,currentQuestion:o});
        },1500);
    },1500);
   }

   setNextQuestion(answerMessageObj,answerObj){
      let messages=JSON.parse(JSON.stringify(this.state.messages));
      let answers=JSON.parse(JSON.stringify(this.state.answers));
      if(answerMessageObj)
      { messages.push(answerMessageObj);
        if(this.state.currentQuestion.actions){
           this.checkForActions(this.state.currentQuestion,answerMessageObj,answerObj);
            return ;
        }     
      }

      if(answerObj)
      answers.push(answerObj);

      let currentQuestionIndex=this.state.currentQuestionIndex;
      currentQuestionIndex=this.getNextJumpQuestionIndex(currentQuestionIndex,answerMessageObj);
      
      if(!this.state.questions[currentQuestionIndex+1])
       return;

      let nextQuestion=this.state.questions[currentQuestionIndex+1];
      nextQuestion.timestamp=Date.now(); 
      messages.push(nextQuestion);
      
      console.log(nextQuestion,currentQuestionIndex,messages.length);
    //   if(nextQuestion.next=="end")
    // submit at backend 

    this.setState({
       messages,
       answers,
       currentQuestion:nextQuestion,
       currentQuestionIndex:currentQuestionIndex+1,
       nextQuestion:this.state.questions[currentQuestionIndex+2],
       userInputActive:((nextQuestion.element==="Email"||nextQuestion.element==="Number"
       ||nextQuestion.element==="Question"||nextQuestion.element=="Location"
       ||nextQuestion.element==="PhoneNumber"||nextQuestion.element=="Select"
       ||nextQuestion.element==="Date"||nextQuestion.element=="Time")?true:false)
    },()=>console.log(this.state.messages));

    if((nextQuestion.element==="Statement"||nextQuestion.element==="Contact")){
        setTimeout(()=>{
            this.setNextQuestion();  
        },1500);
      } 
   }
   
   getNextJumpQuestionIndex(currentQuestionIndex,answerMessageObj){
        let param=answerMessageObj?answerMessageObj.label:null; 
        let tempJumpIndex=this.checkForConditionalJumps(param);
        if(tempJumpIndex!=-1&&tempJumpIndex){
        return tempJumpIndex;
        }
        else
        return currentQuestionIndex;
    }

   checkForConditionalJumps(answer){
       let questions=this.state.questions;
       let currentQuestion=this.state.currentQuestion;
       let currentQuestionIndex=this.state.currentQuestionIndex;
       let returnValue=null,i=0,jumpQuestionIndex=-1,idToMatch;

       if(currentQuestion.element=="Single Choice"&&currentQuestion.conditions){
           currentQuestion.conditions.forEach(element => {
           if(element.val != answer)
             return ;
             i++;
            idToMatch=element.next;
            if(idToMatch){
            jumpQuestionIndex=questions.findIndex((obj)=>{
                return obj.id==idToMatch;
            });
            if(jumpQuestionIndex){
               jumpQuestionIndex=jumpQuestionIndex-1;   
            }
           }
        });
       //  console.log(jumpQuestionIndex,idToMatch,i);
       }
       else if(currentQuestion.next){
        idToMatch=currentQuestion.next;
          jumpQuestionIndex=questions.findIndex((obj)=>{
               return obj.id==idToMatch;
           });
           if(jumpQuestionIndex){
               jumpQuestionIndex=jumpQuestionIndex-1;   
           }
           // console.log(jumpQuestionIndex,idToMatch,i);
       }
       return returnValue||jumpQuestionIndex;
   }

   checkForActions(question,answerMessageObj,qna){
    // special hard code case
    if(question.actions=="expDemo"){
        this.handleExpInput(answerMessageObj.label,question);
        return;
    }
    else if(question.actions=="jobAreaCheck"){
        this.handlejobAreaCheck(answerMessageObj.label,question);
        return ;
    }
    else if(question.actions=="checkForAreaRange"){
        this.handleCheckForAreaRange(answerMessageObj.label,question);
        return ;
    }
    else if(question.actions==="relocateReason"){
        this.handleRelocateReason(answerMessageObj.label,question);
        return;
    }
    else if(question.actions==="skillsMatching"){
        this.handleSkillsCheck(answerMessageObj.label,question);
        return;
    }
    else if(question.actions==="customSkillsUnMatchAnswerSave"){
        this.customSkillsUnMatchAnswerSave(answerMessageObj.label,question); return;
    }
    else if(question.actions=="saveAdditionalDetails,NP"){
        this.saveAdditionalDetails(answerMessageObj.label,"NP",question); return;
    }
    else if(question.actions=="saveAdditionalDetails,CURRENT_CTC"){
        this.saveAdditionalDetails(answerMessageObj.label,"CURRENT_CTC",question,); return;
    }
    else if(question.actions=="notInterestedReason"){
        this.saveNotInterestedReason(answerMessageObj.label,question);  return;
    }
    else if(question.actions=="checkForEligibility"){
        this.checkCandidateBasicSelectionForJob(); return;
    }
    else if(question.actions="setUpNotifications"){
        if(answerMessageObj.label=="Sure")
        this.props.setUpNotification();
        this.addBotChat({
            chatId:getNewChatId(true),
            domain:this.props.currentRecruiter.domain,
            timestamp:Date.now(),
            number:this.props.currentCandidate.candidateContact
        });
        delete this.state.currentQuestion.actions;
        return;
    }

     let matchedAction=question.actions.find((obj)=>{
         return obj.val==answerMessageObj.label;
     });
       console.log(matchedAction);
       
     if(!(matchedAction&&matchedAction.action))
        window.location.reload();
     switch (matchedAction.action) {
         case "JobDisplay":this.jobDisplay(matchedAction.val,matchedAction.param);
                   break;
         case "manageExpectations":this.manageExpectations(matchedAction.val);
                                    break;
         case "relocateInterested":this.handleRelocateInterested(matchedAction.val);
            break;
         case "notInterested":this.handleNotInterested(matchedAction.val); break;
         case "handleExploreForInterested":this.handleExploreForInterested(matchedAction.val);break;
         case "handleUnmatchedSkillResponse":this.handleUnmatchedSkillResponse(matchedAction.val,question); break;
         case "handleRelocateOfArea":this.handleRelocaeOfArea(matchedAction.val,question);break;           
         default:delete this.state.currentQuestion.actions; 
         this.setNextQuestion(this.generateAnswerMessage(matchedAction.val)); 
         break;
     }
   }

//    actions
    jobDisplay(val,profileCase){
       let messages=JSON.parse(JSON.stringify(this.state.messages));
       let name=this.props.currentCandidate.candidateName,
           designation=this.props.currentCandidate.designation,
           employer=this.props.currentCandidate.employer,
        profileReply="Wooaah that’s amazing";
        if(profileCase==2||profileCase==3){
            profileReply="No worries! But you should maintain a updated linkedin profile to showcase"
        }
        let mess=`${profileReply}, so ${name} currently works as ${designation} at ${employer}.`;
       if(!designation || !employer){
         mess=`${profileReply}, ${name}.`
       }
       let answerMessageObj=this.generateAnswerMessage(mess,true);
       messages.push(this.generateAnswerMessage(val));
       messages.push(answerMessageObj);
       this.setState({messages},()=>{
        delete this.state.currentQuestion.actions;
        setTimeout(()=>{
            let messages=JSON.parse(JSON.stringify(this.state.messages));
            let obj= {
            "id":"sU5OhibkWwbsszgkhwcE"    
            ,"required": false
            ,"element": "Number"
            ,"label": "May I know what’s your total work experience ?",
            actions:"expDemo",
            placeholder:"Enter Experience (number of years)"
        };
        messages.push(obj);
        this.setState({messages,userInputActive:true,currentQuestion:obj});
        },1500);
       });
    }

    handleExpInput(val,question){
        let messages=JSON.parse(JSON.stringify(this.state.messages));
       let name=this.props.currentCandidate.candidateName,
       enteredDetails=JSON.parse(JSON.stringify(this.state.enteredDetails)),
        mess=`So ${name}, on your next job hunt what’s your most primary expectation?`;
       
        //store exp 
        enteredDetails.exp=val;
        enteredDetails[question.label]=val+" years";
       let answerMessageObj=this.generateAnswerMessage(`Oh good, so you have been working for last ${val} years.`,true);
       messages.push(this.generateAnswerMessage(val));
       messages.push(answerMessageObj);
       this.setState({messages,userInputActive:false,enteredDetails,userInputActive:false},()=>{
        setTimeout(()=>{
            let messages=JSON.parse(JSON.stringify(this.state.messages));
            let obj= {
            "id":"sU5OhibkWwbsszg3333E"
            ,"element": "Single Choice"
            ,"label":mess,
            options:["Good CTC","Better Role","Nearby Location","Good Company"],
            actions:[{val:"Better Role",action:"manageExpectations"},
            {val:"Good CTC",action:"manageExpectations"},
            {val:"Nearby Location",action:"manageExpectations"},
            {val:"Good Company",action:"manageExpectations"}]
        };
        messages.push(obj);
        this.setState({messages,currentQuestion:obj});
        },1500);
       });
    }

    manageExpectations(val){
       let obj=this.generateAnswerMessage("",true);
       let messages=JSON.parse(JSON.stringify(this.state.messages)),
       enteredDetails=JSON.parse(JSON.stringify(this.state.enteredDetails));
       let prefType="";

       switch(val){
           case "Good CTC":obj.element="Number";
                            obj.placeholder="Please enter digits in Lakhs";
                            prefType="CTC";
                        break;
           case "Better Role":obj.element="Question";
                            obj.placeholder="Enter preferred role";
                            prefType="Role";
                        break;
           case "Nearby Location":obj.element="Select";
                        obj.placeholder="Choose preferred location";
                        prefType="Location";
                        obj.options=["delhi","mumbai","bengaluru"];
                        break;
           case "Good Company":obj.element="Question";
                        obj.placeholder="Enter preferred company";
                        prefType="Company";
           break;
       }
        //save expectations    
       enteredDetails.expectations={prefType:prefType};
       if(prefType=="Location")
       obj.label="Choose prefered Location";
       else
       obj.label=`Enter the expected ${prefType}`;
       obj.prefType=prefType;
       obj.actions="jobAreaCheck";

       enteredDetails.expectations.label=obj.label;

       messages.push(this.generateAnswerMessage(val));
       messages.push(obj);
       this.setState({messages,userInputActive:true,currentQuestion:obj,enteredDetails});
    }

    handlejobAreaCheck(val){
        let messages=JSON.parse(JSON.stringify(this.state.messages));
        let enteredDetails=JSON.parse(JSON.stringify(this.state.enteredDetails));
        let localtion=(this.props.currentJob.subLocation).toLowerCase();
        
        enteredDetails.expectations.val=val;
        console.log(enteredDetails);

        if(this.state.currentQuestion.prefType=="Location"){

            let regex= new RegExp(val,'i');
            if(this.props.currentJob.cityLocation.match(regex)||this.props.currentJob.subLocation.toString().match(regex)){
            
                delete this.state.currentQuestion.actions;
                messages.push(this.generateAnswerMessage("Aaah k, fine.",true));
                this.setState({messages,enteredDetails});
                setTimeout(()=>this.handleInterested(),1500);
            }
            else {
                let o={
                    element:"Single Choice",
                    options:["Fine, I’m interested","Sorry, Not Interested"],
                    actions:[{
                    val:"Fine, I’m interested",
                    action:"relocateInterested"
                    },
                    {val:"Sorry, Not Interested",
                    action:"notInterested"
                    }],
                    label:`Oooppss, sorry to inform you this Job location is for ${localtion}. Will you be still keen at this opportunity?`
                }
                messages.push(o);
                this.setState({messages,currentQuestion:o,enteredDetails});    
            }
        }
        else{   
            messages.push(this.generateAnswerMessage(val));
            messages.push(this.generateAnswerMessage('Cool, I will make sure I get you a good one.',true));
            this.setState({messages,enteredDetails});
            setTimeout(()=>this.handleInterested(),1500);
        }
    }

    handleInterested(){
       let messages=JSON.parse(JSON.stringify(this.state.messages));
       let name=this.props.currentCandidate.candidateName,
           clientName=this.props.currentJob.clientName,
           location=this.props.currentJob.cityLocation||this.props.currentJob.subLocation;
           
        let enteredDetails=JSON.parse(JSON.stringify(this.state.enteredDetails));
        enteredDetails.interested=true;
        let obj={
        label:`BTW this opportunity is for ${clientName} – ${location}. Are you open to explore?.`
        ,element:"Single Choice",
        options:["Yes","No","Tell me more about this firm"],
        actions:[{val:"Yes",action:"handleExploreForInterested"},
        {val:"No",action:"handleExploreForInterested"},
        {val:"Tell me more about this firm",action:"handleExploreForInterested"}]
        };
        enteredDetails.jobOffer=obj.label;
    //    messages.push(this.generateAnswerMessage(val));
       messages.push(obj);
       this.setState({messages,currentQuestion:obj,enteredDetails,userInputActive:false});

    }
    
    handleExploreForInterested(val){
        let messages=JSON.parse(JSON.stringify(this.state.messages));
        let enteredDetails=JSON.parse(JSON.stringify(this.state.enteredDetails));
        enteredDetails.interested=true;
        let name=this.props.currentCandidate.candidateName,
            clientName=this.props.currentJob.clientName,
            primarySkill=this.props.currentJob.primarySkill,
            minExp=this.props.currentJob.minExpense,
            maxExp=this.props.currentJob.maxExpense;
        
        delete this.state.currentQuestion.actions;   
        if(val=="No"){
            let nextJumpId="ek4bfGsIkdGb4m4ns2LI";
            this.handleNotInterested(val,nextJumpId);    
        }else if(val=="Tell me more about this firm"){
            this.tellMeAboutFirm(val); 
        }
        else{
        let obj=this.generateAnswerMessage(`Great to know that you’re interested to explore an opportunity with ${clientName} &amp; this will be for a ${primarySkill} Role with ${minExp} - ${maxExp} Years of experience.`,true);
        messages.push(this.generateAnswerMessage(val));
        messages.push(obj);
        this.setState({messages,enteredDetails,userInputActive:false});
        setTimeout(() => {
            this.setNextQuestion();
        }, 1500);         
        }
    }

    tellMeAboutFirm(val){
        let messages=JSON.parse(JSON.stringify(this.state.messages));
        let clientObj=this.props.clientObj,linksLiList=[];
        // alert("handle tell me about firm");
        if(clientObj instanceof Object && Object.keys(clientObj)){
            delete clientObj._id;
            let keys =Object.keys(clientObj);
            for(let x in keys){
                if(clientObj[keys[x]]){
                    linksLiList.push({
                        link:clientObj[keys[x]],
                        name:keys[x]
                    });
                }            
            }
        }
        if(linksLiList.length>0)
        linksLiList=linksLiList.map(obj=>`<li><a href='${obj.link||"https://www.google.com"}' target='_blank'>${obj.name||"demo"}</a></li>`)
        else linksLiList=<li><span>{"No Links Found"}</span></li>;
        let links=this.generateAnswerMessage(`<h5>I can only help you with these links, rest is your homework.</h5><ul>${linksLiList}</ul>`,true);
        messages.push(this.generateAnswerMessage(val));
        messages.push(links);
        this.setState({messages,userInputActive:false},()=>setTimeout(()=>this.setNextQuestion(),1500));
    }
    
    handleNotInterested(val,nextId){
        
        let enteredDetails=JSON.parse(JSON.stringify(this.state.enteredDetails));
        let currentQuestion=JSON.parse(JSON.stringify(this.state.currentQuestion));
        enteredDetails.interested=false;
        // alert("test not interested")
        delete currentQuestion.actions;
        currentQuestion.next=(nextId?nextId:"222ER82YYvkZXZedx1mN");
        this.setState({enteredDetails,userInputActive:false,currentQuestion},()=>{
            this.setNextQuestion(this.generateAnswerMessage(val));
        });
    }
    
    handleRelocateInterested(val){
        
        let enteredDetails=JSON.parse(JSON.stringify(this.state.enteredDetails));
        let messages=JSON.parse(JSON.stringify(this.state.messages));
        let location=this.props.currentJob.subLocation;
        let answerMessageObj=this.generateAnswerMessage(`Cool, that’s great to know that still you’re Interested ${location}.`,true);
        
        enteredDetails.readyToRecolate=true;

        messages.push(this.generateAnswerMessage(val));
        messages.push(answerMessageObj);
        this.setState({messages,enteredDetails,userInputActive:false},()=>{
         setTimeout(()=>{
             let messages=JSON.parse(JSON.stringify(this.state.messages));
             let obj= {
             "id":"sU5OhibkWwbsszgkhwcee"
             ,"element": "Question"
             ,"label": "May I know why do you choose this even though it is not within your expected location?",
             actions:"relocateReason",
             placeholder:"Enter your reason"
         };
         messages.push(obj);
         this.setState({messages,userInputActive:true,currentQuestion:obj});
         },1500);
        });        
    }

    handleRelocateReason(val){
       
        let messages=JSON.parse(JSON.stringify(this.state.messages));
        let enteredDetails=JSON.parse(JSON.stringify(this.state.enteredDetails));
        enteredDetails.relocateReason=val;
        messages.push(this.generateAnswerMessage(val));
        messages.push(this.generateAnswerMessage("Aaah k, fine.",true));

        this.setState({messages,enteredDetails},()=>{
         setTimeout(()=>this.handleInterested(),1500);
        });             
    }

    handleCheckForAreaRange(val){
        let messages=JSON.parse(JSON.stringify(this.state.messages));
        messages.push(this.generateAnswerMessage(val));
        let distance=15;
            
        alert("handle check for area range for above 12km or less through api");
         let enteredDetails=JSON.parse(JSON.stringify(this.state.enteredDetails));
         enteredDetails.currentArea=val;

         messages.push(this.generateAnswerMessage(`Aaah ok, I think it would take approximately ${distance} Kms from your place to Tata Consultancy Services,Bangalore.`,true));
         if(distance>10){
         let obj={
         label:`Aaah ok, I think it would take approximately ${distance} Kms from your place to Tata Consultancy Services,Bangalore.`
         ,element:"Single Choice",
         options:["Yeah sure","I will manage","I will shift nearby","Sorry, I can’t"],
         actions:[{val:"Yeah sure",action:"handleRelocateOfArea"},
         {val:"I will manage",action:"handleRelocateOfArea"},
         {val:"I will shift nearby",action:"handleRelocateOfArea"},
         {val:"Sorry, I can’t",action:"handleRelocateOfArea"}],
         next:"hOo3FkqyacSMTBD4LOd9"
         };
         messages.push(obj);
         
        this.setState({messages,currentQuestion:obj,enteredDetails,userInputActive:false});
        }
        else{
        this.setState({messages,enteredDetails,userInputActive:false},()=>{
        delete this.state.currentQuestion.actions;
         setTimeout(()=>this.setNextQuestion(),1500);
        });  
    } 
    }

    handleRelocaeOfArea(val){
        let nextForNegativeId="222ER82YYvkZXZedx1mN"
        if(val=="Sorry, I can’t"){
            this.state.currentQuestion.next=nextForNegativeId;
            delete this.state.currentQuestion.actions;
            this.setNextQuestion(this.generateAnswerMessage(val))
        }
        else {
            this.state.currentQuestion.actions="checkForEligibility";
            delete this.state.currentQuestion.next;
        let messages=JSON.parse(JSON.stringify(this.state.messages));
        messages.push(this.generateAnswerMessage(val));
        this.setState({messages});    
        setTimeout(()=>this.setNextQuestion(this.generateAnswerMessage("That’s great.😃\n")),1500); 
        }            

    }

    handleSkillsCheck(val){
        let primarySkills=this.props.currentJob.primarySkill||"";
        primarySkills=primarySkills.toLowerCase().split(",");
        let messages=JSON.parse(JSON.stringify(this.state.messages));
        let enteredSkills=val.toLowerCase().split(val),
        enteredDetails=JSON.parse(JSON.stringify(this.state.enteredDetails));
        let notFoundSkills=[];
        for(let i=0;i<primarySkills.length;i++){
            if(enteredSkills.indexOf(primarySkills[i])==-1)
            notFoundSkills.push(primarySkills[i])
        }
        
        console.log(enteredSkills,primarySkills,notFoundSkills);
        messages.push(this.generateAnswerMessage(val));
        if(notFoundSkills.length>0){
        if(notFoundSkills.length==1)    
        var obj={
            label:`How about working on ${notFoundSkills.toString()}? Was that part of your recent project?`
            ,element:"Single Choice",
            options:["Yes, I’m using it.","No, I have never worked.","Worked in previous project."],
            actions:[{val:"Yes, I’m using it.",action:"handleUnmatchedSkillResponse"},
            {val:"No, I have never worked.",action:"handleUnmatchedSkillResponse"},
            {val:"Worked in previous project.",action:"handleUnmatchedSkillResponse"}]
        };
        else 
        obj={
            label:`How about working on ${notFoundSkills.join(",")}? Were that part of your recent project?`
            ,element:"Single Choice",
            options:["Yes, I’m comfortable with them.","No, I have never worked with them.","<h5>Write my custom answer.</h5>"],
            actions:[{val:"Yes, I’m comfortable with them.",action:"handleUnmatchedSkillResponse"},
            {val:"No, I have never worked with them.",action:"handleUnmatchedSkillResponse"},
            {val:"<h5>Write my custom answer.</h5>",action:"handleUnmatchedSkillResponse"}]
        };
            messages.push(obj);
            this.setState({messages,enteredDetails,currentQuestion:obj,userInputActive:false});
        }
        else
        this.setState({messages,enteredDetails,userInputActive:false},()=>this.setNextQuestion());
    }

    handleUnmatchedSkillResponse(val,question){
        let messages=JSON.parse(JSON.stringify(this.state.messages));
        let enteredDetails=JSON.parse(JSON.stringify(this.state.enteredDetails));
        enteredDetails[question.label]=val;
        
        delete this.state.currentQuestion.actions;    
        
        if(val=="<h5>Write my custom answer.</h5>"){
            messages.push(this.generateAnswerMessage("Write my custom answer."));
            let obj={
                "id": "0CAA722A-cssfsf610-9A0721724103"
                , "element": "Question"
                , "type": "text"
                , "name": "Question"
                , "label": "Please share your experience or approach with these skills."
                ,actions:"customSkillsUnMatchAnswerSave",
                placeholder:"Enter your experience with the above skills."
            };
            messages.push(obj);    
            this.setState({messages,currentQuestion:obj,enteredDetails,userInputActive:true});
        }
        else{
            messages.push(this.generateAnswerMessage(val));    
            this.setState({messages,enteredDetails,userInputActive:false});
            }
        setTimeout(() => {
            this.setNextQuestion();
        }, 1500);                   
    }

    customSkillsUnMatchAnswerSave(val){
        let messages=JSON.parse(JSON.stringify(this.state.messages));
        let enteredDetails=JSON.parse(JSON.stringify(this.state.enteredDetails));
        //store custom skill gap answer
        enteredDetails.experienceWithSkillsCustomResponse=val; 
        this.setState({messages,userInputActive:false,enteredDetails},()=>{
        this.setNextQuestion(this.generateAnswerMessage(val));
       });
    }

    saveAdditionalDetails(val,type){ 
        let enteredDetails=JSON.parse(JSON.stringify(this.state.enteredDetails));
        switch(type){
            case "NP":enteredDetails.servingNoticePeriod=true;
                      enteredDetails.currentNoticePeriod=val;      
                    break;
            case "CURRENT_CTC":enteredDetails.currentCtc=val;
                    break;
        } 
        this.setState({enteredDetails},()=>{
            delete this.state.currentQuestion.actions;
            this.setNextQuestion(this.generateAnswerMessage(val));
       });
        
    }
    saveNotInterestedReason(val){
        let enteredDetails=JSON.parse(JSON.stringify(this.state.enteredDetails));
        enteredDetails.interested=false;
        enteredDetails.notInterestedReason=val;      
        this.setState({enteredDetails},()=>{
            delete this.state.currentQuestion.actions;
            this.setNextQuestion(this.generateAnswerMessage(val));
       });
    }

    checkCandidateBasicSelectionForJob(){
        // basic selecttion process checl
        console.log(this.state.enteredDetails);
        let job=this.props.currentJob,
        enteredDetails=this.state.enteredDetails,
        isRejected=false,rejectReason="",uiRejectReason="";
        // debugger;
        if(job.minExpense!=undefined && job.maxExpense!=undefined &&enteredDetails.exp<job.minExpense||enteredDetails.exp>job.maxExpense){
            isRejected=true;
            rejectReason="Didn't Qualify Experience requirement"
            uiRejectReason="Sorry your Experience didn’t match with the experience of this role. Will reach out to you if something suitable pops-up";
        }
        else if(job.noticePeriod!=undefined && enteredDetails.currentNoticePeriod>job.noticePeriod){
            isRejected=true;
            rejectReason="Didn't Qualify Notice Period requirement";
            uiRejectReason="Sorry your Notice Period didn’t match with the experience of this role. Will reach out to you if something suitable pops-up";
        }
        else if(job.annualCtc!=undefined && !isNaN(parseFloat(job.annualCtc)) && enteredDetails.currentCtc>parseFloat(job.annualCtc)){
            isRejected=true;
            rejectReason="Didn't Qualify Ctc requirement";
            uiRejectReason="Sorry your Current ctc doesn’t match with the ctc of this role. Will reach out to you if something suitable pops-up";
        }
        console.log(this.getCandidateChatResponse());
        if(isRejected){
            this.rejectCandidate(uiRejectReason);
            this.submitCandidateResponse("Fellow Reject",rejectReason);
        }
        else{
            setTimeout(() => {
            this.showAcceptMessagesAndInitiateQnA();
            }, 1500);
        }
    }

    rejectCandidate(reason){
        let messages=JSON.parse(JSON.stringify(this.state.messages));
        messages.push(this.generateAnswerMessage(reason,true));
        this.setState({messages,userInputActive:false},()=>setTimeout(() => {
            delete this.state.currentQuestion.actions;
            this.state.currentQuestion.next="2s2s55s2s5s5s2bvkz12hwcE";
            // "SL8878R82YYvkZXZedx1mN";
            this.setNextQuestion();
        }, 1500));
           
    }

    showAcceptMessagesAndInitiateQnA(){
        let messages=JSON.parse(JSON.stringify(this.state.messages));
        messages.push(this.generateAnswerMessage("Amazing, you have full filled the most basic criteria’s for this job. So you’ve almost qualified for this role.",true));
        this.setState({messages,userInputActive:false},()=>{
             setTimeout(() => {
                let messages=JSON.parse(JSON.stringify(this.state.messages));
                messages.push(this.generateAnswerMessage("But hang on there are a few simple Qs around your role which the hiring manager wants to know before he invites you for the interview.",true));
                this.setState({messages,jobQnAModeOn:true},()=>{
                    delete this.state.currentQuestion.actions;
                    setTimeout(() => {
                        let jobQuestions=this.props.questions||this.props.currentJob.questonaries;
                        if(jobQuestions && Array.isArray(jobQuestions) && jobQuestions.length>0)
                            this.initateQNA();
                        else{
                            this.state.currentQuestion.next="2s2s55s2s5s5s2bvkz12hwcE";
                            // "SL8878R82YYvkZXZedx1mN";
                            this.setNextQuestion();
                            }
                    }, 1500);        
            });   
        },1500);
        });
    }

    submitCandidateResponse(status,reason){
        var settings = {
            "url": URL.SUBMIT_CANDIDATE_CHAT_RESPONSE,
            "method": "POST",
            "data":JSON.stringify({
                "number": this.props.currentCandidate.candidateContact,
                "domain": this.props.currentRecruiter.domain,
                "recruiterId":this.props.currentRecruiter.userID,
                chatId:getNewChatId(),
                timestamp:Date.now(),
                status:status,
                reason:reason,
                jobId:this.props.currentJob.jobID,
                entered_details:this.state.enteredDetails,
                "answers":this.getCandidateChatResponse() 
            })
          }
          $.ajax(settings).done(function (response) {
            console.log(response);
            swal("Chat Response Submitted!","Your chat response have been successfully submitted. Please continue with the selection process.","success")
          }).fail(err=>{
              console.log(err);
              swal("Error submitting chat response!","Please check your internet connection and press ok to retry.","warning").then(result=>{
                if(result.value)
                    this.submitCandidateResponse(status,reason);
                else
                swal("Error Submitting Chat Response!","Your chat response couldn't be submitted.","error");
              })
          });
    }

    getCandidateChatResponse(){
        let enteredDetails=JSON.parse(JSON.stringify(this.state.enteredDetails)),
        answers=[];
        // keys - exp,interested,expectations,readyToRecolate,relocateReason,servingNoticePeriod,currentCtc,currentNoticePeriod,currentArea
        // experienceWithSkillsCustomResponse
        console.log("final entered details",this.state.enteredDetails);
        if(enteredDetails.exp)delete enteredDetails.exp;
        if(enteredDetails.currentCtc){
            this.addQnA(answers,"May I know what’s the value of the offer you’re holding? Maybe an approx figure.",enteredDetails.currentCtc)
            delete enteredDetails.currentCtc;
        }
        if(enteredDetails.servingNoticePeriod){
            this.addQnA(answers,"So Are you serving your notice period by any chance ?","Yes")
            delete enteredDetails.servingNoticePeriod;
        }
        if(enteredDetails.jobOffer){
            this.addQnA(answers,enteredDetails.jobOffer,enteredDetails.interested?"Yes":"No")
            delete enteredDetails.jobOffer;
        }
        if(enteredDetails.currentNoticePeriod){
            this.addQnA(answers,"Cool, so what’s your notice period as of today ?",enteredDetails.currentNoticePeriod)
            delete enteredDetails.currentNoticePeriod;
        }
        if(enteredDetails.currentArea){
            this.addQnA(answers,"By the way, where do you reside (area)?",enteredDetails.currentArea)
            delete enteredDetails.currentArea;
        }
        if(enteredDetails.relocateReason){
            this.addQnA(answers,"May I know why do you choose this even though it is not within your expected location?",enteredDetails.relocateReason)
            delete enteredDetails.relocateReason;
        }
        if(enteredDetails.notInterestedReason){
            this.addQnA(answers," May I know the reason for your disinterest? This will help me understand better on your preferences",enteredDetails.notInterestedReason)
            delete enteredDetails.notInterestedReason;
        }
        if(enteredDetails.readyToRecolate){
            this.addQnA(answers,"Are you ready to recolate?",enteredDetails.readyToRecolate)
            delete enteredDetails.readyToRecolate;
        }
        if(enteredDetails.expectations){
            this.addQnA(answers,enteredDetails.expectations.label,enteredDetails.val);
            delete enteredDetails.expectations;
        }
        if(enteredDetails.experienceWithSkillsCustomResponse){
            this.addQnA(answers,"Can you mention the tech skills which you’ve been using in your recent projects? Like Java, Spring,others? Kindly separate them with commas.\n",enteredDetails.experienceWithSkillsCustomResponse);
            delete enteredDetails.experienceWithSkillsCustomResponse;    
        }
        
        delete enteredDetails.interested;

        let keys=Object.keys(enteredDetails);
        for(let x in keys){
            this.addQnA(answers,keys[x],enteredDetails[keys[x]]);
        }

        console.log("qna",answers);

        return answers;
    }

    addQnA(arr,question,answer){
        arr.push({question,answer});
    }

    initateQNA(){
        let jobQuestions=this.props.questions||this.props.currentJob.questonaries;
        console.log("found questions",jobQuestions);
        if(jobQuestions&&jobQuestions.length>0){
            this.setNextaQnaQuestion();
        }
        else
        swal("No Questions Found.","","info");
    }

    setNextaQnaQuestion(answerMessageObj){
        // debugger;

        let messages=JSON.parse(JSON.stringify(this.state.messages));
        let enteredDetails=JSON.parse(JSON.stringify(this.state.enteredDetails));
        if(answerMessageObj)
        { messages.push(answerMessageObj);
            enteredDetails[this.state.currentQuestion.label]=answerMessageObj.label;
        }
        console.log(enteredDetails);
        let currentQnaIndex=this.state.currentQnaIndex;
        // debugger;
        if(!this.props.questions[currentQnaIndex+1])
         {
             this.endQnaAndCheckForChat(answerMessageObj);
            return;
        }
  
        let nextQuestion=this.props.questions[currentQnaIndex+1];
        nextQuestion.timestamp=Date.now(); 
        messages.push(nextQuestion);
        
        console.log(nextQuestion,currentQnaIndex,messages.length);
        
      this.setState({
         messages,
         currentQuestion:nextQuestion,
         enteredDetails,
         currentQnaIndex:currentQnaIndex+1,
         nextQuestion:this.props.questions[currentQnaIndex+2],
         userInputActive:((nextQuestion.element==="Email"||nextQuestion.element==="Number"
         ||nextQuestion.element==="Question"||nextQuestion.element=="Location"
         ||nextQuestion.element==="PhoneNumber"||nextQuestion.element=="Select"
         ||nextQuestion.element==="Date"||nextQuestion.element=="Time")?true:false)
      });
  
      if((nextQuestion.element==="Statement"||nextQuestion.element==="Contact")){
          setTimeout(()=>{
              this.setNextaQnaQuestion();  
          },1500);
        } 
    }

    submitJOBQNAResponse(val){
        // debugger;
        let answerMessageObj=this.generateAnswerMessage(val);
        this.setNextaQnaQuestion(answerMessageObj); 
    }

    endQnaAndCheckForChat(answerMessageObj){
        // debugger;
        let messages=JSON.parse(JSON.stringify(this.state.messages));
        messages.push(answerMessageObj);
        messages.push(this.generateAnswerMessage("Thank you for filling out inital QnA for this job.",true));
        this.setState({messages,userInputActive:false},()=>{
             setTimeout(() => {
                let messages=JSON.parse(JSON.stringify(this.state.messages));
                let name=this.props.currentRecruiter.name||"Mr. recruiter";
                if(this.props.currentJob.allowCandidatesToChat==undefined || this.props.currentJob.allowCandidatesToChat)
                messages.push(this.generateAnswerMessage(`Please wait while i set up your one-on-one chat with your fellow recruiter ${name} for further interview process.`,true));
                else {
                    messages.push(this.generateAnswerMessage(`Well, the one-on-chat has been disabled from your fellow recruiter. Please wait while he connect with you personally. Don't worry i am here to notify you about his moves.`,true));
                    this.state.currentQuestion.next="2s2s55s2s5s5s2bvkz12hwcE"
                    // "SL8878R82YYvkZXZedx1mN";
                }
                this.setState({messages,jobQnAModeOn:true},()=>{
                // api calls
                let chatId=getNewChatId();
                this.submitCandidateResponse("Fellow Select","");
                if(this.props.currentJob.allowCandidatesToChat == undefined || this.props.currentJob.allowCandidatesToChat)
                this.setUpOneOnOneChat(chatId,name);              
                else
                this.setNextQuestion();
            });   
        },1500);
        });
    }

    setUpOneOnOneChat(chatId,name){
        swal({
            title: `Setting Up your One on One chat with ${name}!`,
            html: 'It usually takes 1-2 minutes to set up One on One Chat.',
            onOpen: () => {
              swal.showLoading()
            },
            onClose: () => {
            }
          });
        this.addChatToCandidateAndRecruiter(chatId);
    }

    addChatToCandidateAndRecruiter(chatId){
        let chatObj={
            "domain": this.props.currentRecruiter.domain,
            "recruiterId": this.props.currentRecruiter.userID,
            "chatId": chatId||getNewChatId(),
            "timestamp": Date.now(),
            "status": "pending",
            "number": this.props.currentCandidate.candidateContact,
            "recName":this.props.currentRecruiter.name,
            "candName":this.props.currentCandidate.candidateName
        };
        var settings = {
            "url": URL.ADD_ONE_ON_ONE_CHAT,
            "method": "POST",
            "headers": {
             },
            "processData": false,
            "data": JSON.stringify(chatObj)
        }
          
          $.ajax(settings)
          .done(response=>{
            console.log(response);
            // debugger;
            this.props.addOneOnOneChat(chatObj);
            this.addChatToCandidateAndRecruiterInFirebase(chatObj);
          }).fail(err=>{
              console.log(err);
            swal("Error submitting chat response!","Please check your internet connection and press ok to retry.","warning").then(result=>{
              if(result.value)
                this.submitCandidateResponse();
              else
                swal("Your one on one chat couldn't be set up.","","error");
            });
          });
    }

    addChatToCandidateAndRecruiterInFirebase(chatObj){
        let db=this.props.firebase.database();
        let chatRef=db.ref(chatObj.domain+"/chats/"+chatObj.chatId);
        // let membersRef="" :todo
        // for test : let chatRef=db.ref("random/chats/11225533665544");
        try{
        chatRef
        .set({
            jobId:this.props.currentJob.jobID,
            title:"", 
            // status:"active|block|pending",
            status:"pending",
            lastmessage :{
             "mediaUrl" :"",
             "message" :"",
             "name" :"",
             "photoUrl":"",      
             "sender":"",
             "timestamp":Date.now(),
             "status":"unseen"
            }
        });
        if(this.props.isDeviceMobile)
            this.props.updateCurrentChat({});
        swal("One on One Chat successfully setted up.","Your one on one chat have been successfully setted up. Please continue with the selection process through recruiter chatbox.","success");
        }
        catch(e){
            swal("Your one on one chat couldn't be set up.","","error");
        }
    }

    addBotChat(chat,number=this.props.currentCandidate.candidateContact){
        let {domain,chatId,timestamp}=chat;
        var settings = {
            "url": URL.ADD_BOT_CHAT,
            "method": "POST",
            "headers": {
             },
            "processData": false,
            "data": JSON.stringify({
                chat:{
                    domain,chatId,timestamp,number
                },
                number:number
            })
        }
          if(number && chat)
          $.ajax(settings)
          .done(response=>{
            console.log(response);
            this.addBotChatInFirebase(chat);
            // debugger;
          }).fail(err=>{
              console.log(err);
            // swal("Error submitting chat response!","Please check your internet connection and press ok to retry.","warning").then(result=>{
            //   if(result.value)
            //     this.submitCandidateResponse();
            //   else
            //     swal("Your one on one chat couldn't be set up.","","error");
            // });
          });
    }

    addBotChatInFirebase(chatObj){
        let db=this.props.firebase.database();
        let chatRef=db.ref(chatObj.domain+"/messages/"+chatObj.chatId);
        try{
            let messages=JSON.parse(JSON.stringify(this.state.messages.map(obj=>{obj.element="Statement"; return obj;})));
            messages.push( this.generateAnswerMessage("Hope to see you soon!") );
            messages.push( this.generateAnswerMessage("Take care 😃") );

        chatRef
        .set(messages);
        // swal("One on One Chat successfully setted up.","Your one on one chat have been successfully setted up. Please continue with the selection process through recruiter chatbox.","success");
        }
        catch(e){
            // swal("Your one on one chat couldn't be set up.","","error");
        }
    }

    loadBotChats(chatObjs){
        
        let db=this.props.firebase.database();
        if(Array.isArray(chatObjs)){
            chatObjs.forEach(obj=>{
         if(obj instanceof Object && obj.chatId){
            let messageRef=db.ref(obj.domain+"/messages/"+obj.chatId);
            let messages=JSON.parse(JSON.stringify(this.state.messages));
            messageRef.limitToLast(this.state.count).once('value',
            (snapshot)=>{
                let data=snapshot.val();
                let arr=[];
                for(var x in data)
                arr.push(data[x])
                messages.concat(arr);
                this.setState({messages});
                });            
            }
        })
        }
    }

    

   
//    reponse submission handles
    submitSingleChoiceAnswer(question,answer){
        let {qna,answerMessageObj}=this.generateQnaAndAnswerMessage(question,answer);
        this.setNextQuestion(answerMessageObj,qna);
    }

    submitMultipleChoiceAnswer(question,answer){
        let {qna,answerMessageObj}=this.generateQnaAndAnswerMessage(question,answer);
        this.setNextQuestion(answerMessageObj,qna);    
    }
    // will be used for both- questions and suggestions too
    submitQuestionInputAnswer(question,answer){
        let {qna,answerMessageObj}=this.generateQnaAndAnswerMessage(question,answer);
        this.setNextQuestion(answerMessageObj,qna);    
    }

    submitEmailInputAnswer(question,answer){
        let isEmailValid=emailValidationCheker(answer);
        let {qna,answerMessageObj}=this.generateQnaAndAnswerMessage(question,answer);
        if(isEmailValid){
        this.setNextQuestion(answerMessageObj,qna);}
        else{
            let messages=JSON.parse(JSON.stringify(this.state.messages));
            messages.push(answerMessageObj);
            messages.push({
                "id": "251300EE-28A4-43D0-92FB-271020BC034D"
                , "element": "Email"
                , "type": "text"
                , "name": "Email"
                , "required": false
                , "label":question.errormsg,
                "errormsg": "Please enter a valid email address",
                "prevlabel":"What is your email address?"
            });
            this.setState({messages,
                userInputActive:true});
        }    
    }

    submitNumberInputAnswer(question,answer){
        let {qna,answerMessageObj}=this.generateQnaAndAnswerMessage(question,answer);
        if(!isNaN(answer)){
        this.setNextQuestion(answerMessageObj,qna);
        }
        else{
            let messages=JSON.parse(JSON.stringify(this.state.messages));
            messages.push(answerMessageObj);
            messages.push({
                "id": "78BABCCD-257A-418B-A7D6-0B5C9B350E9F"
                , "element": "Number"
                , "type": "text"
                , "name": "Number"
                , "validate": "number"
                , "required": false
                , "errormsg": "Please enter a valid number"
                , "label":"Please enter a valid number",
                "prevlabel":question.label
            });
            this.setState({messages,
                userInputActive:true});
        }   
    }

    submitPhoneNumberInputAnswer(question,answer){
        let isPhnoValid=phoneNumberValidationCheck(answer);
        let {qna,answerMessageObj}=this.generateQnaAndAnswerMessage(question,answer);
        if(isPhnoValid){
        this.setNextQuestion(answerMessageObj,qna);
        }
        else{
            let messages=JSON.parse(JSON.stringify(this.state.messages));
            messages.push(answerMessageObj);
            messages.push({
                "id": "78BABCCD-257A-418B-A7D6-0B5C9B350E9F"
                , "element": "PhoneNumber"
                , "type": "text"
                , "name": "PhoneNumber"
                , "validate": "PhoneNumber"
                , "errormsg": "Please enter a valid phone number"
                , "label":"Please enter a valid phone number",
                "prevlabel":question.label
            });
            this.setState({messages,
                userInputActive:true});
        }   
    }

    submitRangeSelectAnswer(question,answer){
        let {qna,answerMessageObj}=this.generateQnaAndAnswerMessage(question,answer);
        this.setNextQuestion(answerMessageObj,qna);    
    }

    submitRatingInputAnswer(question,answer){
        let {qna,answerMessageObj}=this.generateQnaAndAnswerMessage(question,answer);
        this.setNextQuestion(answerMessageObj,qna);    
    }

    submitDatePickerAnswer(question,answer){
        let {qna,answerMessageObj}=this.generateQnaAndAnswerMessage(question,answer);
        this.setNextQuestion(answerMessageObj,qna);    
    }

    submitTimePickerAnswer(question,answer){
        let {qna,answerMessageObj}=this.generateQnaAndAnswerMessage(question,answer);
        this.setNextQuestion(answerMessageObj,qna);    
    }



    generateQnaAndAnswerMessage(question,answer){
        let qna={
            question:question.label, 
            response:answer,
            sender:this.props.currentCandidate.candidateEmail,
            timestamp:Date.now()
        }
        let answerMessageObj={
            label:answer.toString(),
            element:"Statement",
            sender:this.props.currentCandidate.candidateEmail,
            photoUrl:"",
            timestamp:Date.now()
        };

        return {qna,answerMessageObj};
    }

    generateAnswerMessage(answer,isForBot){
        let answerMessageObj={};
        if(isForBot)
        answerMessageObj={
            label:answer.toString(),
            element:"Statement",
            timestamp:Date.now(),
            sender:"",
            photoUrl:this.state.botimage
        };
        else
        answerMessageObj={
            label:answer.toString(),
            element:"Statement",
            sender:this.props.currentCandidate.candidateEmail
            ,timestamp:Date.now(),
            photoUrl:"assets/image/user.png"
        };
6
        return answerMessageObj;    
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
                    <img src="assets/image/left-arrow.png" onClick={()=>{
                        if(this.state.openInfoBox)
                        this.setState({openInfoBox:!this.state.openInfoBox})
                        
                        else // if(this.props.isDeviceMobile)
                            this.props.updateCurrentChat({})
                        }} className="btn visible-xs-inline-block" style={{color:"black",}}/>
                    {/* <i className="fa fa-arrow-left"></i> */}
                    <img src="assets/image/user.png" alt="User" className="direct-chat-img" style={{width:45,height:45,marginTop:2}}/>
                </div>
                <h6 className="text-cap" dangerouslySetInnerHTML={{__html:this.props.currentChat.recName||this.props.currentChat.title||"Guest"}}></h6>
                <p className="grey_col" style={{fontSize:12}}> <i className="fa fa-circle" style={{fontSize:12,color:"#0778BD"}}></i> Active now</p>
      </div>
     <div className={"paddinglr10 row "+(this.state.openInfoBox?"open-info":"")}>
                  
        <div className="direct-chat box-warning  direct-chat-warning" >
            <div className="box-body" id="messages-list">
                <div className="direct-chat-messages" style={{height:'calc(100vh - 155px'}} 
                id="messages-list-cont">
                    
                    <MessageList 
                    currentQuestion={this.state.currentQuestion}
                    currentChat={this.props.currentChat}
                    isBotActive={this.props.isBotActive}
                    currentCandidate={this.props.currentCandidate}
                    currentJob={this.props.currentJob}
                    userInputActive={this.state.userInputActive}
                    botimage={this.props.botimage}
                    currentRecruiter={this.props.currentRecruiter}
                    jobQnAModeOn={this.state.jobQnAModeOn}
                    nextQuestion={this.state.nextQuestion}
                    
                    submitSingleChoiceAnswer={this.submitSingleChoiceAnswer.bind(this)}
                    submitMultipleChoiceAnswer={this.submitMultipleChoiceAnswer.bind(this)}
                    submitRangeSelectAnswer={this.submitRangeSelectAnswer.bind(this)}
                    submitDatePickerAnswer={this.submitDatePickerAnswer.bind(this)}
                    submitTimePickerAnswer={this.submitTimePickerAnswer.bind(this)}
                    submitBooleanResponse={(val)=>this.submitBooleanResponse(val)}
                    submitJOBQNAResponse={this.submitJOBQNAResponse.bind(this)}
                    messages={this.state.messages}/>
                    
                </div>
            
             {/* <MessageInput 
             currentQuestion={this.state.currentQuestion}
             currentChat={this.props.currentChat}
             isBotActive={this.props.isBotActive}
             firebase={this.props.firebase}
             currentCandidate={this.props.currentCandidate}
    currentRecruiter={this.props.currentRecruiter}
    currentJob={this.props.currentJob}
             jobQnAModeOn={this.state.jobQnAModeOn}
             userInputActive={this.state.userInputActive}
             nextQuestion={this.state.nextQuestion}
             currentChatId={this.props.currentChat.chatId}
             currentCandidate={this.props.currentCandidate}
             disableUserInput={()=>this.setState({userInputActive:false})}
             submitBooleanResponse={(val)=>this.submitBooleanResponse(val)}
             submitEmailInputAnswer={this.submitEmailInputAnswer.bind(this)}
             submitQuestionInputAnswer={this.submitQuestionInputAnswer.bind(this)}
             submitNumberInputAnswer={this.submitNumberInputAnswer.bind(this)}
             submitPhoneNumberInputAnswer={this.submitPhoneNumberInputAnswer.bind(this)}
             submitLocationInputAnswer={this.submitQuestionInputAnswer.bind(this)}
             submitSelectInputAnswer={this.submitQuestionInputAnswer.bind(this)}
             submitJOBQNAResponse={this.submitJOBQNAResponse.bind(this)}
             /> */}
            </div>                   
        </div>
       
        <div>   
           <UserInfo 
    currentRecruiter={this.props.currentRecruiter}
    setState={(obj)=>this.setState(obj)}
            currentChat={this.props.currentChat}
            isBotActive={this.props.isBotActive}
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
      if(this.props.botShellMessages.length<this.state.messages.length)
      this.props.updateBotShellMessages(this.state.messages);
      
  }
   
  componentDidMount(){
    //   this.checkAndInitChat(this.props);
    var settings = {
        // "url": URL.GET_CANDIDATE_JOB_RECRUITER_OBJ,
        url:URL.GET_BOT_CHATS+"?jobs_candidate_id="+this.props.job_cand_id,
        // URL.VERIFY_TOKEN,
        "method": "GET",
      };
      $.ajax(settings)
          .done(response=>{
            console.log(response.data);
            this.setState({
              responses:response.data
            })
          }).fail(err=>{
              console.log(err);
          });
  }


}

export default BotShell;    
