import React, {Component} from 'react';
import URL from './../utils/apis';
import swal from 'sweetalert2';
const $=window.$;
export default class Accordion extends Component{

  constructor(props){
    super(props);
    this.state={
       isOpen:false,
       comments:"",
       feedback:"",
       rating:0,
       feedbackSubmitted:false,
    };
  }

  componentWillReceiveProps(nextProps){
    // hide feedback if given
    if(nextProps.currentRecruiter && nextProps.currentRecruiter.feedback && Array.isArray(nextProps.currentRecruiter.feedback)){
      let submittedFeedback=nextProps.currentRecruiter.feedback.find((obj)=>{
        return obj.candidateContact==nextProps.currentCandidate.candidateContact && obj.jobID==nextProps.currentJob.jobID; 
      });
      if(submittedFeedback){
        this.setState({feedbackSubmitted:true})
      }
      else
      this.setState({feedbackSubmitted:false})
    }
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
      {this.state.feedbackSubmitted?
      (<div>Feedback submitted</div>):
      (<div className="row">
        <div className="comment-content text-center" id="rating-wrap">
                        {/* <div className="rating" data-value="Yuck">
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
                        </div> */}
        <fieldset className="rating">
            <input type="radio" id="star5" name="rating" value="5"
              checked={this.state.rating==5}
              onClick={e=>this.setState({rating:e.target.value})}  
            />
              <label className = "full" htmlFor="star5" title="Awesome - 5 stars"></label>
            <input type="radio" id="star4" name="rating" value="4" 
              checked={this.state.rating==4}
              onClick={e=>this.setState({rating:e.target.value})}/>
              <label className = "full" htmlFor="star4" title="Pretty good - 4 stars"></label>
            <input type="radio" id="star3" name="rating" value="3" 
              checked={this.state.rating==3}
              onClick={e=>this.setState({rating:e.target.value})}/>
              <label className = "full" htmlFor="star3" title="Meh - 3 stars"></label>
            <input type="radio" id="star2" name="rating" value="2" 
              checked={this.state.rating==2}
              onClick={e=>this.setState({rating:e.target.value})}/>
              <label className = "full" htmlFor="star2" title="Kinda bad - 2 stars"></label>
            <input type="radio" id="star1" name="rating" value="1" 
              checked={this.state.rating==1}
              onClick={e=>this.setState({rating:e.target.value})}/>
              <label className = "full" htmlFor="star1" title="Sucks big time - 1 star"></label>
        </fieldset>
        </div>           
        <div className="mg-btm">
         <h5>Comments</h5>
         <textarea name="" id="" cols="15" rows="5" className="htmlForm-control"
          value={this.state.comments}
          onChange={e=>this.setState({comments:e.target.value})}
         ></textarea>
        </div>
        <div className="text-center">
            <button className="btn btn-primary"
             onClick={()=>this.submitFeedback()}
            >Submit</button>
        </div>

      </div>)}
      </div>
       </div>
    </div>);
  }

  submitFeedback(){
    let {currentRecruiter,currentJob,currentCandidate}=this.props;
    if(currentCandidate && currentJob && currentCandidate && Object.keys(currentRecruiter).length>0)
    {var settings = {
      "url": URL.FEEBACK_TO_RECRUITER,
      "method": "POST",
      "data":JSON.stringify({
        "recruiterId":currentRecruiter.userID,
        "jobId": currentJob.jobID,
        "number": currentCandidate.candidateContact,
        "rating": `${this.state.rating}/5`,
        "comments":this.state.comments
      })
    }
    console.log(settings);
    $.ajax(settings)
    .done((response)=>{
      console.log(response);
      // if(typeof response=="string")
      // response=JSON.parse(response);
      // if(response.message){
      //  swal(response.message,"","info");
      // }
      this.setState({feedbackSubmitted:true});
    })
    .fail(err=>{
      console.log(err);
      swal("Error submitting feedback!","Please check your internet connection and retry.","error");
    })
    ;
    }
  }
}