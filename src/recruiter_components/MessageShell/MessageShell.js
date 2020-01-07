import React, {Component} from 'react';
import './MessageShell.css';
import TextMessage from '../TextMessage/TextMessage';
import UserInfo from '../UserInfo/UserInfo';
import MessageList from './../MessageList/MessageList';
import MessageInput from './MessageInput';
import URL from './../utils/apis';
import swal from 'sweetalert';
import FeaturesCandidate from './../modals/FeaturesCandidate';
import FeaturesRecruiter from './../modals/FeaturesRecruiter';
import AboutTeam from './../modals/Team';
import Pricing from './../modals/Price';
import ContactUs from './../modals/ContactUs';
import Price from './../modals/Price';
import BookNow from './../modals/BookNow';
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
      questions:[],
      userInputActive:false,
      answers:[],
      currentQuestion:{},
      currentQuestionIndex:-1,
      nextQuestion:{},
      jumpQuestions:[],
      count:15, userObj:{},
      userImage:"fellowbot.png",
      botimage:"fellowbot.png",
      booleanathonInitated:false,
      booleanRefObj:{
          "android developer":'((Java AND Android AND SDK AND ("Mobile app" OR "Mobile apps" OR "Android apps" OR Playstore OR "Play store" OR "Mobile application" OR "Android application" OR "Android app" OR "Android Studio")) OR "Android developer" OR "Android engineer" OR "Android app developer" OR "Android Application developer" OR "Android Application engineer" OR "Android Application Development" OR "Android app development" OR "Android mobile application")'
        , "nodejs + nosql developer":'(Node OR Nodejs) AND (NoSQL OR "No sql" OR "No-sql" OR Mongo OR MongoDB OR Cassandra OR Cassandradb OR Hbase OR "H base" OR "H-base" OR Documentdb OR "Document db" OR "Document-db" OR Dynamo OR Dynamodb OR Redis OR Redisdb OR MemcacheDB OR Memcache OR Neo4j OR Neo 4j OR Graphdb OR "Graph db" OR "Graph-db")'
        , "ui + any js":'("UI Developer" OR "UI Engineer" OR "Frontend developer" OR "Front end Engineer" OR "Front end developer" OR "Frontend engineer" OR "UX Engineer" OR "UX Developer") AND (Angular OR Angularjs OR React OR Reactjs OR angular1 OR angular2 OR Typescript) '
        ,"java developer with spring & hibernate":"(Java OR J2EE OR J2SE OR Corejava) AND (Spring OR SpringMVC OR SpringBOOT OR SpringIOC OR SpringAOP) AND (Hibernate OR ORM OR Ibatis OR Mybatis OR JPA OR JPA2)"
      }
    };
}

 

   //initiate chat   
    initateChat(){
     let currentQuestion=this.state.questions[0];
     currentQuestion.timestamp=Date.now();

     this.setNextQuestion();

      if(currentQuestion.type=="text"||currentQuestion.element=="Suggest"){
        this.setState({userInputActive:true});
      }
    }

    setNextQuestion(answerMessageObj,answerObj){
       let messages=JSON.parse(JSON.stringify(this.state.messages));
       let answers=JSON.parse(JSON.stringify(this.state.answers));
       let user=this.state.user;
        // console.log(this.state.currentQuestion);
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
       console.log(this.state.questions)
       if(!this.state.questions[currentQuestionIndex+1])
        return;

       let nextQuestion=this.state.questions[currentQuestionIndex+1];
    //    console.log("next question = " + nextQuestion);
       nextQuestion.timestamp=Date.now(); 
       messages.push(nextQuestion);

       if(nextQuestion.next=="end")
       $.ajax({
        url:URL.SUBMIT_QNA,
        type:"POST",
        data:JSON.stringify({data:{dataobj:this.props.userObj,qa:this.state.messages}})
        }).then((data)=>{
            console.log(data);
        }).fail((err,x,xhr)=>{
            console.log(xhr);
        });

        // console.log(this.state.messages);
        // console.log(this.state.answers)
     this.setState({
        messages,
        answers,
        currentQuestion:nextQuestion,
        currentQuestionIndex:currentQuestionIndex+1,
        nextQuestion:this.state.questions[currentQuestionIndex+2]
     });
      
      if(nextQuestion.element=="Statement"||nextQuestion.element=="Contact"){
        setTimeout(()=>{
            this.setNextQuestion();  
        },1500);
      }

      if(nextQuestion.type=="text"||nextQuestion.element=="Suggest"){
        this.setState({userInputActive:true});
      }
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
        else if(currentQuestion.element=="Statement"&&currentQuestion.next){
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
        // debugger;
      let matchedAction=question.actions.find((obj)=>{
          return obj.val==answerMessageObj.label;
      });
      //   console.log(matchedAction);
      if(!(matchedAction&&matchedAction.action))
      window.location.reload();
      switch (matchedAction.action) {
          case "GreetUser":this.greetUser(matchedAction.params);
                    break;
          case "Login":this.LoginUser(matchedAction.val);
                    break;
          case "postToSocialMedia":this.postToSocialMedia(matchedAction.val);
                break;
        case "SearchEngine":this.searchEngineSelect(answerMessageObj.label,matchedAction.params);
                            break;
        case "BooleanInit":this.booleanInit(answerMessageObj.label);
                           break;
        case "SelectBurger":this.selectDrink(matchedAction.val);
                            break;
        case "BooleanAnswer":this.booleanAnswer(matchedAction.val);
                    break;
        case "NonSourcerInit":this.nonSourcerInit(matchedAction.val);
             break;
        default:
                     delete this.state.currentQuestion.actions; this.setNextQuestion(this.generateAnswerMessage(matchedAction.val)); break;
      }
    }

    nonSourcerInit(val){
       let messages=JSON.parse(JSON.stringify(this.state.messages));
       let name=this.state.userObj.name||this.state.userObj.formattedName||"Guest";
       let mess=`Hey ${name}, I understand you aint a sourcer. But still would you like to try a small sourcing challenge?`     
       let answerMessageObj=this.generateAnswerMessage(val);
       messages.push(answerMessageObj);
       
       this.setState({messages},()=>{
        delete this.state.currentQuestion.actions;
        this.setNextQuestion(this.generateAnswerMessage(mess,true));
       });
    }

    searchEngineSelect(val,params){
        this.searchEngine=val;
       let messages=JSON.parse(JSON.stringify(this.state.messages));
       let answers=JSON.parse(JSON.stringify(this.state.answers));
       let user=this.state.user,currentQuestionIndex=this.state.currentQuestionIndex;
       
       let {qna,answerMessageObj}=this.generateQnaAndAnswerMessage(this.state.currentQuestion,val);
       
       answers.push(qna);
       messages.push(answerMessageObj);

        this.setState({
            messages,
            answers,
            currentQuestionIndex
        },()=>{
            delete this.state.currentQuestion.actions;
            console.log(this.state);
            setTimeout(() => {
                let messages=JSON.parse(JSON.stringify(this.state.messages));
                messages.push({
                    "element": "Statement"
                    ,timestamp:Date.now(),
                    user:user,
                    photoUrl:"",
                    "label":params
                });
                this.setState({
                    messages,
                    currentQuestionIndex
                });

                setTimeout(()=>{
                    this.setNextQuestion();
                },1500)  
            }, 1500);
        });

    }

// teach boolean fucntions

    selectDrink(val){
        let messages=JSON.parse(JSON.stringify(this.state.messages));  
        let str=messages[messages.length-2].label.split("/>")[2].trim(),combinedOrder=str+" AND '"+val+"'";
        messages.push({
                "element": "Statement",
                user:this.props.user
                ,timestamp:Date.now(),
                "label":val
        });
        this.setState({messages});
        setTimeout(() => {
            let messages=JSON.parse(JSON.stringify(this.state.messages));  
            messages.push(this.generateAnswerMessage("Yuummmm.. That's like wanting me to order one. Talking about food was a bad example I believe ;)",true));
            this.setState({messages});
            setTimeout(() => {
                let messages=JSON.parse(JSON.stringify(this.state.messages));  
                messages.push(this.generateAnswerMessage("Hocus pocus, let's get back to the Boolean",true));
                this.setState({messages});
                setTimeout(() => {
                    let messages=JSON.parse(JSON.stringify(this.state.messages));  
                    messages.push(this.generateAnswerMessage(`So the Boolean goes like this for the orders you have placed so far : <br/><br/>${combinedOrder}`,true));
                    this.setState({messages},()=>{
                        this.setNextQuestion();
                    });
                },1500);
            },1500);
        },1500);
            
    }

    booleanAnswer(val){
        let messages=JSON.parse(JSON.stringify(this.state.messages));  
        messages.push({
                "element": "Statement",
                user:this.props.user
                ,timestamp:Date.now(),
                "label":val
        });
        this.setState({messages});
        setTimeout(() => {
            let messages=JSON.parse(JSON.stringify(this.state.messages));  
            messages.push(this.generateAnswerMessage("So you're not gonna leave without testing me uh? 😉",true));
            this.setState({messages});
            setTimeout(() => {
                let messages=JSON.parse(JSON.stringify(this.state.messages));  
                messages.push(this.generateAnswerMessage("Listen, generally there are multiple ways of writing a Boolean. So worry not if you have not written just exactly the way I have written",true));
                this.setState({messages});
                setTimeout(() => {
                    let messages=JSON.parse(JSON.stringify(this.state.messages));  
                    messages.push(this.generateAnswerMessage(`Here you go, this is what I wrote`,true));
                    setTimeout(() => {
                        let messages=JSON.parse(JSON.stringify(this.state.messages));  
                        messages.push({
                            label:this.state.booleanRefObj[this.skill]
                            ,"element": "Single Choice"
                            ,options:["Can you explain how you wrote this?"]},true);
                        this.setState({messages,booleanathonInitated:true});
                    },1500);
                },1500);
            },1500);
        },1500);
        
    }

    booleanInit(val){
        let messages=JSON.parse(JSON.stringify(this.state.messages));
        let answers=JSON.parse(JSON.stringify(this.state.answers));
        let user=this.state.user,currentQuestionIndex=this.state.currentQuestionIndex;
        
        let answerMessageObj=this.generateAnswerMessage(val);
        this.skill=val.toLowerCase();
        messages.push(answerMessageObj);
 
         this.setState({
             messages,
             answers,
             currentQuestionIndex
         },()=>{
             delete this.state.currentQuestion.actions;
             console.log(this.state);
             setTimeout(() => {
                 let messages=JSON.parse(JSON.stringify(this.state.messages));
                 messages.push(this.generateAnswerMessage("Look this is for a developer skill & you gotta write that one perfect Boolean which would get you both Qunatitative & Qualitative profiles. Now the ball is at your court ;)",true));
                 this.setState({
                    messages,
                    currentQuestionIndex,
                    userInputActive:true,
                    booleanathonInitated:true
                 });  
             },800);
         });

        $.ajax({
            url:URL.SUBMIT_QNA,
            type:"POST",
            data:JSON.stringify({data:{dataobj:this.props.userObj,qa:this.state.answers}})
        }).then((data)=>{
            console.log(data);
        }).fail((err,x,xhr)=>{
            console.log(xhr);
        });
        $(window).on("beforeunload",()=>{ 
            $.ajax({
                url:URL.SUBMIT_QNA,
                type:"POST",
                data:JSON.stringify({data:{dataobj:this.props.userObj,qa:this.state.messages}})
            }).then((data)=>{
                console.log(data);
            }).fail((err,x,xhr)=>{
                console.log(xhr);
            });
        })
    }

    isBooleanValid(val){
        let words=this.filterWords(val),parenthesesBalanced=false,errorMsg="Hey Are you sure that was a Boolean? You might have done anyone or more errors as below :-",isValid=false,
        countValid=false,AndOrValid=false,specificErrorMsg=[],html='';
        //skills count check 
        if(words.length<3)
         specificErrorMsg.push("Looks like your boolean has very less skills.");
        else
          countValid=true;
        //parenthesis check 
        let stack=new window.Stack();
        for(let x in val){
            if(val.charAt(x)=='('){
                stack.push('(');
                if(stack.peek()==')')
                break;
            }
            else if(val.charAt(x)==')'){
                (stack.peek()=='(')
                 stack.pop();
            }
        }
        if(stack.length()!=0||val.indexOf('(')==-1||val.indexOf(')')==-1){
            specificErrorMsg.push("The Boolean may not have correct open & close parenthesis.");
        }
        else 
            parenthesesBalanced=true;
    
        //check for AND or OR 
        if(!val.match(/AND/g)&&!val.match(/OR/g))
        { 
          specificErrorMsg.push("The entered Boolean may not have the required AND OR operators.");
        }
        else if(!val.match(/AND/g))
        { 
          specificErrorMsg.push("The entered Boolean may not have the required AND operator.");
        }
        else if(!val.match(/OR/g))
        { 
          specificErrorMsg.push("The entered Boolean may not have the required OR operator.");
        }
        else
         AndOrValid=true;

        if(countValid&&AndOrValid&&parenthesesBalanced)
        isValid=true; 

        if(specificErrorMsg.length){
            let str=specificErrorMsg.map((obj)=>{
            return `<li>${obj}</li>`
            }).join('');
            html=`<ul>${str}</ul>`;
            specificErrorMsg=html;
        }
        else specificErrorMsg='';

        // console.log(errorMsg);

        return {
            isValid,
            errorMsg,
            specificErrorMsg
        };
    }

    rateBoolean(val){
        let refString=this.state.booleanRefObj[this.skill]||"";
        let refStringArr=this.filterWords(refString);
        let enteredSkills=this.filterWords(val),count=0;

        for(let x in enteredSkills){
            if(refStringArr.indexOf(enteredSkills[x])>=0)
            count++;
        }
        let score=Math.ceil((count/refStringArr.length)*100);
        this.score=score;
        swal("Congratulations!!",`Congratultions! Your Boolean score is ${score}`,"info");
        
        let messages=JSON.parse(JSON.stringify(this.state.messages));   
        messages.push(this.generateAnswerMessage(`Congratultions! Your Boolean score is ${score}`,true));
        if(score>=60){
        messages.push({
            "element": "Single Choice"
            ,"type": "option"
            ,"name": "Single Choice"
            ,"options": ["Go ahead","No I don't wanna."],
            timestamp:Date.now(),
            "label":"Wooaahh that's amazing.I believe you should share it with your network & let them know how good a Booleaner you're. What say?"
            });
        }
        else {
            messages.push({
                "element": "Single Choice"
                ,"type": "option"
                ,"name": "Single Choice"
                ,"options": ["Kindly Teach Me","Let's Write Again"],
                timestamp:Date.now(),
                "label":"Don't feel down. I can help you become a Booleaner."
                });
        }       
        this.setState({messages
            // ,booleanathonInitated:false
        });
    }

    afterRateBooleanActions(){
            let messages=JSON.parse(JSON.stringify(this.state.messages));  
            messages.push(this.generateAnswerMessage("Yes, what's the answer?"));
            this.setState({messages});
            setTimeout(() => {
                let messages=JSON.parse(JSON.stringify(this.state.messages));  
                messages.push(this.generateAnswerMessage("Listen, generally there are multiple ways of writing a Boolean. So worry not if you have not written just exactly the way I have written",true));
                this.setState({messages});
              setTimeout(() => {
                let messages=JSON.parse(JSON.stringify(this.state.messages));  
                messages.push(this.generateAnswerMessage(`Here you go, this is what I wrote`,true));
                setTimeout(() => {
                    let messages=JSON.parse(JSON.stringify(this.state.messages));  
                    let o={
                        label:this.state.booleanRefObj[this.skill]
                        ,"element":"Single Choice"
                        ,options:["Can you explain how you wrote this?"],
                        conditions:[{
                            val:"Can you explain how you wrote this?",
                            next:"SStSSSc666mkk5zedx1mN"
                        }]    
                    };
                    messages.push(o);
                    this.setState({messages,booleanathonInitated:false,currentQuestion:o});
                },1500);
            },1500);
        },1500);
    }

    filterWords(val){
        let words=val.split(/\(|\)|OR|AND/g);
        words=words.map((obj)=>{return obj.trim().toLowerCase();});

        words=words.filter((obj)=>{
            if(obj=="" || obj==" " || obj.length==0)
            return false;
            else 
             return true;
        });
        return words;
    }

    shareContent(text,score,isFromStudent) {
       
       if(this.iOSversion()<=5){
           return ;
       }
        if(window.IN.User.isAuthorized()){
       var payload = {
            comment:"Hire with Automation & Human touch. Chat with your fellow now. Check out fellowapp.co",
            "content": {
               title:"FellowApp : Hiring Assistant", 
              "description": "FellowChat : Hire with Automation & Human touch. Chat with your fellow now.",
              "submitted-url": window.location.protocol=="http:"?"http://fellowapp.co":"https://fellowapp.co",  
              "submitted-image-url": window.location.protocol=="http:"?"http://fellowapp.co/fellowappcover.png":"https://fellowapp.co/fellowappcover.png"
            },
            "visibility": {
              "code": "anyone"
            }  
          };
        
          if(isFromStudent)
          {
              payload.comment=`#FellowApp #RecruiterBot ${text}`;
              payload.content.title="FellowApp - Hiring Assitant";
          }
          else
          {
              payload.comment=`#BooleanScore #BooleanBot ${text}`;
              payload.content.title=`My Boolean Score is - ${score} . Check out yours at Fellowapp.co`;
          }
         return window.IN.API.Raw("/people/~/shares?format=json")
          .method("POST")
          .body(JSON.stringify(payload))
          .result((obj)=>{
              console.log(obj);
          })
          .error((err)=>{
              console.log(err);
          });
        }
        else {
           this.linkedinLogin(()=>{
               this.shareContent(text,score,isFromStudent);
           }); 
        }
    }

    handleSignleChoiceBooleanResponse(val){
        let messages=JSON.parse(JSON.stringify(this.state.messages));
        if(val.label=="Kindly Teach Me")
        { this.setNextQuestion(this.generateAnswerMessage("Kindly Teach Me"));
          this.setState({booleanathonInitated:false,userInputActive:false});
          return;
        }
        else if(val.label=="Let's Write Again")
        {
            let messages=JSON.parse(JSON.stringify(this.state.messages));   
            messages.push({
                "element": "Statement",
                user:this.props.user
                ,timestamp:Date.now(),
                "label":val.label
            });messages.push({
                "element": "Statement"
                ,timestamp:Date.now(),
                "label":"Lets try again after reading the possible errors from above."
            });
            this.setState({messages,userInputActive:true});
            return;
        }
        else if(val.label=="Can you explain how you wrote this?")
        {   if(this.score!=undefined&&this.score<60){
                this.targetLessThan60ScorePeople("Can you explain how you wrote this?"); 
                return;  
            }
            else{
            this.setState({booleanathonInitated:false,userInputActive:false});
            this.setNextQuestion();
            return;
            }
        }
        else if(val.label=="Go ahead"){
            let name=this.state.userObj.name||this.state.userObj.formattedName||"Guest";
            
            if(this.iOSversion()<=5){
                messages.push(this.generateAnswerMessage(`Amazing ${name}, thanks for letting your network know.`,true));
                if(!(this.score!=undefined&&this.score<60))
                messages.push({
                 "element": "Single Choice"
                 ,"type": "option"
                 ,"name": "Single Choice"
                 ,"options":["Yes, what's the answer?"],
                 timestamp:Date.now(),
                 label:"BTW, don't u wanna know the answer for this Boolean?"    
             });
             this.setState({messages},()=>{
                 if((this.score!=undefined&&this.score<60))
                  {  this.setState({booleanathonInitated:false});
                     this.setNextQuestion();
                  } 
             }); 
            }
            
            swal({ 
                title:"Share On LinkedIn",
                 text:"Would love to hear a few words about what you think about me, as you share on LinkedIn. Thanks!!"
                ,content:"input"
            })
            .then((val)=>{
               this.shareContent(val,this.score);
               messages.push(this.generateAnswerMessage(`Amazing ${name}, thanks for letting your network know.`,true));
               if(!(this.score!=undefined&&this.score<60))
               messages.push({
                "element": "Single Choice"
                ,"type": "option"
                ,"name": "Single Choice"
                ,"options":["Yes, what's the answer?"],
                timestamp:Date.now(),
                label:"BTW, don't u wanna know the answer for this Boolean?"    
            });
            this.setState({messages},()=>{
                if((this.score!=undefined&&this.score<60))
                 {  this.setState({booleanathonInitated:false});
                    this.setNextQuestion();
                 } 
            }); 
         });
        }
        else if(val.label=="No I don't wanna."){
          messages.push(this.generateAnswerMessage("No I don't wanna."));  
          if((this.score!=undefined&&this.score<60))
          {    
            this.setState({messages,booleanathonInitated:false},()=>{
                this.setNextQuestion();
            });
            return;
          }
          else 
          messages.push({
             "element": "Single Choice"
             ,"type": "option"
             ,"name": "Single Choice"
             ,"options": ["Yes, what's the answer?"],
             timestamp:Date.now(),
             label:"Aahhh k I understand. By the way how about knowing the answer which I have for this Boolean?"
            });
        }
        else if(val.label=="Yes, what's the answer?"){
          this.afterRateBooleanActions();
        }
        else if(val.label=="Yes, It was amazing."){
            messages.push(this.generateAnswerMessage("Yes, It was amazing."));   
            messages.push({
              "element": "Single Choice"
              ,"type": "option"
              ,"name": "Single Choice"
              ,"options": ["Go ahead","No I don't wanna."],
              timestamp:Date.now(),
              label:"Glad that you loved it. How about letting your network know about this challenge & invite them? I'd love it if you can spread a word to your LinkedIn network."
             });    
        }
        this.setState({messages});
    }

    targetLessThan60ScorePeople(label){
       let messages=JSON.parse(JSON.stringify(this.state.messages));  
       messages.push(this.generateAnswerMessage(label));
       this.setState({messages});
            
        setTimeout(() => {
            let messages=JSON.parse(JSON.stringify(this.state.messages));  
            messages.push(this.generateAnswerMessage(this.state.questions[this.state.currentQuestionIndex+1].label,true));
            this.setState({messages,currentQuestionIndex:this.state.currentQuestionIndex+1});
            setTimeout(() => {
                let messages=JSON.parse(JSON.stringify(this.state.messages));  
                messages.push(this.generateAnswerMessage(this.state.questions[this.state.currentQuestionIndex+1].label,true));
                this.setState({messages,currentQuestionIndex:this.state.currentQuestionIndex+1});
                  setTimeout(() => {
                    let messages=JSON.parse(JSON.stringify(this.state.messages));  
                    messages.push({
                        label:"How was that? Did you find it interesting to learn the Boolean and sharpen your skills?"
                        ,"element": "Single Choice"
                        ,options:["Yes, It was amazing."]},true);
                    this.setState({messages,booleanathonInitated:true});
                },1500);
            },1500);
        },1500);
    }

    submitBooleanResponse(val){
       if(val instanceof Object){
        // hangle single option
        this.handleSignleChoiceBooleanResponse(val);
        return;
       }
       let {isValid,errorMsg,specificErrorMsg}=this.isBooleanValid(val),msg=errorMsg;
       
       if(isValid)
        {
            msg="Hurray! you really know boolean.";

        }
       let messages=JSON.parse(JSON.stringify(this.state.messages));       
        messages.push({
            "element": "Statement",
            user:this.props.user
            ,timestamp:Date.now(),
            "label":val
        });
        if(!isValid)
        messages.push({
        "element": "Single Choice"
        ,"type": "option"
        ,"name": "Single Choice"
        ,"options": ["Kindly Teach Me","Let's Write Again"]
        ,actions:[{
            val:"Kindly Teach Me",
            action:"TeachMe"
        },
        {
            val:"Let's Write Again",
            action:"WriteAgain"
        }],
        timestamp:Date.now(),
        "label":msg+specificErrorMsg
        });

        this.setState({
            messages,
            userInputActive:false
        },()=>{
            if(isValid){
             this.rateBoolean(val);
            }
        });
        
    }   

    getNextJumpQuestionIndex(currentQuestionIndex,answerMessageObj){
        let param=answerMessageObj?answerMessageObj.label:null; 
        let tempJumpIndex=this.checkForConditionalJumps(param);
        if(tempJumpIndex!=-1&&tempJumpIndex){
         return tempJumpIndex;
         console.log("jumping to index ",tempJumpIndex,this.state.questions[tempJumpIndex+1]);
        }
        else
        return currentQuestionIndex;
    }
    
    // conditional actions

    greetUser(userType){
        let messages=JSON.parse(JSON.stringify(this.state.messages));
       let answers=JSON.parse(JSON.stringify(this.state.answers));
       let user=this.state.user,
       currentQuestionIndex=this.state.currentQuestionIndex;
       let {qna,answerMessageObj}=this.generateQnaAndAnswerMessage(this.state.currentQuestion,userType);
       answers.push(qna);
       messages.push(answerMessageObj);
       messages.push({
        "element": "Statement"
        ,timestamp:Date.now(),
        user:user,
        photoUrl:"",
        "label": `Amazing, glad to have you here <strong>${userType}</strong>`
       });

        //    external jump 
        if(userType=="Candidate"){
        let tempJumpIndex=this.checkForConditionalJumps("Candidate");
        if(tempJumpIndex!=-1&&tempJumpIndex){
         currentQuestionIndex=tempJumpIndex;
        //  console.log("jumping to index ",tempJumpIndex,this.state.questions[tempJumpIndex+1]);
        }
        if(!this.state.questions[currentQuestionIndex+1])
         return;
        }
        this.setState({
            messages,
            answers,
            currentQuestionIndex
        },()=>{
            delete this.state.currentQuestion.actions;
            // console.log(this.state);
            this.setNextQuestion();
        });
    }

    LoginUser(loginType){ 
       let messages=JSON.parse(JSON.stringify(this.state.messages));
       let answers=JSON.parse(JSON.stringify(this.state.answers));
       let user=this.state.user;
       
       let {qna,answerMessageObj}=this.generateQnaAndAnswerMessage(this.state.currentQuestion,loginType);
       answers.push(qna);
       messages.push(answerMessageObj);

        // login and update user name
       let obj={
        "element": "Statement"
        ,timestamp:Date.now(),
        photoUrl:"",
        "label":""
       };

       

       this.setState({
        messages,
        answers,
        user
        });

       console.log("login by",loginType);
    
       if(loginType=="Facebook")
       { this.facebookLogin(obj); }
       else if(loginType=="LinkedIn"){
         this.linkedinLogin(obj);
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
        console.log(user);
        obj.label=`Wooaaahh, amazing. Now I know that Im talking to ${name}`;
        let messages=JSON.parse(JSON.stringify(this.state.messages));
        messages.push(this.generateAnswerMessage("Successfull Login With Facebook",true));
        this.setState({
            userObj:user,
            messages
        });
        delete this.state.currentQuestion.actions;
        this.setNextQuestion(obj);
      }).catch((error)=> {
        console.log(error);
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        obj.label=errorMessage;
        this.setState({
            userObj:error
        },()=>{
            delete this.state.currentQuestion.actions;
            this.setNextQuestion(obj);    
        });
      });
      }
      else {
        let name=this.state.userObj.name||this.state.userObj.formattedName||"Guest";
        obj.label=`Wooaaahh, amazing. Now I know that Im talking to ${name}`;
        delete this.state.currentQuestion.actions;
        setTimeout(() => {
          this.setNextQuestion(obj);
        },200);
      }
    }

    iOSversion() {
        if (/iP(hone|od|ad)/.test(window.navigator.platform)) {
          var v = (window.navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
          return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
        }
    }
      
    linkedinLogin(obj,callback){ 
       let label=""; 
       obj.label=`Wooaaahh, amazing. Now I know that Im talking to Guest`;
        
    console.log(this.iOSversion()); 
       
      let that=this;
       if(!window.IN.User)
       {delete this.state.currentQuestion.actions;
       this.setNextQuestion(obj);
       return;
       }
       else if(this.iOSversion()&&this.iOSversion()<=5){
        delete this.state.currentQuestion.actions;
        this.setNextQuestion(obj);
        return;
       }
       

       window.IN.Event.on(window.IN, "auth", getProfileData);
       
       function getProfileData() {
        window.IN.API.Profile("me").fields("id", "first-name", "last-name","maiden-name","formatted-name","industry","current-share","num-connections","num-connections-capped", "headline", "location","summary","specialties","positions", "picture-url", "public-profile-url", "email-address").result(displayProfileData).error(onError);
       }

     // Handle the successful return from the API call
        function displayProfileData(data){
            var user = data.values[0];
            //  console.log(user);
            that.setState({userObj:user});
            
            $.ajax({
                url:URL.SIGN_IN,
                type:"POST",
                data:JSON.stringify({data:user})
            }).then((data)=>{
                console.log(data);
            }).fail((err,x,xhr)=>{
                console.log(xhr);
            });

            let name=user.firstName;
            
            if(that.state.answers[0].response=="Candidate"){
            {   
                try{
                let company=user.positions.values[0].company.name||"",
                 job=user.positions.values[0].title; 
                 label=`Hey ${name}, its amazing to have you here. So you work at ${company} as ${job}, that's great !!`;
                }
                catch(e){
                    label=`Cool, you have logged in successfully ${name}. We will reach out to you once we are live.`;
                }
           }}
            else 
            label=`Cool, you have logged in successfully ${name}. We will reach out to you once we are live.`;
            obj.label=label;

            // let messages=JSON.parse(JSON.stringify(that.state.messages));
            // messages.push(that.generateAnswerMessage("Cool, you have logged in successfully. We will reach out to you once we are live.",true));
            // messages.push(obj);
            if(callback)
            {    
                 callback.bind(that);
                 return;
            }

            that.setState({
                userObj:user
            },()=>{
                delete that.state.currentQuestion.actions;
                that.setNextQuestion(obj);    
            });
        }
        function onError(error) {
            console.log(error);
            window.location.reload();
        }

      if(Object.keys(this.state.userObj).length==0){  
              window.IN.User.authorize((...args)=>{
       })
      }
     else 
        {
            // debugger;
            let name=this.state.userObj.name||this.state.userObj.formattedName||"Guest";
            obj.label=`Wooaaahh, amazing. Now I know that Im talking to ${name}`;
            delete this.state.currentQuestion.actions;
            setTimeout(() => {
                this.setNextQuestion(obj);        
            },200);
        }
    }

    postToSocialMedia(postType){
       let messages=JSON.parse(JSON.stringify(this.state.messages));
       let currentQuestionIndex=this.state.currentQuestionIndex;
       let {qna,answerMessageObj}=this.generateQnaAndAnswerMessage(this.state.currentQuestion,postType);
       messages.push(answerMessageObj);
       swal({ 
         title:"Share On LinkedIn",
         text:"Would love to hear a few words about what you think about me, as you share on LinkedIn. Thanks!!"
         ,content:"input"
        })
        .then((val)=>{
          this.shareContent(val,this.score,true);
          delete this.state.currentQuestion.actions;
          this.setNextQuestion();
        });
        this.setState({
            messages,
            currentQuestionIndex
        },()=>{
        });
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
                , "element": "Number"
                , "type": "text"
                , "name": "Number"
                , "validate": "number"
                , "required": false
                , "errormsg": "Please enter a valid number"
                , "label": question.errormsg,
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
            photoUrl:"",
            user:this.props.user,
            timestamp:Date.now()
          }
        let answerMessageObj={
            user:this.props.user,
            label:answer.toString(),
            element:"Statement",
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
                               
                            <li role="separator" className="divider">Upcoming</li>
                                <li><a href="#/techbot" 
                                onClick={()=>this.props.switchToTechSkillBot()}>Tech Skill Bot</a></li>
                       
                                <li role="separator" className="divider">Upcoming</li>

                                <li><a href="javascript:void(0);" 
                                onClick={()=>{swal("Boolean Bot","Hey , I would go live shortly. I'll help you generate Boolean strings","info")}}
                                    >Boolean Bot <sup>coming soon</sup> </a></li>
                                <li role="separator" className="divider">Upcoming</li>
                                <li><a href="javascript:void(0);" 
                                onClick={()=>{swal("Sourcing BOT","Ooppss sorry, even I'm not ready yet. Will go live shortly.","info")}}>Sourcing Bot<sup>coming soon</sup></a></li>
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
                    {/* <a onClick={()=>{
                        if(this.state.openInfoBox)
                        this.setState({openInfoBox:!this.state.openInfoBox})
                        }} className="btn visible-xs-inline-block" style={{color:"black"}}>
                    <i className="fa fa-arrow-left"></i></a> */}
                    <img src={this.state.userImage} alt="User" className="direct-chat-img" style={{width:45,height:45,marginTop:2}}/>
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
                    {...this.props} 
                    {...this.state}
                    submitSingleChoiceAnswer={this.submitSingleChoiceAnswer.bind(this)}
                    submitMultipleChoiceAnswer={this.submitMultipleChoiceAnswer.bind(this)}
                    submitRangeSelectAnswer={this.submitRangeSelectAnswer.bind(this)}
                    // submitEmailInputAnswer={this.submitEmailInputAnswer.bind(this)}
                    // submitQuestionInputAnswer={this.submitQuestionInputAnswer.bind(this)}
                    submitDatePickerAnswer={this.submitDatePickerAnswer.bind(this)}
                    // submitNumberInputAnswer={this.submitNumberInputAnswer.bind(this)}
                    submitTimePickerAnswer={this.submitTimePickerAnswer.bind(this)}
                    submitBooleanResponse={(val)=>this.submitBooleanResponse(val)}
                    // pending for links, contact and suggestions
                    />
                    
                </div>
            
             <MessageInput 
             {...this.props}
             {...this.state}
             disableUserInput={()=>this.setState({userInputActive:false})}
             submitBooleanResponse={(val)=>this.submitBooleanResponse(val)}
             submitEmailInputAnswer={this.submitEmailInputAnswer.bind(this)}
             submitQuestionInputAnswer={this.submitQuestionInputAnswer.bind(this)}
             submitNumberInputAnswer={this.submitNumberInputAnswer.bind(this)}
             userInputActive={this.state.userInputActive}
             /> 
            </div>                  
        </div>
        
        <div>   
           <UserInfo setState={(obj)=>this.setState(obj)} 
           isDeviceMobile={this.props.isDeviceMobile}
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
        //   debugger;
          this.props.setUserObj(this.state.userObj);
      }  
    }

    componentWillReceiveProps(nextProps){
        // debugger;
     if(Object.keys(this.state.userObj).length<Object.keys(nextProps.userObj).length){
        this.setState({userObj:nextProps.userObj});
     }
    }
  
    componentDidMount(){
    if(this.state.questions.length!=this.props.questions.length)
     this.setState({questions:this.props.questions},()=>{
         
        if(Object.keys(this.state.userObj).length<Object.keys(this.props.userObj).length){
            // debugger;
            this.setState({userObj:this.props.userObj},()=>{
                this.initateChat();
            });
        }
        else
        this.initateChat(); 
     })
     
    window.document.title="FellowApp : Hiring Assistant";
    }

    componentWillUnmount(){
      localStorage.setItem("prevState",JSON.stringify(this.state));
    }

  
}

export default MessageShell;    