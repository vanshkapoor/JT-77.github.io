import React, {Component} from 'react';
import ChatList from './../ChatLists/ChatList';
import Header from './../common/Header';
import MessageShell from '../MessageShell/MessageShell';
import TechSkillShell from '../TechSkillShell/TechSkillShell';
import BooleanBot from '../BooleanBot/BooleanBot';
import VideoModal from "./../common/VideoModal";
import {a as questionsObj} from './../utils/questions2';
import {getNewChatId} from './../utils/helper';
import {HashRouter as Router  , Route , Link,NavLink,Redirect} from 'react-router-dom';
import SignUpModal from './../modals/SignUpModal';
const $=window.$;
const firebase=window.firebase;
const config = {
//   apiKey: "AIzaSyAxmadWMfKFDoqTbC0IMZuBSDj3L8Bb4Wo",
//   authDomain: "chatappweb-d9fae.firebaseapp.com",
//   databaseURL: "https://chatappweb-d9fae.firebaseio.com",
//   projectId: "chatappweb-d9fae",
//   storageBucket: "",
//   messagingSenderId: "715692354306"
// };
// {
  apiKey: "AIzaSyD2OMabK-UdmrY5tExuWF8YNgeKnYddnZQ",
  authDomain: "hirecall-5bbea.firebaseapp.com",
  databaseURL: "https://hirecall-5bbea.firebaseio.com",
  projectId: "hirecall-5bbea",
  storageBucket: "hirecall-5bbea.appspot.com",
  messagingSenderId: "44473246990"
}
// firebase.initializeApp(config);


    //  "81httx1yaln9yf"
function mobileAndTabletcheck(){
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

let techChat={
          chatId:"tech111111",
          user:"guest",
          lastmessage:"Your Technical Assistant",  
          timestamp:Date.now(),
          icon:"fellowbot.png",
          title:"Tech Skill Bot"
        };

let chatChat={
  chatId:"HIRE1111111",
  user:"guest",
  lastmessage:"Your Hiring Assistant",  
  timestamp:Date.now(),
  icon:"fellowbot.png",
  title:"Fellow Bot"
};
let boolChat={
  chatId:"BOOL1111111",
  user:"guest",
  lastmessage:"Your Boolean Bot",  
  timestamp:Date.now(),
  icon:"fellowbot.png",
  title:"Boolean Bot"
};
        

class CHatShell extends Component{

  constructor(props){
    super(props);
    this.state={
      firebase:firebase,
      // currentChat:{},
      isDeviceMobile:mobileAndTabletcheck()||($(window).width()<="768"?true:false),
      isWidthOfMobile:$(window).width()<="768"?true:false,
      currentChatId:"CHAT545454545",
      domain:"landing_page",
      isActiveChatListInMobile:false,
      currentCandidate:{},
      currentJob:{},
      currentRecruiter:{},
      currentChatMembers:[],
      questions:questionsObj.questions,
      userObj:{}
    };
  }


  render(){

    return (<div className="allMessages">
    <Header userObj={this.state.userObj}/>
    <div className="row no-mrg" style={{paddingTop:0,background:"white"}}>
    
   <Router>
      <Route exact strict path={"/"} render={(props)=>{
        return <div> 
        <div className={this.state.isDeviceMobile?"none":""}>
        <ChatList {...this.state} 
          currentChat={chatChat}
          updateCurrentChat={(obj)=>this.setState({currentChat:obj})} 
          />
        </div>
        <div>
            <MessageShell {...this.state} 
            updateCurrentChat={(obj)=>this.setState({currentChat:obj})}
            switchToTechSkillBot={()=>this.switchToTechSkillBot()}
            switchToTechChatBot={()=>this.init()}
            setUserObj={obj=>this.setState({userObj:obj})}
            currentChat={chatChat}
            user={"FellowBot - <span style='font-weight:500;'>Hiring Assistant</span>"}
            />
        </div>
        </div>
        }}/>

</Router>

<Router>
      <Route exact path={"/techbot"} render={(props)=>{
        return <div> 
        <div className={this.state.isDeviceMobile?"none":""}>
        <ChatList {...this.state} 
          currentChat={techChat}
          updateCurrentChat={(obj)=>this.setState({currentChat:obj})} 
          />
        </div>
          <div>{<TechSkillShell {...this.state} 
                  updateCurrentChat={(obj)=>this.setState({currentChat:obj})}
                  switchToTechSkillBot={()=>this.switchToTechSkillBot()}
                  switchToTechChatBot={()=>this.init()}
                  setUserObj={obj=>this.setState({userObj:obj})}
                  currentChat={techChat}
                  user={"FellowBot - <span style='font-weight:500;'>Technical Assistant</span>"}
                />}</div>
          </div>
        }}/>
</Router>

{/* <Router>
      <Route exact path={"/booleanbot"} render={(props)=>{
        return <div> 
        <div className={this.state.isDeviceMobile?"none":""}>
        <ChatList {...this.state} 
          currentChat={techChat}
          updateCurrentChat={(obj)=>this.setState({currentChat:obj})} 
          />
        </div>
          <div>{<BooleanBot {...this.state} 
                  updateCurrentChat={(obj)=>this.setState({currentChat:obj})}
                  switchToTechSkillBot={()=>this.switchToTechSkillBot()}
                  switchToTechChatBot={()=>this.init()}
                  setUserObj={obj=>this.setState({userObj:obj})}
                  currentChat={boolChat}
                  user={"FellowBot - <span style='font-weight:500;'>Boolean Bot</span>"}
                />}</div>
          </div>
        }}/>
</Router>  */}

<Router>
 <Route render={(props)=>{
   switch(props.location.pathname){
     case "/":return <Redirect to={"/"}/>;
     case "/hiringassistant":return <Redirect to={"/"}/>;
     case "/techbot":return <Redirect to={"/techbot"}/>;
    //  case "/booleanbot":return <Redirect to={"/booleanbot"}/>;
    //  case "/boolean":return <Redirect to={"/booleanbot"}/>;
     default:return <Redirect to={"/"}/>;
   }
  // return (<div></div>);
  }}/>
</Router>

    <VideoModal/>
    <SignUpModal 
              {...this.props}
              setUserObj={obj=>this.setState({userObj:obj})}/>
  {/* {this.returnModals()} */}
    </div>
    </div>);
  }

  // Note -- sender key will be replaced with email to user id
  // user and chat model will move to server


  switchToTechSkillBot(){
    
    let chatId=localStorage.getItem("chatId");
    if(!chatId){
      chatId=getNewChatId();
      localStorage.setItem("chatId",chatId);
    };  

    this.setState({
        currentChatId:chatId
    //     ,currentChat:{
    //       chatId:chatId,
    //       user:"guest",
    //       lastmessage:"Your Technical Assistant",  
    //       timestamp:Date.now(),
    //       icon:"fellowbot.png",
    //       title:"Tech Skill Bot"
    //     },
    //     activeBot:"TechSkillBot",
    });
  }

 init(){
    let chatId=localStorage.getItem("chatId");
    if(!chatId){
      chatId=getNewChatId();
      localStorage.setItem("chatId",chatId);
    }

    this.setState({
      currentChatId:chatId
      // ,currentChat:{
      //   chatId:chatId,
      //   user:"guest",
      //   lastmessage:"Your Hiring Assistant",  
      //   timestamp:Date.now(),
      //   icon:"fellowbot.png",
      //   title:"Fellow Bot"
      // },
      // activeBot:"ChatBot"
    });
    
  }


  componentDidMount(){
    // localStorage.setItem("token",btoa("abc@gmail.com:abcdefgh"))
    // const promise=firebase.auth().signInWithEmailAndPassword("abc@gmail.com","abcdefgh");
    // promise.then((data)=>{
    //   console.log("login done",data);
    //   // localStorage.setItem("token",btoa("abc@gmail.com:abcdefgh"))
    // },(error)=>console.log(error));
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

   localStorage.clear();    
    // this.init();


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
  }

  componentWillUnmount(){
    window.onresize=null;
  }

}

export default CHatShell;