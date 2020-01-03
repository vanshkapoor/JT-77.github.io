import React, { Component } from 'react';
const $ =window.$;
class Header extends Component {
  render() {
    
    return (
    <header>
       <div className="container-fluid" style={{padding:"0px 10px"}}>
           <ul className="pull-left">
           {/* <li><a className="toggleHome" href="javascript:void(0);" style={{padding:"10px",margin:"-10px 10px",fontSize:17,color:"white"}} 
           onClick={()=>{this.manageNavBar();}}><i className="fa fa-bars" ></i></a></li> */}
               <li style={{padding:0}}>
               <a href="javascript:void(0);" style={{padding:0}}><img alt="Fellow App" src="fellowapp.png" style={{"height":"50px"}}/>
        </a></li>
               <li className="hidden-xs"><a href="javascript:void(0);">
               Fellow App
               </a></li>
           </ul>
           <ul className="pull-right">
               {Object.keys(this.props.userObj).length==0?<li><a id="modal-signup" href="#sign-up">
               <img src="assets/image/reg1.png" alt="Login"/></a></li>:null}
               <li>
                 <a href="#video-disp" id="disp-video"> 
                    <img src="assets/image/vid2.png" alt="video"/>
                 </a>
               </li>
               
               {/* <li><a href="" onClick={()=>{localStorage.clear();}} style={{margin:5,fontSize:14}}>
                 <i className="fa fa-sign-out"></i> <span className="hidden-xs">Sign In</span></a></li> */}
           </ul>       
       {/* </div> */}
     </div>
     </header>
    )
  }

  manageNavBar(){
    if($(window).width()<=990)
    $(".nav_bar").toggleClass("translatey100");
    else{
      $(".nav_bar").toggle();
      $(".main .candidate").toggleClass("max-width");
    }
  }
}

export default Header;
