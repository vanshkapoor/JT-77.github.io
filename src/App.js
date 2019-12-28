import React, {Component} from 'react';
import './App.css';
import './index.css';
import ChatShell from './recruiter_components/ChatShell/ChatShell';
// import ChatShell from './candidate_components/ChatShell/ChatShell'
class App extends Component{

  constructor(props){
    super(props);
  }

  render(){
    return (<div>
      <ChatShell/>
    </div>);
  }

}

export default App;