import React, {Component} from 'react';
import './Feedback.css';

class Feedback extends Component{

  constructor(props){
    super(props);
    this.state={

    };
  }

  render(){
    let obj=this.props.messageObj;
    return (<div>
     <img src={obj.src} className="img-responsive" style={{height:200,width:"100%"}}/>
    </div>);
  }

}

export default Feedback;