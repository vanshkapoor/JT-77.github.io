import React, {Component} from 'react';

class NoChatBox extends Component{

  constructor(props){
    super(props);
    this.state={

    };
  }

  render(){
    return (<div className="current-chat">
    <div className="no-chat-container text-center">
    <div style={{alignSelf:"center"}}>
    <div className="">
                            <img src="fellowapp.png" alt=""/>
                        </div>
                        <div className="">
                            {/* <h3>Fellowapp is a platform for recruiters</h3> */}
                            <h3>Ip Toolkit is a platform for students</h3>
                            <p>Platform information</p>
                        </div>    
    </div>
    </div>
    </div>);
  }

}

export default NoChatBox;