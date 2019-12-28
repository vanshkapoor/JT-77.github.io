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
          Upcoming Tasks
        <div style={{fontSize:16}} className="pull-right no-mrg">
        <i className={"fa "+(!this.state.isOpen?"fa-minus":"fa-times")}></i> 
        </div>
      </h4>
    </div>
    <div id={"collapse"+this.props.id} className="panel-collapse collapse" role="tabpanel" aria-labelledby={"heading"+this.props.id}>
      <div className="panel-body">

      <div className="upcom-task">
        <div className="bg-white" style={{padding:8}}>
          <h5 style={{marginTop:0}}>Candidate Discussion</h5>
          <h6> <span className="grey">Mayantara tech park</span>    
            <span className="pull-right blue"> invited:Himanshu</span></h6>  
        </div>
            <div className="actions row">
             <h6> <span className="blue">Today - 2:00-2:30 PM</span>
             <span className="pull-right">
               <button className="btn btn-primary mrg-rght-5"><i className="fa fa-eye"></i></button>
               <button className="btn btn-danger"><i className="fa fa-times"></i></button>
             </span>
             </h6> 
          </div>
      </div>

      <div className="upcom-task">
        <div className="bg-white" style={{padding:8}}>
          <h5 style={{marginTop:0}}>Candidate Discussion</h5>
          <h6> <span className="grey">Mayantara tech park</span>    
            <span className="pull-right blue"> invited:Himanshu</span></h6>  
        </div>
            <div className="actions row">
             <h6> <span className="blue">Today - 2:00-2:30 PM</span>
             <span className="pull-right">
               <button className="btn btn-primary mrg-rght-5"><i className="fa fa-eye"></i></button>
               <button className="btn btn-danger"><i className="fa fa-times"></i></button>
             </span>
             </h6> 
          </div>
      </div>


       </div>
    </div>
   </div>);
  }
}