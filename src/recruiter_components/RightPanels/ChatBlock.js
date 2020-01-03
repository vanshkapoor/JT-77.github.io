import React, {Component} from 'react';

export default class Accordion extends Component{

  constructor(props){
    super(props);
    this.state={
       isOpen:false
    };
  }

  render(){
  return (<div className="panel panel-default">
    <div className="" role="tab" id={"heading"+this.props.id}>
      <h4 className="panel-heading no-mrg collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href={"#collapse"+this.props.id} 
        aria-expanded="false" aria-controls={"collapse"+this.props.id} onClick={()=>this.setState({isOpen:!this.state.isOpen})}>
        Block Chat
        <div style={{fontSize:16}} className="pull-right no-mrg">
        <i className={"fa "+(!this.state.isOpen?"fa-minus":"fa-times")}></i> 
        </div>
      </h4>
    </div>
    <div id={"collapse"+this.props.id} className="panel-collapse collapse" role="tabpanel" aria-labelledby={"heading"+this.props.id}>
      <div className="panel-body">
      <div className="mg-btm">
            
            <h5>Reason for Blocking</h5>
            <textarea name="" id="" cols="20" rows="5" className="form-control"></textarea>
       </div>
       <div className="text-center">
           <button className="btn btn-danger">Confirm Block!</button>
           <button className="btn btn-warning">Unblock!</button>
       </div>
      </div>


       </div>
    </div>);
  }
}