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
          Feedback
        <div style={{fontSize:16}} className="pull-right no-mrg">
        <i className={"fa "+(!this.state.isOpen?"fa-minus":"fa-times")}></i> 
        </div>
      </h4>
    </div>
    <div id={"collapse"+this.props.id} className="panel-collapse collapse" role="tabpanel" aria-labelledby={"heading"+this.props.id}>
      <div className="panel-body">
      <div className="comment-content text-center mg-btm" id="rating-wrap">
                        <div className="rating" data-value="Yuck">
                            <div className="rating-emote rating-yuck"></div>
                            <div className="rating-name">Yuck</div>
                        </div>
                        <div className="rating" data-value="Bad">
                            <div className="rating-emote rating-bad"></div>
                            <div className="rating-name">Bad</div>
                        </div>
                        <div className="rating" data-value="Meh">
                            <div className="rating-emote rating-meh"></div>
                            <div className="rating-name">Meh</div>
                        </div>
                        <div className="rating" data-value="Good">
                            <div className="rating-emote rating-good"></div>
                            <div className="rating-name">Good</div>
                        </div>
                        <div className="rating" data-value="Awesome">
                            <div className="rating-emote rating-awesome"></div>
                            <div className="rating-name">Awesome</div>
                        </div>
        </div>           
        <div className="mg-btm">
         <h5>Comments</h5>
         <textarea name="" id="" cols="15" rows="5" className="form-control"></textarea>
        </div>
        <div className="text-center">
            <button className="btn btn-primary">Submit</button>
        </div>

      </div>
       </div>
    </div>);
  }
}