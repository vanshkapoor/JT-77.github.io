import React, { Component } from 'react';
const $ =window.$;
class Header extends Component {
  render() {
    var a=
  (
      <div>
       <nav className="navbar navbar-inverse">
    <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button> 
        <a className="" href="">
        <img alt="Fellow App" src="fellowapp.jpg" style={{"height":"50px"}}/>
        </a>
      </div>
  
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav">
          <li><a href="">Fellow App</a></li>
        </ul>
        
        <ul className="nav navbar-nav navbar-right">
          <li><a href="" className="btn btn-default" style={{"color":"black"}} onclick={()=>{
            localStorage.clear();}}>Logout</a></li>
        </ul>
      </div>
    </div>
  </nav>  
      </div>
  );
    return (
    <header>
       <div className="container-fluid" style={{padding:"0px 10px"}}>
           <ul className="pull-left">
           <li><a className="toggleHome" href="javascript:void(0);" style={{padding:"10px",margin:"-10px 10px",fontSize:17,color:"white"}} 
           onClick={()=>{this.manageNavBar();}}><i className="fa fa-bars" ></i></a></li>
               <li style={{padding:0}}>
               <a href="javascript:void(0);" style={{padding:0}}><img alt="Fellow App" src="fellowapp.jpg" style={{"height":"50px"}}/>
        </a></li>
               <li><a href="javascript:void(0);">
               {/* Fellow App */}
               Ip Tookit
               </a></li>
           </ul>
           {/* 
           <div className="search_input pull-left">
           <input type="text" placeholder="Search">
           <button id="search"><i className="fa fa-search" area-hidden="true"></i></button> 
           </div> */}
           <ul className="pull-right">
               {/* <li><a href="jaavscript:void(0);" className="task_bar"><i className="fa fa-edit" ></i></a></li> */}
               {/* <li><a href=""><i className="fa fa-search" area-hidden="true"></i></a></li> */}
               {/* <li type="button" className="dropdown"><a href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
               <i className="fa fa-comments-o" area-hidden="true"></i></a>
               </li> */}
               {/* <li><a href=""><i className="fa fa-cog" ></i></a></li> */}
               
               {/* <li><a href="https://chrome.google.com/webstore/detail/fellowapp/ongolgjlgefmkhohlhjobanmbhpjpkml?utm_source=chrome-app-launcher-info-dialog" 
               target="_blank"><i className="fa fa-download" style={{margin:5,fontSize:14}}></i><span className="hidden-xs"> Plugin</span></a></li> */}
               
               <li><a href="" onClick={()=>{localStorage.clear();}} style={{margin:5,fontSize:14}}>
                 <i className="fa fa-sign-out"></i> <span className="hidden-xs">Sign Out</span></a></li>
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
