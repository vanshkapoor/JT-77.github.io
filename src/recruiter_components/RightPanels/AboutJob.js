import React, {Component} from 'react';
import { join } from 'path';

export default class Accordion extends Component{

  constructor(props){
    super(props);
    this.state={
       isOpen:false
    };
  }

  render(){
    let job=this.props.currentJob,arr=null;
    if(job && job.aboutJob && Array.isArray(job.aboutJob) && job.aboutJob.length>=2)
      arr=job.aboutJob;
  return (<div className="panel panel-default">
    <div className="" role="tab" id={"heading"+this.props.id}>
      <h4 className="panel-heading no-mrg collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href={"#collapse"+this.props.id} 
        aria-expanded="false" aria-controls={"collapse"+this.props.id} onClick={()=>this.setState({isOpen:!this.state.isOpen})}>
          About Job
        <div style={{fontSize:16}} className="pull-right no-mrg">
        <i className={"fa "+(!this.state.isOpen?"fa-minus":"fa-times")}></i> 
        </div>
      </h4>
    </div>
    <div id={"collapse"+this.props.id} className="panel-collapse collapse" role="tabpanel" aria-labelledby={"heading"+this.props.id}>
      <div className="panel-body">
      {!arr?<h5>No Job Description Available</h5>:(
      arr.map((obj,idx)=>{return (
      <div className={idx==arr.length-1?"":"mg-btm"} key={idx}>     
        <h5>{obj.title}</h5>
        <textarea name={obj.title} cols="20" rows="5" className="form-control" disabled>{obj.desc}</textarea>
      </div>);})
      )}  
      </div>
       </div>
    </div>);
  }
}