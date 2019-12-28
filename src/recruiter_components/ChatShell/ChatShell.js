
// add all info from token to the state

// old chats , questions , ask questions and store response

import React, {Component} from 'react';
import ChatList from './../ChatLists/ChatList';
import Header from './../common/Header';
import MessageShell from '../MessageShell/MessageShell';
import BotShell from '../MessageShell/BotShell';
import URL from '../utils/apis';
import NoChatBox from '../MessageShell/NoChatBox';
import swal from 'sweetalert2';
import * as dump from './data-dump';
import '@google/maps';
import axios from 'axios';
const $=window.$;
const firebase=window.firebase;
// var config = {
  //   apiKey: "AIzaSyD2OMabK-UdmrY5tExuWF8YNgeKnYddnZQ",
  //   authDomain: "hirecall-5bbea.firebaseapp.com",
  //   databaseURL: "https://hirecall-5bbea.firebaseio.com",
  //   projectId: "hirecall-5bbea",
  //   storageBucket: "hirecall-5bbea.appspot.com",
  //   messagingSenderId: "44473246990"
  // };
var config = {
  apiKey: "AIzaSyAxmadWMfKFDoqTbC0IMZuBSDj3L8Bb4Wo",
  authDomain: "chatappweb-d9fae.firebaseapp.com",
  databaseURL: "https://chatappweb-d9fae.firebaseio.com",
  projectId: "chatappweb-d9fae",
  storageBucket: "chatappweb-d9fae.appspot.com",
  messagingSenderId: "715692354306",
};
firebase.initializeApp(config);


function mobileAndTabletcheck(){
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

const BotChatObj={
  jobId:"",
  chatId:"BOT-454546568688",
  lastmessage:{
  label:"Personal Hiring Assitant",
  timestamp:Date.now(),
  photoUrl:"fellowbot.png" 
  },
  recName:"Fellow Bot",
  title:"Fellow Bot",
  domain:"test",
};

// API KEY for GeoCoding
const API_Key = 'AIzaSyAeI2NMpB1Kt-KtHMTcdTHyS1kArWbv8yY'
const googleMapsClient = require('@google/maps').createClient({
  key: 'your API key here'
});

const distanceMatrixUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Washington,DC&destinations=New+York+City,NY&key='+API_Key

const distanceReq = axios.get(distanceMatrixUrl)

class CHatShell extends Component{

  constructor(props){
    super(props);
    this.state={
      firebase:firebase,
      chatIds:[],
      chatList:[],
      cand_id:"45745c60-7b1a-11e8-9c9c-2d42b21b1a3e",
      job_id:1,
      isCandidateNew:false,
      currentChat:BotChatObj,
      isDeviceMobile:mobileAndTabletcheck()||($(window).width()<="768"?true:false),
      isWidthOfMobile:$(window).width()<="768"?true:false,
      // currentChatId:"",
      isBotActive:true,
      bot_chats:[1],
      // currentDomain:"test",
      // atob(localStorage.getItem("token")).split(":")[0].split("@")[1].split(".")[0],
      isActiveChatListInMobile:false,
      currentCandidate:{},
      currentJob:{},
      revisit:false,
      currentRecruiter:{},
      questions_id:[],
      currentChatMembers:[],
      chatObjects:[],
      botChatObj:BotChatObj,
      botShellMessages:[],
      clientObj:null,
      job_cand:""
    };
  }



  render(){
    // let chatList=<ChatList 
    // // {...this.state} 
    // firebase={this.state.firebase}
    // chatIds={this.state.chatIds}
    // currentChat={{...this.state.currentChat}}
    // chatObjects={this.state.chatObjects}
    // botChatObj={this.state.botChatObj}
    // updateChatList={(list)=>this.setState({chatList:list})}
    // updateCurrentChat={(obj)=>{this.setState({currentChat:obj,isBotActive:false,})}}
    // updateCurrentBotChat={(obj)=>{this.setState({currentChat:obj,isBotActive:true})}}
    // />,

    // messageShell=<MessageShell 
    // chatIds={this.state.chatIds}
    // firebase={this.state.firebase}
    // isDeviceMobile={this.state.isDeviceMobile}
    // currentChat={{...this.state.currentChat}}
    // currentCandidate={this.state.currentCandidate}
    // chatObjects={this.state.chatObjects}
    // currentJob={this.state.currentJob}
    // currentRecruiter={this.state.currentRecruiter}
    // botChatObj={this.state.botChatObj}
    // setUserObj={obj=>this.setState({userObj:obj})} 
    // revisit={this.state.revisit}
    // updateCurrentChat={(obj)=>this.setState({currentChat:obj})}
    // />,
    let botShell=<BotShell 
    isBotActive={this.state.isBotActive}
    chatIds={this.state.chatIds}
    firebase={this.state.firebase}
    isDeviceMobile={this.state.isDeviceMobile}
    revisit={this.state.revisit}
    currentChat={{...this.state.currentChat}}
    chatObjects={this.state.chatObjects}
    botChatObj={this.state.botChatObj}
    currentCandidate={this.state.currentCandidate}
    currentJob={this.state.currentJob}
    currentRecruiter={this.state.currentRecruiter}
    botShellMessages={this.state.botShellMessages}
    questions={this.state.questions_id}
    cand_job_id={this.state.cand_id}
    setUpNotification={this.setUpNotification.bind(this)}
    addOneOnOneChat={obj=>this.addOneOnOneChat(obj)}
    setUserObj={obj=>this.setState({userObj:obj})} 
    clientObj={this.state.clientObj}
    updateBotShellMessages={arr => this.setState({botShellMessages:arr})}
    updateCurrentChat={(obj)=>this.setState({currentChat:obj})}
    />;


    return (<div className="allMessages">
    <Header/>
    <div className="row no-mrg" style={{background:"white"}}>
    
    
    {this.state.isDeviceMobile?
      (<div>
      {botShell}
      {/* <div className={!Object.keys(this.state.currentChat).length?"":"none"}>{chatList}</div>
      <div className={!Object.keys(this.state.currentChat).length?"none":""}>{this.state.isBotActive?botShell:messageShell}</div> */}
      </div>)
      :
      (
      <div>
      
          {botShell} 
          {/* <NoChatBox/> */}
          {/* {botShell} */}
          {/* {(Object.keys(this.state.currentChat).length?(this.state.isBotActive?botShell:messageShell):<NoChatBox/>)} */}
      </div> 
      )
    }
    </div>
    </div>);
  }

  // Note -- sender key will be replaced with email to user id
  // user and chat model will move to server
  
  getNewChatId(isForBot){
      let text = "";
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123459845aakdmdskjksj";
      for (var i = 0; i < 20; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      } 
      return isForBot?'Bot'+text:'Chat'+text;
  }

  verifyTokenAndGetCandRecJobObjects(){

    // http://localhost:3000/?rec=1dNz6sTi6igs55b2ZgFDBCBTZ773&can=9133232061&job=-LRTTKNDHRPb-UXNPXKCVYSUBENBCB
    // http://fellowapp.co/chatbot/?token=YmD9y2vuCVTrCNgCKRfpI000dF7zGu
    // let params = (new window.URL(window.document.location)).searchParams;
    // // let recruiterId = params.get("rec"),
    // // jobId=params.get("job"),
    // // number=params.get("can");
    // let token=params.get("token");
    // console.log(token);
    // var settings = {
    //   // "url": URL.GET_CANDIDATE_JOB_RECRUITER_OBJ,
    //   url:URL.VERIFY_TOKEN,
    //   // URL.VERIFY_TOKEN,
    //   "method": "POST",
    //   "data": JSON.stringify({
    //       // recruiterId:recruiterId,
    //       // jobId:jobId,
    //       // number:number
    //       token:token
    //     })
    // };
    // if(token)
    // $.ajax(settings)
    // .done((response)=> {
    //   try{
    //   console.log(JSON.parse(response));
    //   response =JSON.parse(response);
    //   if(response.valid){
    //   let obj=response.data;
    //   this.setState({
    //     currentCandidate:obj.candidate,
    //     currentJob:obj.job,
    //     questions:obj.job.questonaries||[]
    //     ,currentRecruiter:obj.user,
    //     revisit:response.revisit,
    //     currentDomain:obj.job.mailID.split("@")[1].split(".")[0]
    //   },()=>{
    //     if(obj.candidate){
    //       if(this.state.revisit){
      console.log(this.state.currentCandidate)
            swal("Welcome back "+this.state.currentCandidate.name,"","info");  
          // }
          // else { 
          //   swal("Welcome "+obj.candidate.candidateName,"Get ready for test.","info");
          // }
          //this.extractChatIds(this.state.currentCandidate);
      //   }
      // });
        // this.loadClientObj(obj.job.clientName);
      // }
      // else{
      //   throw new Error("not valid token");
      // }

      // }catch(e){
      //   console.log(e);
      //   swal({
      //     title:"Invalid Url",
      //     text:"Please come again with valid url.",
      //     type:"error"}).then(result=>{
      //     console.log(result);
      //     if(result.value)
      //     window.close();
      //   });
      // }
    // }).fail((a,e,xhr)=>{
    //   swal("Error in Setup","Please try after some time.","error");
    //   console.log(a,e,xhr);
    // });
    // else{
    //   swal("Welcome Candidate","Sorry we are working in invite only mode currently. Will update you ASAP...","info").then(result=>{
    //     console.log(result);
    //     if(result.value);
    //     window.close();
    //   });

    //   this.setState({isCandidateNew:true});
    // }
  }

  // extractChatIds(candidate){
  //   let chats = [],chatIds=[],bot_chats=[];
  //   try{
  //     // if(Array.isArray(candidate.chats) && candidate.chats.length>0){
  //     //   chats = candidate.chats;
  //     //   chatIds = chats.map( obj => obj.chatID);
  //     // }
  //     // if(Array.isArray(candidate.bot_chats) && candidate.bot_chats.length>0)
  //     //   bot_chats=candidate.bot_chats;
  //     var settings = {
  //       // "url": URL.GET_CANDIDATE_JOB_RECRUITER_OBJ,
  //       url:URL.GET_JOBS+"?candidate_id="+this.state.currentCandidate.id,
  //       // URL.VERIFY_TOKEN,
  //       "method": "GET",
  //     };
  //     $.ajax(settings)
  //         .done(response=>{
  //           console.log(response)
  //           response.data.forEach((chat)=>{
  //             bot_chats.append(chat.id);
  //           })
  //         }).fail(err=>{
  //             console.log(err);
  //         });
  //     this.setState({chatIds:bot_chats,chatOjects:chats,bot_chats});
  //   }
  //   catch(e){
  //     console.log(e);
  //   }
  // }

  // addOneOnOneChat(chatObj){
  //   let currentCandidate=JSON.parse(JSON.stringify(this.state.currentCandidate));
  //   let {chatId,domain,recruiterId,recName}=chatObj
  //   // debugger;
  //   let obj={
  //     chatID: chatId,
  //     domain: domain,
  //     timestamp: Date.now(),
  //     userID:recruiterId,
  //     recName:recName
  //   };
  //   if(currentCandidate.chats && Array.isArray(currentCandidate.chats)){
  //     currentCandidate.chats.unshift(obj);
  //   }
  //   else {
  //     currentCandidate.chats=[obj];
  //   }
  //   this.setState({currentCandidate},()=>{
  //     this.extractChatIds(currentCandidate);
  //   })
  // }

  componentDidMount(){
    // const promise=firebase.auth().signInWithEmailAndPassword(
    //     atob(localStorage.getItem("token")).split(":")[0]
    //     ,atob(localStorage.getItem("token")).split(":")[1]
    // );
    // localStorage.setItem("token",btoa("abc@gmail.com:abcdefgh"))


    const promise=firebase.auth().signInWithEmailAndPassword("abc@gmail.com","abcdefgh");
    promise.then((data)=>{
      console.log("login done",data);
      // localStorage.setItem("token",btoa("abc@gmail.com:abcdefgh"))
      this.setUpNotification();
    },(error)=>console.log(error));

    

    /*

      main api calls

      first get candidate_id , job_id , recruiter_id

    */


   var settings = {
          // "url": URL.GET_CANDIDATE_JOB_RECRUITER_OBJ,
          url:URL.GET_CAND+"?id="+this.state.cand_id,
          // URL.VERIFY_TOKEN,
          "method": "GET",
        };
        $.ajax(settings)
            .done(response=>{
              console.log(response.data[0]);
              this.setState({
                currentCandidate:response.data[0]
              },()=>{
                console.log(this.state.currentCandidate);
                this.verifyTokenAndGetCandRecJobObjects();
              })
              
            }).fail(err=>{
                console.log(err);
            });

            var settings = {
              // "url": URL.GET_CANDIDATE_JOB_RECRUITER_OBJ,
              url:URL.GET_QUEST_ID+"?job_id="+this.state.job_id,
              // URL.VERIFY_TOKEN,
              "method": "GET",
            };
            $.ajax(settings)
                .done(response=>{
                  console.log(response);
                  this.setState({
                    questions_id:response.data
                  })
                  
                }).fail(err=>{
                    console.log(err);
                });

                var settings = {
                  // "url": URL.GET_CANDIDATE_JOB_RECRUITER_OBJ,
                  url:URL.GET_JOB_CAND_ID+"?job_id="+this.state.job_id+"&candidate_id="+this.state.cand_id,
                  // URL.VERIFY_TOKEN,
                  "method": "GET",
                };
                $.ajax(settings)
                    .done(response=>{
                      console.log(response);
                      this.setState({
                        job_cand:response.data
                      })
                      
                    }).fail(err=>{
                        console.log(err);
                    });

    // const dbref=firebase.database()
    // dbref.ref(this.state.domain).on('value',(p)=>console.log(p.val()));
    // swal({
    //   title: 'Setting Up FellowBot!',
    //   html: 'Your Personal Hiring Assitant',
    //   onOpen: () => {
    //     swal.showLoading()
    //   },
    //   onClose: () => {
    //   }
    // })
    


    if(this.state.isWidthOfMobile){
      $("#info-box").addClass("ripple");
      let timerRef=setTimeout(()=>{
       $("#info-box").removeClass("ripple");       
      },2000*60);
      $("#info-box").click(()=>{
       $("#info-box").removeClass("ripple");
        clearTimeout(timerRef);  
      });
    }

    window.onresize=()=>{
    if($(window).width()<=768&&this.state.isWidthOfMobile!=true&&this.state.isDeviceMobile==false){
        console.log("resized","mobile width");
        
        this.setState({isWidthOfMobile:true,
              isDeviceMobile:true});
    }
    else if($(window).width()>768&&this.state.isWidthOfMobile!=false&&this.state.isDeviceMobile==true){
        console.log("resized","desktop width");
        this.setState({isWidthOfMobile:false,
                isDeviceMobile:false});
    }
    }
    
    console.log(distanceReq)
  }

  setUpNotification(){
    const messaging=firebase.messaging();
    messaging.usePublicVapidKey("BIciYYDVp9XACz33egMLQlcxxQMR0I9l-Kb4nk8uV2pWU0-vA-X4xYrtqVvNcncBDwj2Fc7UCeh0CN-FpO5yIdQ");
    this.askForNotificationAccess();
  }

  askForNotificationAccess(){
    const messaging=firebase.messaging();
    if(!localStorage.getItem("fcmToken"))
    swal({
      title: 'Requesting for Notifications Permissions.',
      text: "Please allow Notifications to receive further updates.",
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Send Future Notifications!',
      confirmCancelText: "No, Don't need to!"
    }).then((result) => {
      console.log(result);
      if (result.value) {
        messaging.requestPermission().then(()=> {
          this.retreiveToken();
          // TODO(developer): Retrieve an Instance ID token for use with FCM.
          // ...
        }).catch((err)=> {
          console.log(err);
          this.showToken('Unable to get permission to notify.', err);
        });
      }
    })
  }

  retreiveToken(){
    const messaging=firebase.messaging();    
    messaging.getToken().then((currentToken)=>  {
      // alert(currentToken);
      if (currentToken) {
        localStorage.setItem("fcmToken",currentToken);
        //this.sendTokenToServer(currentToken);
        // updateUIForPushEnabled(currentToken);
      } else {
        // Show permission request.
        this.showToken('No Instance ID token available. Request permission to generate one.');
        // Show permission UI.
        // this.askForNotificationAccess();
        // updateUIForPushPermissionRequired();
        // setTokenSentToServer(false);
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      this.showToken('Error retrieving Instance ID token. ', err);
      // setTokenSentToServer(false);
    });

    this.onTokenRefresh();
    this.setUpOnMessageToken();
  }

  onTokenRefresh(){
    const messaging=firebase.messaging();    
    messaging.onTokenRefresh(()=>{
      messaging.getToken().then((refreshedToken)=> {
        console.log('Token refreshed.');
        // Indicate that the new Instance ID token has not yet been sent to the
        // app server.
        // setTokenSentToServer(false);
        // Send Instance ID token to app server.
        this.sendTokenToServer(refreshedToken);
        // ...
      }).catch((err)=> {
        console.log('Unable to retrieve refreshed token ', err);
        this.showToken('Unable to retrieve refreshed token ', err);
      });
    });
  }

  setUpOnMessageToken(){
    const messaging=firebase.messaging();
    messaging.onMessage(function(payload) {
      console.log('Message received. ', payload);
      alert(JSON.stringify(payload));
      // ...
    });
  }

  showToken(message,err){
    swal(message,"","error");
  }

  // sendTokenToServer(token){
  //   console.log(token);
  //   // alert("todo send token "+token)
  //   let number=this.state.currentCandidate.candidateContact
  //   var settings = {
  //     "url": URL.ADD_FCM_TOKEN,
  //     "method": "POST",
  //     "headers": {
  //       "Content-Type": "application/json",
  //     },
  //     "data": JSON.stringify({
  //       "number": number,
  //       "token": token
  //     })
  //   }
  //   if(number && token)
  //   $.ajax(settings)
  //         .done(response=>{
  //           console.log(response);
  //         }).fail(err=>{
  //             console.log(err);
  //         });
    
  // }

  // loadClientObj(clientName){
  //   if(clientName)
  //   var settings = {
  //     "url": URL.GET_CLIENT_OBJ,
  //     "method": "POST",
  //     "processData": false,
  //     header:{
  //       "Content-Type": "application/json",
  //     },
  //     "data": JSON.stringify({"clientName":clientName})
  //   }
  //   $.ajax(settings).done((response)=> {
  //     console.log("client",response);
  //     if(typeof response == "string"){
  //       try{
  //         response=JSON.parse(response);
  //         if(response instanceof Object){
  //           this.setState({clientObj:response});
  //         }
  //       }
  //       catch(e){
  //         console.log(e);
  //       }
  //     }
  //     // this.setState({clientObj:response});
  //   });
  // }

  componentWillUpdate(){
    console.log("chat shell",this.state);
  }

  componentWillUnmount(){
    window.onresize=null;
  }

}

export default CHatShell;