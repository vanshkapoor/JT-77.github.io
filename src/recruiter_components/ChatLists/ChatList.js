import React, {Component} from 'react';
import ChatListBox from './ChatListBox';
import './ChatList.css';

class ChatList extends Component{

  constructor(props){
    super(props);
  }

  componentWillReceiveProps(nextProps){
  }


  render(){
    return (<div>
      
      <div className="chat-list ">
            <div className="header">
               {/* <span className="blue pull-left"><i className="fa fa-cog"></i></span>
                <span className="blue pull-right"><i className="fa fa-pencil"></i></span> */}
                <div className="text-center">Fellow Chat</div> 
            </div>
               <div className="recent-chat-list">
                                     
                   <div className="row no-mrg recent-chat-container">
                   <div className="col-xs-12 no-padd">
                      {/* <div className="recent-chat-box" style={{borderTop:"none"}}>
                          <input type="text" className="form-control search_box" placeholder="Search here"/>
                      </div> */}
                       
                       <div style={{height:"calc(100vh - 100px)",overflowY:"auto"}} className="sep-right">
                          <ChatListBox chatStatus="active" 
                              // updateCurrentChat={this.props.updateCurrentChat}  
                             chat={this.props.currentChat}/>
    
                       </div>
                    </div>
                    
               </div>
        </div>
      </div>
    </div>);
  }

  addListeners(list){
    
  }

  componentDidMount(){
  
  }

  componentDidUpdate(){
    // this.addListeners();
  }


}

export default ChatList;