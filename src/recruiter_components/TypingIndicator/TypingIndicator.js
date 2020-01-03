import React, {Component} from 'react';
import './TypingIndicator.css';

class TypingIndicator extends Component{

  constructor(props){
    super(props);
    this.state={

    };
  }

  render(){
    return (<div>
      <div id="loader" className="">
        <div class="dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
    </div>
    </div>);
  }

}

export default TypingIndicator;