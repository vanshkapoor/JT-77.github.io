import React, { Component } from 'react';
import CloseBtn from './Closebutton';
const $ = window.$;
class App extends Component {
    render() {
        return (
            <div id="price">

                <CloseBtn id="price" />

                <div className="modal-content">
                <div className="container text-center">

    <div className="col-xs-12 col-md-9 center-block" style={{float:"none",margin:"auto"}}>
        <div className="row">
            <div className="col-xs-12 col-sm-6 wrap-none text-center card">
                <div className="panel panel-default panel-price">
                    <div className="panel-heading">
                        <h3 className="panel-title">Basic</h3>
                        <p className="price">(Upto 100 Candidates Free)</p>
                    </div>
                    <ul className="list-group">
                        <li className="list-group-item">Create Jobs & Screening Questions</li>
                        <li className="list-group-item">Add candidates to a Job ID</li>
                        <li className="list-group-item">Share the ChatBot link on Social Media or in your emails.</li>
                        <li className="list-group-item">Candidate - Bot interactions.</li>
                        <li className="list-group-item">Live Chat</li>
                        <li className="list-group-item">Manage E2E Recruitment Cycle</li>
                        <li className="list-group-item"><b>Integrated Feedback </b>system</li>
                        <li className="list-group-item"><b>129$</b> - Upto 1000 Candidates </li>
                    </ul>
                    <a href="#book-now" id="modal-booknow" className="btn btn-blue wrap-vertical-lg">Book Demo</a></div>
            </div>
            <div className="col-xs-12 col-sm-6 wrap-none text-center card">
                <div className="panel panel-default panel-price">
                    <div className="panel-heading">
                        <h3 className="panel-title">Advanced</h3>
                        <p className="price">(Complete Automation)</p>
                    </div>
                    <ul className="list-group">
                    <li className="list-group-item">Create Jobs & Screening Questions</li>
                        <li className="list-group-item">Add candidates to a Job ID</li>
                        <li className="list-group-item">Share the ChatBot link on Social Media or in your emails.</li>
                        <li className="list-group-item">Candidate - Bot interactions.</li>
                        <li className="list-group-item">Live Chat</li>
                        <li className="list-group-item">Manage E2E Recruitment Cycle</li>
                        <li className="list-group-item"><b>Integrated Feedback </b>system</li>
                        
                        <li className="list-group-item">SMS/Mail Automation</li>
                        <li className="list-group-item">Scheduling Automation</li>
                        <li className="list-group-item">Basic Customization</li>
                        <li className="list-group-item"><b>199$</b> - Upto 1000 Candidates </li>
                   </ul>
                    
                    <a href="#book-now" id="modal-booknow2" className="btn btn-blue wrap-vertical-lg">Book Demo</a></div>
            </div>
        </div>
    </div>
</div>
                 </div>
            </div>);
    }

    componentDidMount() {
        $("#modal-price").animatedModal({
            modalTarget: "price",
            animatedIn: 'zoomIn',
            animatedOut: 'bounceOut',
            // color: '#0069ff'
            color:"#fff"
        });
    }
}

export default App;
