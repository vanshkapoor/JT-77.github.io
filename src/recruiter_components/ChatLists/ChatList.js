import React, {Component} from 'react';
import ChatListBox from './ChatListBox';
import './ChatList.css';

class ChatList extends Component{

  constructor(props){
    super(props);
    this.state={
      chatIds:[],
      chatList:[],
      searchBoxOpen:false
    };
  }

  componentWillReceiveProps(nextProps){
    if(this.state.chatIds.length!=nextProps.chatIds.length){
      console.log("new char ids",nextProps.chatIds);
      this.setState({chatIds:nextProps.chatIds,
                      chatList:[]});
       this.addListeners(nextProps.chatIds||[],nextProps.chatObjects||[]);               
    }
  }

  getStatus(obj){
    if(obj.chatID===this.props.currentChat.chatID)
    return "active";
    else return "";
  }

  render(){
    return (<div>
      
      <div className="chat-list ">
      <div className="header">
               <span className="blue pull-left"><i className="fa fa-cog"></i></span>
                <span className="blue pull-right"><i className="fa fa-pencil"></i></span>
                <span className="blue pull-right" onClick={()=>this.setState({searchBoxOpen:!this.state.searchBoxOpen})}><i className="fa fa-search"></i></span>
                <div className="text-center">Messenger</div> 
            </div>
               <div className="recent-chat-list">
                                     
                   <div className="row no-mrg recent-chat-container">
                   <div className="col-xs-12 no-padd">
                    <div className={this.state.searchBoxOpen?"recent-chat-box search_box-container":"recent-chat-box search_box-container none"} style={{borderTop:"none"}}>
                          <input type="text" className="form-control search_box" placeholder="Search here"/>
                      </div>
                       
                       <div style={{height:"calc(100vh - 100px)",overflowY:"auto"}} className="sep-right">
                         
                        <ChatListBox 
                        chatStatus="active" 
                        chat={this.props.botChatObj}
                        updateCurrentChat={(obj)=>this.props.updateCurrentBotChat(obj)}
                        />
                         <div style={{padding:2,background:"#ccc"}}></div>
                         {
                           this.state.chatList.map((obj,index)=>{
                             return <ChatListBox 
                              chatStatus={this.getStatus(obj)} 
                              updateCurrentChat={(obj)=>this.props.updateCurrentChat(obj)}  
                              chat={obj} 
                              key={index}/>
                             })
                         }
                       </div>
                    </div>
                    
               </div>
        </div>
      </div>
    </div>);
  }

  objectToArray(obj){
    let keys=Object.keys(),arr=[];
    for(let x in keys){
      arr.push(obj[keys[x]]);
    }
    console.log(arr);
    return arr;
  }

  appendList(obj){
    let chatList=JSON.parse(JSON.stringify(this.state.chatList));
    chatList.push(obj);
    this.setState({chatList:chatList});
    this.props.updateChatList(chatList);
  }
  
  updateList(obj,index) {
    let chatList=JSON.parse(JSON.stringify(this.state.chatList));
    chatList[index]=obj;
    this.setState({chatList:chatList});
    this.props.updateChatList(chatList);
  };

  addListeners(list,chatObjects){
    const db= this.props.firebase.database();
    for(let x in list){
      let ref=db.ref(chatObjects[x].domain+"/chats/"+list[x])
       ref.off();
       ref.on('value',
       (snapshot)=>{
           let data=snapshot.val();
            console.log(data);
          if(data)
          {
           if(this.state.chatList[x]){
            this.updateList({...data, ...chatObjects[x] },x);
           }
           else 
           { 
             this.appendList({...data, ...chatObjects[x]});
           }
          }
       });
    }
  }

  // componentDidMount(){
  //   this.addListeners(this.props.chatIds,this.props.chatObjects);
  // }

  componentDidUpdate(){
    // this.addListeners();
    console.log("chatlist",this.state);
  }


}

export default ChatList;